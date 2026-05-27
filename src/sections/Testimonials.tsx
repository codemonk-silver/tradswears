import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "The Aso-Oke my husband wore for our traditional wedding was nothing short of majestic. Three months later, guests still talk about it.",
    name: 'Amara O.',
    location: 'Lagos',
  },
  {
    quote: "I ordered from London and the fitting was perfect. Alhaja Kadijat understood exactly what I needed for my father's chieftaincy ceremony.",
    name: 'Tunde B.',
    location: 'London',
  },
  {
    quote: "The craftsmanship is extraordinary. You can see the generations of skill in every stitch. Worth every naira.",
    name: 'Ngozi E.',
    location: 'Abuja',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.testimonial-card');
      if (!cards) return;
      cards.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          x: 40,
          duration: 0.6,
          delay: index * 0.15,
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="bg-linen py-[100px] px-4 md:px-8"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-4 text-terracotta">TESTIMONIALS</p>
          <h2
            className="heading-display text-midnight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            What Our Clients Say
          </h2>
        </div>

        <div className="flex gap-8 overflow-x-auto scrollbar-hide scroll-snap-x scroll-snap-mandatory pb-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="testimonial-card flex-shrink-0 w-[340px] md:w-[380px] bg-white p-10 border border-[rgba(26,26,46,0.08)] scroll-snap-align-start"
            >
              <p
                className="font-display italic text-midnight mb-8 leading-relaxed"
                style={{ fontSize: '18px' }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <p className="font-body font-medium text-sm text-midnight">
                {testimonial.name}
              </p>
              <p className="font-body text-xs text-taupe mt-1">
                {testimonial.location}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
