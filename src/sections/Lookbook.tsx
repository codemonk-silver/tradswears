import { useState, useCallback } from 'react';
import { ShoppingBag } from 'lucide-react';

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
    name: 'Ade Fila',
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
    name: 'Alaaari Bangle Set',
    priceNgn: '₦125,000',
    priceUsd: '$78',
    desc: 'Hand-cast brass and coral bead bracelets',
    img: '/product-bangles.jpg',
    hasSizes: false,
  },
  {
    name: 'Iranslowo Clutch',
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

export default function Lookbook() {
  const [selectedSizes, setSelectedSizes] = useState<Record<number, string>>({});
  const [sizeErrors, setSizeErrors] = useState<Record<number, boolean>>({});

  const buildWhatsAppLink = useCallback((product: typeof products[0], index: number): string | null => {
    if (product.hasSizes && !selectedSizes[index]) {
      setSizeErrors((prev) => ({ ...prev, [index]: true }));
      setTimeout(() => setSizeErrors((prev) => ({ ...prev, [index]: false })), 2000);
      return null;
    }
    setSizeErrors((prev) => ({ ...prev, [index]: false }));
    const sizeLine = product.hasSizes && selectedSizes[index] ? `\nSize: ${selectedSizes[index]}` : '';
    const message = `Hello Alhaja Kadijat!\n\nI would like to order:\n\n${product.name}${sizeLine}\nPrice: ${product.priceNgn} (${product.priceUsd})\n\nPlease let me know the next steps for payment and delivery.\n\nThank you!`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [selectedSizes]);

  const handleBuy = useCallback((product: typeof products[0], index: number) => {
    const link = buildWhatsAppLink(product, index);
    if (link) window.open(link, '_blank', 'noopener,noreferrer');
  }, [buildWhatsAppLink]);

  return (
    <section id="lookbook" className="bg-linen py-20 md:py-32">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="text-center mb-12 md:mb-20">
          <p className="section-label mb-4 text-terracotta">LOOKBOOK</p>
          <h2 className="heading-display text-midnight text-3xl md:text-5xl">
            Our Collection
          </h2>
        </div>

        {/* Desktop: 2-column grid */}
        <div className="hidden md:grid md:grid-cols-2 gap-x-12 gap-y-20">
          {products.map((product, index) => (
            <div key={index} className="group">
              <div className="aspect-[3/4] overflow-hidden mb-6 bg-white">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div>
                <h3 className="font-display text-midnight text-xl mb-1">
                  {product.name}
                </h3>
                <div className="flex items-baseline gap-2 mb-3">
                  <span className="font-body font-semibold text-terracotta">
                    {product.priceNgn}
                  </span>
                  <span className="font-body text-sm text-taupe">
                    ({product.priceUsd})
                  </span>
                </div>
                <p className="font-body text-sm text-taupe leading-relaxed mb-4 max-w-md">
                  {product.desc}
                </p>

                {product.hasSizes && (
                  <div className="mb-4">
                    <div className="flex gap-2">
                      {sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => {
                            setSelectedSizes((prev) => ({ ...prev, [index]: prev[index] === size ? '' : size }));
                            setSizeErrors((prev) => ({ ...prev, [index]: false }));
                          }}
                          className={`w-9 h-9 font-body text-xs font-medium border transition-all duration-200 ${
                            selectedSizes[index] === size
                              ? 'bg-midnight text-linen border-midnight'
                              : sizeErrors[index]
                                ? 'border-terracotta text-midnight'
                                : 'border-[rgba(26,26,46,0.15)] text-midnight hover:border-midnight'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                    {sizeErrors[index] && (
                      <p className="font-body text-xs text-terracotta mt-2">Please select a size</p>
                    )}
                  </div>
                )}

                <button
                  onClick={() => handleBuy(product, index)}
                  className="flex items-center gap-2 bg-midnight text-linen font-body font-medium text-xs uppercase tracking-[0.1em] py-3 px-8 hover:bg-terracotta transition-colors duration-300"
                >
                  <ShoppingBag size={15} />
                  {product.name.includes('Consultation') ? 'Book Now' : 'Buy Now'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile: single column, stacked cards */}
        <div className="md:hidden space-y-12">
          {products.map((product, index) => (
            <div key={index} className="border-b border-[rgba(26,26,46,0.08)] pb-12 last:border-0">
              <div className="aspect-[3/4] overflow-hidden mb-4 bg-white">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="font-display text-midnight text-xl mb-1">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-2 mb-3">
                <span className="font-body font-semibold text-terracotta text-base">
                  {product.priceNgn}
                </span>
                <span className="font-body text-sm text-taupe">
                  ({product.priceUsd})
                </span>
              </div>
              <p className="font-body text-sm text-taupe leading-relaxed mb-4">
                {product.desc}
              </p>

              {product.hasSizes && (
                <div className="mb-4">
                  <div className="flex gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSizes((prev) => ({ ...prev, [index]: prev[index] === size ? '' : size }));
                          setSizeErrors((prev) => ({ ...prev, [index]: false }));
                        }}
                        className={`w-10 h-10 font-body text-xs font-medium border transition-all duration-200 ${
                          selectedSizes[index] === size
                            ? 'bg-midnight text-linen border-midnight'
                            : sizeErrors[index]
                              ? 'border-terracotta text-midnight'
                              : 'border-[rgba(26,26,46,0.15)] text-midnight hover:border-midnight'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {sizeErrors[index] && (
                    <p className="font-body text-xs text-terracotta mt-2">Please select a size</p>
                  )}
                </div>
              )}

              <button
                onClick={() => handleBuy(product, index)}
                className="w-full flex items-center justify-center gap-2 bg-midnight text-linen font-body font-medium text-xs uppercase tracking-[0.1em] py-4 px-8 hover:bg-terracotta transition-colors duration-300"
              >
                <ShoppingBag size={16} />
                {product.name.includes('Consultation') ? 'Book Now' : 'Buy Now'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}