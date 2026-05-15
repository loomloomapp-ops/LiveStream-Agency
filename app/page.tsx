import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import About from "@/components/About";
import WhoIsItFor from "@/components/WhoIsItFor";
import HowItWorks from "@/components/HowItWorks";
import Cases from "@/components/Cases";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ApplicationSection from "@/components/ApplicationSection";
import Footer from "@/components/Footer";
import FloatingWidget from "@/components/FloatingWidget";
import MobileStickyBar from "@/components/MobileStickyBar";
import ApplicationModal from "@/components/ApplicationModal";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <About />
        <WhoIsItFor />
        <HowItWorks />
        <Cases />
        <Testimonials />
        <FAQ />
        <ApplicationSection />
      </main>
      <Footer />
      <FloatingWidget />
      <MobileStickyBar />
      <ApplicationModal />
    </>
  );
}
