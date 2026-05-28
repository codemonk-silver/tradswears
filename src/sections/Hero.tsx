import { useEffect, useRef } from 'react';

const gridItems = [
  { c: '1', r: '1', z: '-1000px', img: '/hero-grid-1.jpg', span: '' },
  { c: '2', r: '1', z: '2000px', img: '/hero-grid-2.jpg', span: '' },
  { c: '4 / span 2', r: '1', z: '-500px', img: '/hero-grid-3.jpg', span: 'col-span-2' },
  { c: '6', r: '1 / span 2', z: '1500px', img: '/hero-grid-4.jpg', span: 'row-span-2' },
  { c: '1 / span 2', r: '2 / span 2', z: '-200px', img: '/hero-grid-5.jpg', span: 'col-span-2 row-span-2' },
  { c: '3', r: '2 / span 2', z: '800px', img: '/hero-grid-6.jpg', span: 'row-span-2' },
  { c: '4', r: '3', z: '-1200px', img: '/hero-grid-7.jpg', span: '' },
  { c: '5 / span 2', r: '3 / span 2', z: '2500px', img: '/hero-grid-8.jpg', span: 'col-span-2 row-span-2' },
];

export default function Hero() {
  const gridRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const gridImages = gridRef.current?.querySelectorAll<HTMLElement>('.hero-grid__item-img');
    if (!gridImages) return;

    const animate = () => {
      gridImages.forEach((img, index) => {
        const style = getComputedStyle(img);
        const z = parseFloat(style.getPropertyValue('--z'));
        const speed = z > 0 ? z * 0.0005 : Math.abs(z) * 0.0003;
        const offset = index % 2 === 0 ? 1 : -1;
        const yPos = window.scrollY * speed * offset;
        img.style.transform = `translateY(${yPos}px) translateZ(${z}) scale(var(--grid-item-scale, 1))`;
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  const scrollToCollections = () => {
    const el = document.getElementById('collections');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-wrap">
      <div
        ref={gridRef}
        className="hero-grid"
        style={{ perspective: '2000px' }}
      >
        {gridItems.map((item, index) => (
          <div
            key={index}
            className={`hero-grid__item ${item.span}`}
            style={{
              gridColumn: item.c,
              gridRow: item.r,
            }}
          >
            <div
              className="hero-grid__item-img"
              style={{
                backgroundImage: `url(${item.img})`,
                '--z': item.z,
                '--grid-item-scale': '1',
              } as React.CSSProperties}
            />
          </div>
        ))}
      </div>

      {/* Dark overlay on images */}
      <div
        className="absolute inset-0 z-[5]"
        style={{ background: 'rgba(26, 26, 46, 0.55)' }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1
          className="heading-display text-white mb-6"
          style={{
            fontSize: 'clamp(3rem, 6vw, 4.5rem)',
            textShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
          }}
        >
          Woven for Royalty
        </h1>
        <p
          className="font-body text-white/90 max-w-[440px] mb-10"
          style={{
            fontSize: '16px',
            lineHeight: 1.6,
            textShadow: '0 1px 2px rgba(0, 0, 0, 0.25)',
          }}
        >
          Handwoven Aso-Oke & bespoke Nigerian luxury, crafted in Lagos since 1987
        </p>
        <button
          onClick={scrollToCollections}
          className="font-body font-medium text-[13px] uppercase tracking-[0.1em] px-10 py-4 bg-midnight text-linen border border-midnight hover:bg-terracotta hover:border-terracotta transition-all duration-300"
          style={{ textShadow: 'none' }}
        >
          Explore Collections
        </button>
      </div>
    </section>
  );
}