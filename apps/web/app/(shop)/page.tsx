
import DealsCarousel from "./components/dealsCarousel";
import PaymentOptionsSection from "./components/PaymentOptionsSection";

export default function Home() {
  return (
      <main  className="min-h-dvh">
        <DealsCarousel />
        <PaymentOptionsSection />
      </main>
  );
}
