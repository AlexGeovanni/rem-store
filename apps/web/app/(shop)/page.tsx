
import DealsCarousel from "./components/dealsCarousel";
import { HeroSection } from "./components/heroSection";
import { NewsletterSection } from "./components/newsLetterSection";
import PaymentOptionsSection from "./components/PaymentOptionsSection";

export default function Home() {
  return (
      <main  className="min-h-dvh">
        <HeroSection />
        <DealsCarousel />
        <PaymentOptionsSection />
        <NewsletterSection />
      </main>
  );
}
