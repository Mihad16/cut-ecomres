export default function Footer({ scrollToSection }) {
  return (
    <footer className="bg-brand-charcoal py-24 px-[6vw] text-white/90 text-left border-t border-brand-sandstone/20">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 pb-16 border-b border-brand-sandstone/20 max-w-6xl mx-auto">
        {/* Logo details */}
        <div className="md:col-span-1">
          <div className="footer-logo-box">
            <span className="footer-logo-monogram text-brand-charcoal">C&C</span>
            <span className="footer-logo-title">Cut & Cure</span>
          </div>
          <p className="font-sans text-[13px] font-light leading-relaxed text-white/60 max-w-xs">
            An elegant fusion of floral artistry, landscape design, and specialty coffee, housed in the heart of Dubai.
          </p>
        </div>

        {/* Discover Column */}
        <div>
          <h4 className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-6">Discover</h4>
          <ul className="space-y-4 font-sans text-[13px] font-light text-white/60">
            <li><a href="#" className="hover:text-brand-gold transition-colors duration-300">Journal</a></li>
            <li><a href="#contact" onClick={scrollToSection('contact')} className="hover:text-brand-gold transition-colors duration-300">Contact</a></li>
            <li><a href="#services" onClick={scrollToSection('services')} className="hover:text-brand-gold transition-colors duration-300">Boutique</a></li>
          </ul>
        </div>

        {/* Legal Column */}
        <div>
          <h4 className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-6">Legal</h4>
          <ul className="space-y-4 font-sans text-[13px] font-light text-white/60">
            <li><a href="#" className="hover:text-brand-gold transition-colors duration-300">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-brand-gold transition-colors duration-300">Terms of Use</a></li>
          </ul>
        </div>

        {/* Location Column */}
        <div>
          <h4 className="font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-gold mb-6">Location</h4>
          <ul className="space-y-4 font-sans text-[13px] font-light text-white/60">
            <li>District 11, Jumeirah,</li>
            <li>Dubai, United Arab Emirates</li>
            <li>
              <a href="mailto:hello@cutandcure.com" className="hover:text-brand-gold transition-colors duration-300">
                hello@cutandcure.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Copyright */}
      <div className="flex flex-col sm:flex-row justify-between items-center pt-8 gap-4 max-w-6xl mx-auto">
        <div className="flex gap-4 font-sans text-[11px] font-light text-white/40">
          <span>PRIVACY POLICY</span>
          <span>|</span>
          <span>LAUNCHING SOON</span>
        </div>
        <span className="font-sans text-[11px] font-light text-white/40">
          &copy; 2026 CUT & CURE. ALL RIGHTS RESERVED.
        </span>
      </div>
    </footer>
  );
}
