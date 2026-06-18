import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function NavLink({ href, id, label, activeSection, onClick }) {
  const isActive = activeSection === id;

  return (
    <a
      href={href}
      onClick={onClick}
      className={`nav-link ${isActive ? 'active' : ''}`}
    >
      {label}
    </a>
  );
}

export default function Navbar({ activeSection, scrollToSection }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed w-full z-50 px-0 md:px-0"
    >
      <motion.div
        animate={{
          paddingTop: isScrolled ? 16 : 20,
          paddingBottom: isScrolled ? 16 : 20,
          paddingLeft: isScrolled ? 24 : 32,
          paddingRight: isScrolled ? 24 : 32,
          boxShadow: isScrolled
            ? '0 8px 32px rgba(0,0,0,0.08)'
            : '0 10px 40px rgba(0,0,0,0.06)',
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto bg-white/90 backdrop-blur-xl"
      >
        <div className="flex items-center justify-between">
          {/* Logo - Circle removed */}
         <a
  href="#"
  onClick={scrollToSection("home")}
  className="flex items-center gap-3"
>
  <div className="w-10 h-10 rounded-full border border-brand-gold flex items-center justify-center">
    <span className="font-serif text-brand-gold text-sm">
      C&C
    </span>
  </div>

  <div>
    <p className="text-sm font-medium text-brand-charcoal">
      Cut & Cure
    </p>

    <p className="text-[10px] uppercase tracking-[0.2em] text-brand-espresso/60">
      Dubai
    </p>
  </div>
</a>


          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            <NavLink href="#home" id="home" label="Home" activeSection={activeSection} onClick={scrollToSection('home')} />
            <NavLink href="#services" id="services" label="Services" activeSection={activeSection} onClick={scrollToSection('services')} />
            <NavLink href="#about" id="about" label="About" activeSection={activeSection} onClick={scrollToSection('about')} />
            <NavLink href="#contact" id="contact" label="Contact" activeSection={activeSection} onClick={scrollToSection('contact')} />
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              onClick={scrollToSection('contact')}
              className="btn-premium bg-brand-charcoal text-white px-6 py-3 rounded-full text-xs uppercase tracking-[0.15em]"
            >
              Coming Soon
            </a>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-1"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={mobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-[2px] bg-brand-charcoal origin-center"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              animate={mobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              className="w-6 h-[2px] bg-brand-charcoal"
              transition={{ duration: 0.2 }}
            />
            <motion.span
              animate={mobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-[2px] bg-brand-charcoal origin-center"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="lg:hidden overflow-hidden"
            >
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
                }}
                className="pt-6 pb-2 flex flex-col gap-5"
              >
                {[
                  { id: 'home', label: 'Home' },
                  { id: 'services', label: 'Services' },
                  { id: 'about', label: 'About' },
                  { id: 'contact', label: 'Contact' },
                ].map(({ id, label }) => (
                  <motion.a
                    key={id}
                    href={`#${id}`}
                    variants={{
                      hidden: { opacity: 0, x: -12 },
                      visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                    }}
                    onClick={(e) => {
                      scrollToSection(id)(e);
                      setMobileMenuOpen(false);
                    }}
                    className="nav-link text-sm"
                  >
                    {label}
                  </motion.a>
                ))}

                <motion.a
                  href="#contact"
                  variants={{
                    hidden: { opacity: 0, y: 8 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
                  }}
                  onClick={(e) => {
                    scrollToSection('contact')(e);
                    setMobileMenuOpen(false);
                  }}
                  className="btn-premium mt-2 bg-brand-charcoal text-white text-center py-3 rounded-full text-xs uppercase tracking-[0.15em]"
                >
                  Coming Soon
                </motion.a>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.header>
  );
}