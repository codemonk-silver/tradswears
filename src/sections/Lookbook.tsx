import { useRef, useEffect, useState, useCallback } from 'react';
import { ChevronUp, ChevronDown, ShoppingBag } from 'lucide-react';

interface LookbookProps {
  onVisibilityChange: (visible: boolean) => void;
}

const WHATSAPP_NUMBER = '2348035550198';

const products = [
  {
    name: 'Oba Agbada Set',
    priceNgn: '₦850,000',
    priceUsd: '$530',
    desc: 'Three-piece ceremonial robe in handwoven navy Aso-Oke with gold filigree embroidery',
    img: '/product-agbada-set.jpg',
    hasSizes: true,
  },
  {
    name: 'Iyeke Iro & Buba',
    priceNgn: '₦420,000',
    priceUsd: '$262',
    desc: 'Wrap skirt and blouse ensemble in coral Adire silk',
    img: '/product-iro-buba.jpg',
    hasSizes: true,
  },
  {
    name: 'Ade Filà',
    priceNgn: '₦85,000',
    priceUsd: '$53',
    desc: 'Sculptural royal cap in quilted terracotta Aso-Oke',
    img: '/product-fila.jpg',
    hasSizes: false,
  },
  {
    name: 'Olori Aso-Ebi',
    priceNgn: '₦650,000',
    priceUsd: '$406',
    desc: 'Matching family set for 6 in champagne gold lace',
    img: '/product-aso-ebi.jpg',
    hasSizes: true,
  },
  {
    name: 'Arewa Wrap',
    priceNgn: '₦280,000',
    priceUsd: '$175',
    desc: 'Convertible draped gown in emerald green silk',
    img: '/product-wrap.jpg',
    hasSizes: true,
  },
  {
    name: 'Aláàárì Bangle Set',
    priceNgn: '₦125,000',
    priceUsd: '$78',
    desc: 'Hand-cast brass and coral bead bracelets',
    img: '/product-bangles.jpg',
    hasSizes: false,
  },
  {
    name: 'Ìrànlóòwó Clutch',
    priceNgn: '₦195,000',
    priceUsd: '$122',
    desc: 'Aso-Oke panel clutch with brass clasp',
    img: '/product-clutch.jpg',
    hasSizes: false,
  },
  {
    name: 'Bespoke Consultation',
    priceNgn: '₦50,000',
    priceUsd: '$31',
    desc: 'Personal fitting and fabric selection session',
    img: '/product-consultation.jpg',
    hasSizes: false,
  },
];

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

export default function Lookbook({ onVisibilityChange }: LookbookProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});
  const [sizeErrors, setSizeErrors] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          onVisibilityChange(entry.isIntersecting && entry.intersectionRatio > 0.8);
        });
      },
      { threshold: [0.8, 0.9, 1.0] }
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [onVisibilityChange]);

  const scrollUp = () => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
    }
  };

  const scrollDown = () => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') scrollUp();
    if (e.key === 'ArrowDown') scrollDown();
  };

  const buildWhatsAppLink = useCallback((product: typeof products[0], index: number): string | null => {
    if (product.hasSizes && !selectedSizes[index]) {
      setSizeErrors((prev) => ({ ...prev, [index]: true }));
      setTimeout(() => {
        setSizeErrors((prev) => ({ ...prev, [index]: false }));
      }, 2000);
      return null;
    }

    setSizeErrors((prev) => ({ ...prev, [index]: false }));

    const sizeLine = product.hasSizes && selectedSizes[index]
      ? `\n📏 *Size:* ${selectedSizes[index]}`
      : '';

    const message = `Hello Alhaja Kadijat! 👋\n\nI would like to order:\n\n🛍️ *${product.name}*${sizeLine}\n💰 *Price:* ${product.priceNgn} (${product.priceUsd})\n\nPlease let me know the next steps for payment and delivery.\n\nThank you!`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [selectedSizes]);

  const handleAddToBag = useCallback((product: typeof products[0], index: number) => {
    const link = buildWhatsAppLink(product, index);
    if (link) {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  }, [buildWhatsAppLink]);

  return (
    <section id="lookbook" className="bg-linen" onKeyDown={handleKeyDown} tabIndex={0}>
      <div className="text-center pt-10">
        <p className="section-label text-terracotta">LOOKBOOK</p>
      </div>

      <div className="progress-bar">
        <div className="progress-bar__fill" />
      </div>

      <button
        onClick={scrollUp}
        className="nav-btn nav-btn--up hidden md:flex"
        aria-label="Scroll up"
      >
        <ChevronUp size={24} />
      </button>
      <button
        onClick={scrollDown}
        className="nav-btn nav-btn--down hidden md:flex"
        aria-label="Scroll down"
      >
        <ChevronDown size={24} />
      </button>

      <div
        ref={wrapperRef}
        className="lookbook-wrapper scrollbar-hide"
      >
        {products.map((product, index) => (
          <div key={index} className="product-card">
            <div className="product-card__image">
              <img
                src={product.img}
                alt={product.name}
                loading="lazy"
              />
            </div>
            <div className="product-card__content">
              <h3
                className="heading-display text-midnight mb-2"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
              >
                {product.name}
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-body font-semibold text-lg text-terracotta tracking-tight">
                  {product.priceNgn}
                </span>
                <span className="font-body text-taupe text-sm">
                  / {product.priceUsd}
                </span>
              </div>
              <p className="font-body text-taupe text-sm leading-relaxed mb-6 max-w-md">
                {product.desc}
              </p>

              {product.hasSizes && (
                <div className="mb-2">
                  <div className="flex gap-2 mb-1">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSizes((prev) => ({
                            ...prev,
                            [index]: prev[index] === size ? '' : size,
                          }));
                          setSizeErrors((prev) => ({ ...prev, [index]: false }));
                        }}
                        className={`w-10 h-10 font-body text-xs font-medium border transition-all duration-200 ${
                          selectedSizes[index] === size
                            ? 'bg-midnight text-linen border-midnight'
                            : sizeErrors[index]
                              ? 'bg-transparent text-midnight border-terracotta'
                              : 'bg-transparent text-midnight border-[rgba(26,26,46,0.2)] hover:border-midnight'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {sizeErrors[index] && (
                    <p className="font-body text-xs text-terracotta mb-3">
                      Please select a size to continue
                    </p>
                  )}
                </div>
              )}

              <button
                onClick={() => handleAddToBag(product, index)}
                className="w-full md:w-auto flex items-center justify-center gap-2 bg-midnight text-linen font-body font-medium text-xs uppercase tracking-[0.1em] py-4 px-10 hover:bg-terracotta transition-colors duration-300"
              >
                <ShoppingBag size={16} />
                {product.name.includes('Consultation') ? 'Book Now' : 'Buy Now'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
