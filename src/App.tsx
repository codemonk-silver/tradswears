import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Collections from './sections/Collections';
import OurCraft from './sections/OurCraft';
import Lookbook from './sections/Lookbook';
import Bespoke from './sections/Bespoke';
import Testimonials from './sections/Testimonials';
import DeliveryFAQ from './sections/DeliveryFAQ';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const lenisRef = useRef<Lenis | null>(null);
  const [isLookbookVisible, setIsLookbookVisible] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as unknown as gsap.TickerCallback);
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      if (isLookbookVisible) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [isLookbookVisible]);

  const scrollTo = (target: string) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { duration: 1.2 });
    }
  };

  return (
    <div>
      <Navigation scrollTo={scrollTo} />
      <Hero />
      <Collections />
      <OurCraft />
      <Lookbook onVisibilityChange={setIsLookbookVisible} />
      <Bespoke />
      <Testimonials />
      <DeliveryFAQ />
      <Contact />
      <Footer />
    </div>
  );
}
