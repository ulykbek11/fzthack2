import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import SmartSlots from "@/components/SmartSlots";
import QuoteBanner from "@/components/QuoteBanner";
import UserBenefits from "@/components/UserBenefits";
import BusinessBenefits from "@/components/BusinessBenefits";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-[#090B11] text-slate-900 dark:text-gray-100 selection:bg-orange-500 selection:text-white transition-colors duration-300">
      {/* Navigation */}
      <Navbar />

      {/* 1. Hero */}
      <Hero />

      {/* 2. How it works */}
      <HowItWorks />

      {/* 3. Smart Slots (Key interactive mechanics) */}
      <SmartSlots />

      {/* Quote / Manifesto Banner */}
      <QuoteBanner />

      {/* 4. Benefits for users */}
      <UserBenefits />

      {/* 5. Benefits for business */}
      <BusinessBenefits />

      {/* 6. Final CTA */}
      <FinalCta />

      {/* Footer */}
      <Footer />
    </main>
  );
}
