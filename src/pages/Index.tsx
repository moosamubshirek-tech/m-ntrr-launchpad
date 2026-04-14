import HeroSection from "@/components/home/HeroSection";
import AboutCUETSection from "@/components/home/AboutCUETSection";
import BatchCardsSection from "@/components/home/BatchCardsSection";
import CUETQuiz from "@/components/home/CUETQuiz";
import ScoreCalculator from "@/components/home/ScoreCalculator";
import ToppersSection from "@/components/home/ToppersSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import UniversityStrip from "@/components/home/UniversityStrip";
import FAQSection from "@/components/home/FAQSection";

export default function Index() {
  return (
    <>
      <HeroSection />
      <AboutCUETSection />
      <BatchCardsSection />
      <CUETQuiz />
      <ScoreCalculator />
      <ToppersSection />
      <TestimonialsSection />
      <UniversityStrip />
      <FAQSection />
    </>
  );
}
