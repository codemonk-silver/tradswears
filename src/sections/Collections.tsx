import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const collections = [
  { name: 'Aso-Oke Elevation', desc: 'Handwoven heirloom textiles', img: '/collection-aso-oke.jpg' },
  { name: 'The Modern Agbada', desc: 'Contemporary flowing robes', img: '/collection-agbada.jpg' },
  { name: 'Iro & Buba', desc: 'Elegant wrap ensembles', img: '/collection-iro-buba.jpg' },
  { name: 'Aso-Ebi Sets', desc: 'Ceremonial group pieces', img: '/collection-aso-ebi.jpg' },
  { name: 'Filà Caps', desc: 'Sculptural headwear', img: '/collection-fila.jpg' },
  { name: 'Adire Silks', desc: 'Resist-dyed luxury', img: '/collection-adire.jpg' },
  { name: 'Bespoke Tailoring', desc: 'Made-to-measure', img: '/collection-bespoke.jpg' },
  { name: 'Accessories', desc: 'Beads, bags, jewelry', img: '/collection-accessories.jpg' },
];

export default function Collections() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll('.flip-card');
    if (!cards) return;

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 60,
          duration: 0.8,
          delay: index * 0.1,
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
      id="collections"
      ref={sectionRef}
      className="bg-white py-[120px] px-4 md:px-8"
    >
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-16">
          <p className="section-label mb-4">COLLECTIONS</p>
          <h2
            className="heading-display text-midnight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            This Season&apos;s Offerings
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="flip-card aspect-[3/4] cursor-pointer"
              tabIndex={0}
              role="button"
              aria-label={`View ${collection.name} collection`}
            >
              <div className="flip-card__inner">
                <div className="flip-card__front">
                  <img
                    src={collection.img}
                    alt={collection.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flip-card__back">
                  <div className="sparkle-container">
                    <div className="sparkle" />
                    <div className="sparkle" />
                    <div className="sparkle" />
                  </div>
                  <h3>{collection.name}</h3>
                  <p>{collection.desc}</p>
                  <a href="#lookbook">View Pieces</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
