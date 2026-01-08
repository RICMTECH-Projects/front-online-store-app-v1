import Hero from "@/components/landing/Hero";
import { NewReleases } from "@/components/landing/NewReleases";
import { PromoSection } from "@/components/landing/PromoSection";

export default function LandingPage() {
  return (
    <main className="w-full px-5 sm:px-20 lg:px-30">
      <Hero />
      <NewReleases />
      <PromoSection />
    </main>
  )
}
