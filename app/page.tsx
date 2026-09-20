import { Hero } from "@/components/home/Hero";
import { Ventures } from "@/components/home/Ventures";
import { Products } from "@/components/home/Products";
import { Approach } from "@/components/home/Approach";
import { Stack } from "@/components/home/Stack";
import { Experience } from "@/components/home/Experience";
import { Credentials } from "@/components/home/Credentials";
import { Contact } from "@/components/home/Contact";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { credentialGroups } from "@/lib/content/credentials";

export default function HomePage() {
  const credentialCount = credentialGroups.reduce(
    (sum, group) => sum + group.items.length,
    0,
  );

  return (
    <>
      <Hero />
      <Ventures />
      <Products />
      <Approach />
      <Stack />
      <Experience />

      <section
        id="credentials"
        className="container-page scroll-mt-20 py-[var(--section-y)]"
      >
        <SectionHeading
          eyebrow="Credentials"
          title="Verified, where verification exists."
          lead="Every certificate links to the issuer's own record rather than an image of a PDF."
          aside={`${credentialCount} records`}
        />
        <Credentials />
      </section>

      <Contact />
    </>
  );
}
