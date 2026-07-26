import { getPostBySlug, getAllPosts } from '@/data/blogData';
import { ReadingProgressBar } from '@/components/blog/ReadingProgressBar';
import { ArticleContent } from '@/components/blog/ArticleContent';
import { ArticleHeader } from '@/components/blog/ArticleHeader';
import { RelatedWorkCard } from '@/components/blog/RelatedWorkCard';
import { ArticleNav } from '@/components/blog/ArticleNav';
import { AuthorFooter } from '@/components/blog/AuthorFooter';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import { SITE_DATA } from '@/data/content';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} — Sachin Verma`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [SITE_DATA.identity.name],
      tags: post.tags,
      ...(post.coverImage && {
        images: [{ url: post.coverImage, alt: post.title }],
      }),
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === post.slug);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  return (
    <div className="min-h-screen pt-32 pb-24 md:pt-40 md:pb-32 bg-[#09090b] relative">
      <ReadingProgressBar />

      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-sky-400 transition-colors focus-ring py-1 px-2 rounded-lg min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to All Articles</span>
          </Link>
        </div>

        <ArticleHeader post={post} />
        <ArticleContent content={post.content} />

        {post.relatedProjectSlug && (
          <RelatedWorkCard relatedProjectSlug={post.relatedProjectSlug} />
        )}

        <AuthorFooter />
        <ArticleNav prevPost={prevPost} nextPost={nextPost} />
      </div>
    </div>
  );
}
