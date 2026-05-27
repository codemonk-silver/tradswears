import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const morphImages = [
  { src: '/craft-morph-1.jpg', alt: 'Aso-Oke textile weave detail' },
  { src: '/craft-morph-2.jpg', alt: 'Adire dye pit in Abeokuta' },
  { src: '/craft-morph-3.jpg', alt: 'Gold embroidery hand-stitching' },
  { src: '/craft-morph-4.jpg', alt: 'Traditional Yoruba weaving loom' },
  { src: '/craft-morph-5.jpg', alt: 'Adire fabrics drying in sun' },
];

export default function OurCraft() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const images = imagesRef.current.filter(Boolean) as HTMLImageElement[];
      if (images.length < 5) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: galleryRef.current,
          start: 'top 80%',
          end: 'center center',
          scrub: true,
        },
      });

      tl.to(images[0], { top: '10%', left: '5%', width: '35%', height: '25%', duration: 1 }, 0)
        .to(images[1], { top: '25%', left: '30%', width: '25%', height: '35%', duration: 1 }, 0)
        .to(images[2], { top: '15%', left: '60%', width: '30%', height: '30%', rotationY: -5, duration: 1 }, 0)
        .fromTo(images[3], { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, top: '55%', left: '25%', width: '20%', height: '25%', duration: 1 }, 0.5)
        .fromTo(images[4], { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, top: '45%', left: '50%', width: '22%', height: '30%', rotationY: 5, duration: 1 }, 0.6);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="our-craft"
      ref={sectionRef}
      className="bg-midnight py-[120px] px-4 md:px-8"
    >
      <div className="max-w-[1200px] mx-auto">
        <p className="section-label mb-4 text-terracotta">OUR CRAFT</p>
        <h2
          className="heading-display text-linen mb-6"
          style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
        >
          From Loom to Legacy
        </h2>
        <p className="font-body text-[rgba(247,243,238,0.6)] max-w-[520px] mb-16 text-base leading-relaxed">
          Three generations of weaving tradition, preserved in every thread
        </p>

        <div
          ref={galleryRef}
          className="morph-gallery"
        >
          {morphImages.map((img, index) => (
            <img
              key={index}
              ref={(el) => { imagesRef.current[index] = el; }}
              src={img.src}
              alt={img.alt}
              className="morph-gallery__img"
              style={{
                left: `${index * 33.33}%`,
                zIndex: index + 1,
              }}
              loading="lazy"
            />
          ))}
        </div>

        <p className="font-body italic text-[rgba(247,243,238,0.5)] max-w-[640px] mx-auto text-center mt-[60px] text-[15px] leading-relaxed">
          Every piece is handwoven on traditional looms by master weavers in Iseyin, Oyo State — a craft passed down through three generations of the Kadijat family.
        </p>
      </div>
    </section>
  );
}
