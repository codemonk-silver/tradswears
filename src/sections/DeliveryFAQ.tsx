import { useState } from 'react';
import { ChevronDown, Truck, Clock, Globe, RefreshCw } from 'lucide-react';

const deliveryOptions = [
  { icon: Clock, text: 'Lagos: Same-day delivery (orders before 2pm)' },
  { icon: Truck, text: 'Nigeria: 2-3 business days via DHL' },
  { icon: Globe, text: 'International: 5-7 business days, duties included' },
  { icon: RefreshCw, text: 'Returns: 14-day exchange for bespoke, 30-day refund for ready-to-wear' },
];

const faqItems = [
  {
    question: 'How do I know my size?',
    answer: 'We provide a detailed measurement guide and offer virtual fitting consultations for international clients.',
  },
  {
    question: 'Can I customize a design?',
    answer: 'Absolutely. Bespoke customization is our specialty. Contact us to discuss your vision.',
  },
  {
    question: 'What fabrics do you use?',
    answer: 'We source premium Aso-Oke from Iseyin, Adire from Abeokuta, and silks from Kano. All hand-processed.',
  },
  {
    question: 'How long does bespoke take?',
    answer: 'Ready-to-wear ships within 48 hours. Bespoke pieces take 4-6 weeks from first consultation.',
  },
  {
    question: 'Do you ship internationally?',
    answer: 'Yes, we ship to over 40 countries. All international orders include duties and taxes in the price.',
  },
];

export default function DeliveryFAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="bg-white py-[100px] px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-20">
        <div>
          <h2
            className="heading-display text-midnight mb-8"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}
          >
            Delivery & Returns
          </h2>
          <p className="font-body text-taupe text-[15px] leading-relaxed mb-8">
            We ship worldwide from our Lagos atelier. Each piece is carefully packaged in our signature gift box with tissue paper and a handwritten care card.
          </p>
          <ul className="space-y-4">
            {deliveryOptions.map((option, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-terracotta mt-2 flex-shrink-0" />
                <div className="flex items-center gap-3">
                  <option.icon size={16} className="text-taupe flex-shrink-0" />
                  <span className="font-body text-sm text-midnight">{option.text}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2
            className="heading-display text-midnight mb-8"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)' }}
          >
            Questions
          </h2>
          <div className="space-y-2">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-[rgba(26,26,46,0.08)]">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between py-4 text-left group"
                >
                  <span className="font-body font-medium text-base text-midnight group-hover:text-terracotta transition-colors">
                    {item.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-taupe transition-transform duration-300 flex-shrink-0 ml-4 ${
                      openFaq === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    maxHeight: openFaq === index ? '200px' : '0',
                    opacity: openFaq === index ? 1 : 0,
                  }}
                >
                  <p className="font-body text-sm text-taupe pb-4 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
