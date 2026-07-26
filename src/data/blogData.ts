export interface BlogPostDetail {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  coverImage?: string;
  relatedProjectSlug?: string;
  content: string;
}

export const BLOG_POSTS: BlogPostDetail[] = [
  {
    slug: "django-production-migration",
    title: "What It Really Takes to Migrate a Production Django Application Without Downtime",
    subtitle: "Production migrations aren't about moving files—they're about moving business-critical systems without disrupting the people who rely on them.",
    date: "Jul 26, 2026",
    readTime: "12 min read",
    tags: ["Django", "Linux", "PostgreSQL", "DevOps", "Production"],
    excerpt: "Moving a live production Django application means protecting customer data, preserving application availability, and ensuring every service continues functioning exactly as before.",
    coverImage: "/images/blog/django-production-migration-cover.png",
    content: `
> Production migrations aren't about moving files—they're about moving business-critical systems without disrupting the people who rely on them.

### Introduction

Every Django developer has deployed an application locally, but production migrations are a completely different challenge.

Moving a live application means protecting customer data, preserving application availability, and ensuring every service—from the database to the web server—continues functioning exactly as before.

Recently, I migrated one of our production Django applications to a completely new Linux server. On paper, it sounded simple:

1. Copy the project
2. Restore the database
3. Start Gunicorn

In reality, it involved coordinating PostgreSQL backups, media files, environment variables, SSL certificates, Nginx, Gunicorn, Linux permissions, firewall rules, and service verification—all while ensuring there was always a way back if something failed.

This article walks through the engineering process behind that migration and the lessons I learned along the way.

[DIAGRAM TODO: Current vs New Server Architecture]

---

### Why Production Migration Is Different

A production server isn't just code. It contains years of accumulated state:

- User uploads
- Database records
- Scheduled jobs
- SSL certificates
- Environment secrets
- Service configurations
- Operating system permissions
- Application logs

Losing any one of these can cause outages that impact real users. That's why migrations begin with understanding the existing infrastructure—not copying files.

---

### Understanding the Existing Infrastructure

Before touching the new server, I documented every moving part. The application consisted of:

- **Django backend**
- **PostgreSQL database**
- **Gunicorn application server**
- **Nginx reverse proxy**
- **Linux systemd services**
- **SSL certificates**
- Uploaded media
- Static assets
- Environment variables
- Scheduled background jobs

Rather than assuming anything, I verified:

- Python version
- Installed packages
- PostgreSQL version
- Database size
- Media directory size
- Service configurations
- Open firewall ports
- DNS configuration

That inventory became my migration checklist.

[DIAGRAM TODO: Nginx → Gunicorn → Django → PostgreSQL Architecture]

---

### Preparing the New Server

Instead of immediately deploying the application, I first prepared the operating system. This included:

- Creating a dedicated application user
- Installing Python
- Configuring virtual environments
- Installing PostgreSQL
- Installing Nginx
- Installing Gunicorn
- Configuring firewall rules
- Enabling SSH access

Preparing infrastructure before copying code significantly reduced troubleshooting later.

---

### Creating a Reliable Backup Strategy

Backups are your rollback plan. Before changing anything, I created backups for:

- PostgreSQL database
- Uploaded media
- Environment configuration
- Nginx configuration
- Gunicorn configuration

For PostgreSQL I generated a full database dump:

\`\`\`bash
# Create a full database dump with compression
pg_dump -U postgres -h localhost -F c -b -v -f production_db_backup.dump mydatabase
\`\`\`

This ensured that every table, relationship, migration history, and production record could be restored if necessary.

> **Important Rule:** Never trust a backup you haven't verified. A backup isn't useful unless you've confirmed it can actually be restored.

[DIAGRAM TODO: PostgreSQL Backup & Restore Flow]

---

### Migrating the Database

The database migration involved more than importing SQL. I needed to preserve:

- Migration history
- Primary keys
- Foreign key relationships
- Authentication tokens
- Application metadata

\`\`\`bash
# Restore PostgreSQL database on new server
pg_restore -U postgres -d mydatabase -v production_db_backup.dump
\`\`\`

After restoring the dump, I verified:

- Record counts
- Migrations
- Indexes
- Constraints
- Application startup

Skipping verification can leave subtle production bugs that don't appear immediately.

---

### Migrating Media Files

Database records often reference uploaded files. If media isn't migrated correctly, users suddenly see broken images, missing documents, and failed downloads.

I copied every uploaded asset while preserving directory structure and file permissions:

\`\`\`bash
# Rsync media files with permissions preserved
rsync -avzP -e ssh /var/www/media/ deploy@new-server-ip:/var/www/media/
\`\`\`

After deployment I manually verified several production records to confirm that database references correctly pointed to existing files.

---

### Managing Environment Variables

Production secrets should never be committed to Git. The new server required secure configuration for:

- \`SECRET_KEY\`
- Database credentials
- \`ALLOWED_HOSTS\`
- CORS settings
- API keys
- Email configuration
- Storage settings

Separating configuration from code made deployment repeatable and secure.

---

### Configuring Gunicorn

Gunicorn serves Django applications in production. Instead of running it manually, I created a systemd service so the application would:

- Start automatically after reboot
- Restart on failure
- Integrate with Linux service management
- Generate centralized logs

\`\`\`ini
[Unit]
Description=Gunicorn daemon for Django Application
After=network.target

[Service]
User=deploy
Group=www-data
WorkingDirectory=/var/www/myapp
ExecStart=/var/www/myapp/venv/bin/gunicorn --workers 3 --bind unix:/run/gunicorn.sock myapp.wsgi:application

[Install]
WantedBy=multi-user.target
\`\`\`

This provided reliability that manual commands never can.

---

### Configuring Nginx

Nginx became the public entry point for the application. Its responsibilities included:

- Reverse proxy
- Static file serving
- Media serving
- SSL termination
- Request forwarding
- Compression
- Security headers

Separating these concerns from Django improves both performance and maintainability.

[DIAGRAM TODO: Deployment Flow Diagram]

---

### SSL and Secure Communication

Production traffic should always be encrypted. After configuring HTTPS, I verified:

- Certificate installation
- Automatic renewal
- HTTP to HTTPS redirects
- Browser security indicators

A deployment isn't complete until secure communication is working.

---

### Running Django Migrations

Even after restoring the database, Django migrations still require careful verification. I confirmed:

- Migration consistency
- Model compatibility
- Schema version
- Authentication tables
- Custom applications

\`\`\`bash
# Verify migration state after restore
python manage.py showmigrations
\`\`\`

One missing migration can prevent the entire application from starting.

---

### Verifying the Deployment

Successful deployment isn't measured by "the server started." I verified:

- Login
- API endpoints
- Admin dashboard
- File uploads
- Downloads
- Authentication
- Background jobs
- Application logs
- Server health
- Error monitoring

Only after every critical workflow succeeded was the migration considered complete.

[DIAGRAM TODO: Health Check Checklist]

---

### Having a Rollback Plan

Every deployment should assume something might fail. My rollback strategy included:

- Restoring the previous PostgreSQL backup
- Reverting DNS if necessary
- Restoring media
- Restarting previous services
- Validating application health

Rollback planning dramatically reduces deployment anxiety because recovery steps are already defined.

[DIAGRAM TODO: Rollback Flowchart]

---

### Lessons Learned

Production migrations are fundamentally about risk management. Some of the biggest lessons I took away were:

1. Always verify backups before relying on them.
2. Inventory your infrastructure before migrating.
3. Test restoration, not just backup creation.
4. Never skip log inspection after deployment.
5. Keep rollback procedures documented.
6. Automate repeatable deployment steps wherever possible.
7. Infrastructure documentation saves hours during troubleshooting.

---

### Final Thoughts

Migrating a production Django application taught me that software engineering extends far beyond writing code. It requires understanding operating systems, networking, databases, security, deployment pipelines, and failure recovery.

A successful migration isn't the one that finishes fastest—it's the one users never notice happened.

[DIAGRAM TODO: Terminal screenshots showing migration commands (with sensitive data removed)]
    `
  },
  {
    slug: "sutra-enterprise-architecture",
    title: "Building an Enterprise Task Management Platform from Scratch: Architecture, Challenges, and Lessons Learned",
    subtitle: "Task management isn't about creating tasks. It's about designing a system that helps teams collaborate, scale, and make decisions.",
    date: "Jul 18, 2026",
    readTime: "10 min read",
    tags: ["Django", "React.js", "Architecture", "RBAC", "SaaS"],
    excerpt: "The story of building Sutra—an enterprise task management platform designed for growing organizations with multiple teams, projects, workflows, and roles.",
    coverImage: "/images/blog/sutra-enterprise-architecture-cover.png",
    relatedProjectSlug: "sutra",
    content: `
> Task management isn't about creating tasks. It's about designing a system that helps teams collaborate, scale, and make decisions.

### Introduction

Rather than walking through the implementation feature by feature, this article tells the story of building **Sutra**, an enterprise task management platform designed for growing organizations with multiple teams, projects, workflows, and roles.

It begins with the business problem—why existing tools often fall short for organizations that need customizable workflows and deeper operational visibility. From there, it explores how we translated those requirements into a scalable architecture.

The article covers:

- Requirements gathering from real business workflows
- Designing the data model (Users, Roles, Projects, Tasks, Comments, Notifications, Activity History, Categories, Recurring Tasks)
- Creating an RBAC-based authentication and authorization system with JWT
- Building a Django REST Framework backend with clean, versioned APIs
- Developing a responsive React/Next.js frontend with Redux for predictable state management
- Implementing mentions, comments, notifications, recurring tasks, Kanban boards, dashboards, CSV exports, and reporting
- Solving challenges around API performance, pagination, filtering, and real-time user experience
- How architecture evolved as the product matured

[DIAGRAM TODO: Entity-Relationship Diagram — Users, Roles, Projects, Tasks, Comments, Notifications]

---

### Requirements Gathering from Real Business Workflows

Before writing code, we mapped how teams actually worked: project managers needed cross-team visibility, contributors needed focused task views, and admins needed audit trails. Generic task tools couldn't model our permission boundaries or recurring operational workflows.

This phase produced concrete requirements for multi-tenant isolation, role hierarchies, and customizable task lifecycles—not feature wishlists.

---

### Designing the Data Model

Building a maintainable task engine requires a rock-solid relational data model. In Sutra, we modeled:

- **Users & Organizations**: Multi-tenant isolation with custom user profiles
- **Role-Based Access Control (RBAC)**: Granular permissions for Admins, Project Managers, Contributors, and Viewers
- **Projects & Categories**: Hierarchical grouping of business initiatives
- **Tasks & Subtasks**: Parent-child dependencies, priorities, and status lifecycles
- **Comments & Mentions**: Collaborative discussions with user tagging
- **Notifications Engine**: In-app notifications and email dispatch
- **Activity Audit History**: Immutable trail of status changes, assignees, and edits
- **Recurring Tasks**: Automated schedule engine for routine operational tasks

\`\`\`python
class Task(models.Model):
    title = models.CharField(max_length=255)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='tasks')
    assignee = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='assigned_tasks')
    status = models.CharField(max_length=50, choices=TaskStatus.choices, default=TaskStatus.TODO)
    priority = models.CharField(max_length=20, choices=Priority.choices, default=Priority.MEDIUM)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['project', 'status']),
            models.Index(fields=['assignee', 'status']),
        ]
\`\`\`

[DIAGRAM TODO: API Architecture — Django REST Framework endpoints and versioning]

---

### RBAC Authentication & Authorization with JWT

We implemented JWT-based authentication with custom DRF permission classes that evaluate organization-level and project-level roles on every request. The goal was security without N+1 query bottlenecks—achieved through \`prefetch_related\` and indexed permission tables.

[DIAGRAM TODO: Authentication Flow — Login, JWT issuance, role evaluation, API access]

---

### My Role: Backend Lead → Full Stack Owner

A dedicated section focuses on my role, beginning as the **backend lead**—designing the database, implementing authentication, and writing core business logic—before expanding into **full-stack ownership** during later development phases:

- Designing the PostgreSQL database schema and index strategy
- Implementing JWT-based authentication and role-based permissions in Django REST Framework
- Writing core task status transitions and notification dispatch logic
- Building interactive React.js / Next.js interfaces (Kanban boards, task detail drawers, dashboard widgets)
- Integrating Redux Toolkit for predictable client state management
- Optimizing API response times through server-side pagination, DRF serializer optimizations, and Redis caching

---

### Key Features & Technical Challenges

#### Kanban Boards & Drag-and-Drop
Building an interactive Kanban board required optimistic UI updates on the React client while sending debounced PATCH requests to update task status and order positions on the Django backend.

[DIAGRAM TODO: Kanban Workflow — Column states, drag-and-drop, optimistic updates]

#### Mentions, Comments & Notifications
When a user types \`@username\` in a comment, the system parses mentioned user IDs, verifies their project access permissions, generates in-app notifications, and logs an entry in the immutable activity audit log.

[DIAGRAM TODO: Notification Lifecycle — Mention → Permission check → In-app + email dispatch]

#### Performance at Scale
As task volume grew, we solved challenges around API performance, pagination, filtering, and real-time user experience through indexed queries, serializer optimization, and Redis caching.

[DIAGRAM TODO: Dashboard Screenshots — Task metrics, team activity, project overview]

---

### Engineering Lessons Learned

The article concludes with engineering lessons that became clear only after building a large-scale product:

1. **Planning is more valuable than rushing into implementation.** Spending extra time on the PostgreSQL schema saved months of refactoring later.
2. **Good APIs reduce frontend complexity.** Clean, RESTful endpoints with consistent serialization keep client components focused on presentation.
3. **Scalable architecture pays dividends as features grow.** Modularizing Django apps (\`users\`, \`projects\`, \`tasks\`, \`notifications\`) made it seamless to introduce new features without regressions.
4. **Clear data modeling prevents future technical debt.** Well-defined relationships and indexes prevented painful migrations as the product matured.
5. **Building maintainable software is more important than building fast.** Clear code standards and thorough type-checking pay off as team size scales.
    `
  },
  {
    slug: "ai-assisted-deployment-agent",
    title: "How I Built an AI-Powered Deployment System for Django Applications",
    subtitle: "Deployments shouldn't depend on memory—they should depend on automation.",
    date: "Jul 10, 2026",
    readTime: "8 min read",
    tags: ["Django", "Python", "DevOps", "AI Automation", "Nginx"],
    excerpt: "After deploying multiple Django applications manually, I built an AI-assisted deployment system that executes the same sequence of steps consistently—every time.",
    coverImage: "/images/blog/ai-deployment-agent-cover.png",
    relatedProjectSlug: "ai-deployment-agent",
    content: `
> Deployments shouldn't depend on memory—they should depend on automation.

### Introduction

After deploying multiple Django applications manually, I realized that every deployment repeated the same sequence of SSH commands, configuration edits, service restarts, verification steps, and rollback planning.

Instead of documenting the process, I built an **AI-assisted deployment system** that could execute it consistently.

The article starts by explaining the operational problem: manual deployments are slow, error-prone, and heavily dependent on individual experience.

---

### System Architecture

It then introduces the architecture of the deployment platform:

\`\`\`text
Developer
      │
      ▼
AI Deployment Agent
      │
      ▼
Deployment Engine
      │
 ┌────┼────┐
 │    │    │
SSH Nginx Gunicorn
 │    │    │
 └────┼────┘
      ▼
 PostgreSQL
      │
      ▼
 Django Application
\`\`\`

[DIAGRAM TODO: Deployment Architecture — Developer → AI Agent → Engine → Services → Application]

Rather than focusing on "how to deploy Django," the article explains how to design a reusable deployment platform capable of handling multiple projects with consistency and reliability.

---

### Core Engineering Decisions

#### Secure SSH Execution
The agent executes automated scripts over SSH using public-key authentication. Before altering any remote server state, the system runs pre-flight health checks—disk space, Python dependencies, database connectivity, and port availability.

#### Environment Validation
Automatic dependency installation, virtual environment management, and environment variable validation ensure the target server meets application requirements before deployment begins.

#### Dynamic Nginx & Gunicorn Configuration
Instead of requiring manual web server configuration, the engine dynamically generates optimized Nginx virtual host files and Gunicorn systemd service units:

\`\`\`python
def generate_nginx_config(domain: str, socket_path: str) -> str:
    return f"""
server {{
    listen 80;
    server_name {domain};

    location /static/ {{
        alias /var/www/{domain}/static/;
    }}

    location /media/ {{
        alias /var/www/{domain}/media/;
    }}

    location / {{
        proxy_pass http://unix:{socket_path};
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }}
}}
"""
\`\`\`

[DIAGRAM TODO: Service Lifecycle — Pre-flight → Deploy → Configure → Verify → Complete]

#### PostgreSQL Configuration
Automated database setup and connectivity verification as part of the deployment pipeline.

#### SSL Integration
Automatic Certbot invocation for SSL certificate provisioning and HTTP-to-HTTPS redirect configuration.

#### Static File Collection
Automated \`collectstatic\` execution and static asset path configuration in Nginx.

#### Health Verification After Deployment
Once deployment completes, the agent executes automated endpoint health checks—HTTP GET requests to \`/health\` or API root, 200 OK verification, and system log inspection.

[DIAGRAM TODO: Health-Check Pipeline — Endpoint probes, log analysis, status reporting]

#### Centralized Logging
Structured logging across SSH execution, configuration generation, and service restarts for post-deployment debugging.

#### Rollback Workflows
If a post-deployment health check fails, the agent automatically triggers rollback—restoring the previous application version, restarting systemd services, and validating system stability.

[DIAGRAM TODO: Rollback Flowchart — Health failure → Restore → Restart → Re-verify]

#### Extensibility
The platform is designed for extensibility—Docker and future cloud deployment targets are planned as additional execution backends.

[DIAGRAM TODO: Execution Flow — Step-by-step deployment sequence with annotated terminal outputs]

---

### Why Infrastructure Automation Matters

It concludes with reflections on why automation matters:

1. **Automation reduces human error.** Copying commands manually under pressure leads to mistakes; automated scripts execute consistently every time.
2. **Consistent deployments improve reliability.** Every project follows the same verified pipeline.
3. **Verification is as important as deployment itself.** Never assume a deployment succeeded without automated health checks.
4. **Rollback should be treated as a first-class feature.** A deployment pipeline without automated rollback is incomplete.
5. **Infrastructure engineering deserves the same architectural thinking as application development.** Clean patterns—FastAPI engines, Jinja templates, structured logging—yield reliable operations.
    `
  }
];

export function getAllPosts(): BlogPostDetail[] {
  return BLOG_POSTS;
}

export function getPostBySlug(slug: string): BlogPostDetail | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
