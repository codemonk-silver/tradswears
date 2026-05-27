import { useState, useRef, useCallback, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, Calendar, User, Mail, Phone, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    name: 'Personal Fitting',
    price: 'From ₦100,000',
    desc: 'In-studio measurement and consultation',
    img: '/collection-bespoke.jpg',
  },
  {
    name: 'Custom Design',
    price: 'From ₦500,000',
    desc: 'Design from sketch to finished garment',
    img: '/collection-adire.jpg',
  },
  {
    name: 'Wedding Commission',
    price: 'From ₦2,500,000',
    desc: 'Full bridal party attire',
    img: '/collection-aso-ebi.jpg',
  },
];

function TiltCard({ service }: { service: typeof services[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = x - rect.width / 2;
    const centerY = y - rect.height / 2;
    const rotateX = (centerY / rect.height) * -20;
    const rotateY = (centerX / rect.width) * 20;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'rotateX(0) rotateY(0)';
  }, []);

  return (
    <div
      ref={cardRef}
      className="tilt-card mx-auto"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.1s ease' }}
    >
      <img src={service.img} alt={service.name} loading="lazy" />
      <div className="tilt-card__overlay">
        <h3
          className="font-display text-[22px] text-linen mb-1"
          style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}
        >
          {service.name}
        </h3>
        <p className="font-body text-sm text-terracotta">{service.price}</p>
        <p className="font-body text-xs text-[rgba(247,243,238,0.7)] mt-1">
          {service.desc}
        </p>
      </div>
    </div>
  );
}

export default function Bespoke() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = sectionRef.current?.querySelectorAll('.tilt-card');
      if (!cards) return;
      cards.forEach((card, index) => {
        gsap.from(card, {
          opacity: 0,
          y: 50,
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! Your consultation request has been submitted. We will contact you shortly.');
    setShowModal(false);
    setFormData({ name: '', email: '', phone: '', date: '', message: '' });
  };

  return (
    <>
      <section
        id="bespoke"
        ref={sectionRef}
        className="bg-white py-[120px] px-4 md:px-8"
      >
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <p className="section-label mb-4 text-terracotta">BESPOKE</p>
            <h2
              className="heading-display text-midnight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Made for You
            </h2>
            <p className="font-body text-taupe max-w-[520px] mx-auto text-base leading-relaxed">
              Commission a one-of-a-kind piece. Our master tailor works directly with you — from fabric selection to final fitting.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12 max-w-[1000px] mx-auto">
            {services.map((service, index) => (
              <TiltCard key={index} service={service} />
            ))}
          </div>

          <div className="text-center">
            <button onClick={() => setShowModal(true)} className="btn-accent">
              Book Consultation
            </button>
          </div>
        </div>
      </section>

      {showModal && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={() => setShowModal(false)}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="relative bg-midnight w-full max-w-lg p-8 md:p-10 z-10 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-linen/60 hover:text-linen transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            <h3 className="heading-display text-linen text-2xl mb-2">
              Book a Consultation
            </h3>
            <p className="font-body text-[rgba(247,243,238,0.6)] text-sm mb-8">
              Fill in your details and we&apos;ll get back to you within 24 hours.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(247,243,238,0.4)]" />
                <input
                  type="text"
                  placeholder="Full Name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border border-[rgba(247,243,238,0.2)] text-linen pl-10 pr-4 py-3 font-body text-sm placeholder:text-[rgba(247,243,238,0.4)] focus:border-terracotta focus:outline-none transition-colors"
                />
              </div>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(247,243,238,0.4)]" />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-transparent border border-[rgba(247,243,238,0.2)] text-linen pl-10 pr-4 py-3 font-body text-sm placeholder:text-[rgba(247,243,238,0.4)] focus:border-terracotta focus:outline-none transition-colors"
                />
              </div>
              <div className="relative">
                <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(247,243,238,0.4)]" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-transparent border border-[rgba(247,243,238,0.2)] text-linen pl-10 pr-4 py-3 font-body text-sm placeholder:text-[rgba(247,243,238,0.4)] focus:border-terracotta focus:outline-none transition-colors"
                />
              </div>
              <div className="relative">
                <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[rgba(247,243,238,0.4)]" />
                <input
                  type="date"
                  placeholder="Preferred Date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-transparent border border-[rgba(247,243,238,0.2)] text-linen pl-10 pr-4 py-3 font-body text-sm placeholder:text-[rgba(247,243,238,0.4)] focus:border-terracotta focus:outline-none transition-colors"
                />
              </div>
              <div className="relative">
                <MessageSquare size={16} className="absolute left-3 top-3 text-[rgba(247,243,238,0.4)]" />
                <textarea
                  placeholder="Tell us about your vision..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-transparent border border-[rgba(247,243,238,0.2)] text-linen pl-10 pr-4 py-3 font-body text-sm placeholder:text-[rgba(247,243,238,0.4)] focus:border-terracotta focus:outline-none transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-terracotta text-linen font-body font-medium text-xs uppercase tracking-[0.1em] py-4 hover:bg-[#a84d20] transition-colors duration-300"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
