
import { useFavoriteStore } from "../stores/useFavoriteStore";
import DealsCarousel from "./components/dealsCarousel";
import { HeroSection } from "./components/heroSection";
import { NewsletterSection } from "./components/newsLetterSection";
import PaymentOptionsSection from "./components/PaymentOptionsSection";

export default function Home() {
  // const useStore = useFavoriteStore((state) => state);
  return (
      <main  className="min-h-dvh">
        <HeroSection />
        <DealsCarousel />
        <PaymentOptionsSection />
        <NewsletterSection />
      </main>
  );
}
