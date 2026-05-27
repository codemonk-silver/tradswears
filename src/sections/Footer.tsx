export default function Footer() {
  return (
    <footer className="bg-linen border-t border-[rgba(26,26,46,0.08)] py-10 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-body font-semibold text-[13px] uppercase tracking-[0.15em] text-midnight mb-2">
            ALHAJA KADIJAT
          </p>
          <p className="font-body text-xs text-taupe">
            &copy; 2025 Alhaja Kadijat. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="font-body text-xs uppercase tracking-[0.1em] text-taupe hover:text-terracotta transition-colors">
            Privacy
          </a>
          <a href="#" className="font-body text-xs uppercase tracking-[0.1em] text-taupe hover:text-terracotta transition-colors">
            Terms
          </a>
          <a href="#" className="font-body text-xs uppercase tracking-[0.1em] text-taupe hover:text-terracotta transition-colors">
            Shipping
          </a>
          <a href="#" className="font-body text-xs uppercase tracking-[0.1em] text-taupe hover:text-terracotta transition-colors">
            Care Guide
          </a>
        </div>

        <p className="font-body text-xs text-taupe">
          Lagos, Nigeria &middot; Shipping Worldwide
        </p>
      </div>
    </footer>
  );
}
