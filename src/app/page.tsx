import { Hero } from '@/components/sections/Hero';
import { TrustedTechnologies } from '@/components/sections/TrustedTechnologies';
import { EngineeringHighlights } from '@/components/sections/EngineeringHighlights';
import { WhatIBringToATeam } from '@/components/sections/WhatIBringToATeam';
import { SelectedWork } from '@/components/sections/SelectedWork';
import { CaseStudies } from '@/components/sections/CaseStudies';
import { Services } from '@/components/sections/Services';
import { TechStack } from '@/components/sections/TechStack';
import { Testimonials } from '@/components/sections/Testimonials';
import { OpenSource } from '@/components/sections/OpenSource';
import { TechnicalBlog } from '@/components/sections/TechnicalBlog';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero */}
      <Hero />

      {/* 2. Trusted Technologies */}
      <TrustedTechnologies />

      {/* 3. Engineering Highlights */}
      <EngineeringHighlights />

      {/* 3.5. What I Bring to a Team */}
      <WhatIBringToATeam />

      {/* 4. Selected Professional Work (Real Projects) */}
      <SelectedWork />

      {/* 5. Case Studies */}
      <CaseStudies />

      {/* 6. Services */}
      <Services />

      {/* 7. Tech Stack */}
      <TechStack />

      {/* 8. Testimonials */}
      {/* <Testimonials /> */}

      {/* 9. Open Source */}
      <OpenSource />

      {/* 10. Technical Blog */}
      <TechnicalBlog />

      {/* 11. Contact / Let's Work Together */}
      <Contact />
    </div>
  );
}
