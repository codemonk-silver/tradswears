import { useState, useEffect } from 'react';

interface NavigationProps {
  scrollTo: (target: string) => void;
}

const navLinks = [
  { label: 'Collections', target: '#collections' },
  { label: 'Our Craft', target: '#our-craft' },
  { label: 'Lookbook', target: '#lookbook' },
  { label: 'Bespoke', target: '#bespoke' },
  { label: 'Journal', target: '#testimonials' },
];

export default function Navigation({ scrollTo }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.3 }
    );

    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (target: string) => {
    setMobileOpen(false);
    scrollTo(target);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] h-[72px] transition-all duration-300 ${
          isScrolled
            ? 'bg-[rgba(247,243,238,0.92)] backdrop-blur-[16px] border-b border-[rgba(26,26,46,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 h-full flex items-center justify-between">
          <button
            onClick={() => handleNavClick('#hero')}
            className="font-body font-semibold text-[13px] uppercase tracking-[0.15em] text-midnight"
          >
            ALHAJA KADIJAT
          </button>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.target}
                onClick={() => handleNavClick(link.target)}
                className={`nav-link ${activeSection === link.target ? 'active' : ''}`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden md:block">
            <button onClick={() => handleNavClick('#lookbook')} className="btn-solid">
              Shop Now
            </button>
          </div>

          <button
            className="md:hidden flex flex-col gap-[6px] p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-[1px] bg-midnight transition-transform duration-300 ${mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`block w-6 h-[1px] bg-midnight transition-transform duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu md:hidden">
          {navLinks.map((link) => (
            <button
              key={link.target}
              onClick={() => handleNavClick(link.target)}
              className="font-display text-4xl text-midnight hover:text-terracotta transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button onClick={() => handleNavClick('#lookbook')} className="btn-solid mt-4">
            Shop Now
          </button>
        </div>
      )}
    </>
  );
}
