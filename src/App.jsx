import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// --- PARALLAX IMAGE COMPONENT ---
// Slowly shifts image y position based on page scroll for lookbook feel
function ParallaxImage({ src, alt }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Subtle parallax translation mapping
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <div ref={containerRef} className="w-full h-full overflow-hidden relative border border-brand-sandstone bg-brand-alabaster">
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="w-full h-[112%] absolute top-[-6%] left-0 object-cover scale-[1.01] transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04]"
      />
    </div>
  );
}

// --- TEXT REVEAL WRAPPER ---
// Standard fade-in slide-up transition using Intersection Observer logic in Framer Motion
function Reveal({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  // --- STATE ---
  const [isScrolled, setIsScrolled] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // --- REFS ---
  const servicesRef = useRef(null);

  // --- SCROLL PROGRESS & TRANSFORM FOR PARALLEL COLUMNS ---
  const { scrollYProgress } = useScroll({
    target: servicesRef,
    offset: ["start end", "end start"]
  });

  // Responsive check for mobile viewport & Scroll spy Intersection Observer
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkViewport();
    window.addEventListener('resize', checkViewport);
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 80);
    }, { passive: true });

    // Scroll spy Intersection Observer
    const sections = ['home', 'services', 'about', 'gallery', 'contact'];
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('resize', checkViewport);
      observer.disconnect();
    };
  }, []);

  // Parallel translations: Left column shifts slightly up, Right column shifts slightly down
  const leftY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [50, -50]);
  const rightY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [-50, 50]);

  // Newsletter Submit Logic
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && name && service) {
      setShowSuccess(true);
      setEmail('');
      setName('');
      setService('');
      setMessage('');
      setTimeout(() => setShowSuccess(false), 5000);
    }
  };

  // Smooth Scroll offset calculation
  const scrollToSection = (id) => (e) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 90; // compact header size
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Staggered reveal settings for Hero
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="relative min-h-screen bg-brand-alabaster text-brand-charcoal overflow-x-hidden selection:bg-brand-charcoal selection:text-brand-alabaster">

      {/* Header Navigation */}
      <header className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] border-b border-brand-sandstone/10 backdrop-blur-md bg-brand-alabaster/85
        ${isScrolled ? 'py-4 px-6 md:px-20' : 'py-7 px-6 md:px-20'}`}
      >
        <a href="#" onClick={scrollToSection('home')} className="logo-monogram-box hover:opacity-90 transition-opacity duration-300">
          <div className="flex flex-col items-center">
            <span className="font-serif leading-none text-brand-gold text-lg tracking-normal">C&C</span>
            <span className="text-[5px] tracking-[0.25em] font-sans font-semibold mt-1 text-brand-espresso">Cut & Cure</span>
          </div>
        </a>

        <nav className="hidden md:flex gap-12 items-center">
          <a
            href="#"
            onClick={scrollToSection('home')}
            className={`text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-espresso hover:text-brand-gold transition-colors duration-300 py-1 relative
              ${activeSection === 'home' ? 'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-brand-gold' : ''}`}
          >
            Home
          </a>
          <a
            href="#services"
            onClick={scrollToSection('services')}
            className={`text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-espresso hover:text-brand-gold transition-colors duration-300 py-1 relative
              ${activeSection === 'services' ? 'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-brand-gold' : ''}`}
          >
            Services
          </a>
          <a
            href="#about"
            onClick={scrollToSection('about')}
            className={`text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-espresso hover:text-brand-gold transition-colors duration-300 py-1 relative
              ${activeSection === 'about' || activeSection === 'gallery' ? 'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-brand-gold' : ''}`}
          >
            About
          </a>
          <a
            href="#contact"
            onClick={scrollToSection('contact')}
            className={`text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-espresso hover:text-brand-gold transition-colors duration-300 py-1 relative
              ${activeSection === 'contact' ? 'after:content-[""] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-brand-gold' : ''}`}
          >
            Contact
          </a>
        </nav>

        {/* Mobile menu toggle button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="label-caps text-brand-charcoal tracking-widest outline-none z-50 cursor-pointer"
          >
            {mobileMenuOpen ? 'CLOSE' : 'MENU'}
          </button>
        </div>

        <div className="hidden md:block">
          <a href="#contact" onClick={scrollToSection('contact')} className="btn-nav-outline hover:opacity-90">
            Coming Soon
          </a>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-brand-alabaster z-40 flex flex-col justify-center items-center px-6"
          >
            <nav className="flex flex-col gap-8 text-center">
              <a
                href="#"
                onClick={(e) => {
                  scrollToSection('home')(e);
                  setMobileMenuOpen(false);
                }}
                className="font-serif text-3xl text-brand-charcoal uppercase tracking-wider hover:opacity-70 transition-opacity"
              >
                Home
              </a>
              <a
                href="#services"
                onClick={(e) => {
                  scrollToSection('services')(e);
                  setMobileMenuOpen(false);
                }}
                className="font-serif text-3xl text-brand-charcoal uppercase tracking-wider hover:opacity-70 transition-opacity"
              >
                Services
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  scrollToSection('about')(e);
                  setMobileMenuOpen(false);
                }}
                className="font-serif text-3xl text-brand-charcoal uppercase tracking-wider hover:opacity-70 transition-opacity"
              >
                About
              </a>
              <a
                href="#contact"
                onClick={(e) => {
                  scrollToSection('contact')(e);
                  setMobileMenuOpen(false);
                }}
                className="font-serif text-3xl text-brand-charcoal uppercase tracking-wider hover:opacity-70 transition-opacity"
              >
                Contact
              </a>
            </nav>
            <div className="absolute bottom-12 text-center">
              <span className="label-caps text-brand-espresso tracking-widest block mb-2">CUT & CURE ATELIER</span>
              <span className="text-xs text-brand-charcoal/50">JUMEIRAH, DUBAI</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#1e1a17]" id="home">
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <img
            src="/assets/hero_cover.png"
            alt="Cut & Cure Dubai Luxury Interior Atmosphere"
            className="w-full h-full object-cover opacity-60 filter brightness-[0.78] sepia-[0.06] scale-[1.04]"
            style={{ animation: 'slowZoom 25s infinite alternate ease-in-out' }}
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-brand-charcoal/20 via-brand-charcoal/40 to-brand-charcoal/60 z-20" />

        {/* Centered Emblem Card Layout */}
        <motion.div
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-30 text-center text-white px-6 max-w-4xl flex flex-col items-center"
        >
          {/* Square Logo Emblem */}
          <motion.div variants={heroItemVariants} className="hero-emblem-card">
            <span className="hero-emblem-monogram">C&C</span>
            <span className="hero-emblem-title">Cut & Cure</span>
          </motion.div>

          {/* EST. 2026 Tag */}
          <motion.div variants={heroItemVariants} className="hero-year-tag">
            EST. 2026
          </motion.div>

          {/* Subtitle Description */}
          <motion.p
            variants={heroItemVariants}
            className="text-[18px] sm:text-[20px] md:text-[22px] font-serif font-light text-brand-cream tracking-wide max-w-3xl leading-relaxed mb-10"
          >
            A bespoke flower boutique, premium landscaping, and a specialty coffee experience coming soon to the heart of Dubai.
          </motion.p>

          {/* Action Button */}
          <motion.div variants={heroItemVariants}>
            <a
              href="#services"
              onClick={scrollToSection('services')}
              className="btn-charcoal-solid inline-block"
            >
              Discover the Workspace
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 text-center text-white/80" style={{ animation: 'fadeIn 2.5s ease 1s forwards', opacity: 0 }}>
          <span className="text-[9px] uppercase tracking-[0.3em] block mb-2 font-sans font-medium text-brand-gold">Explore</span>
          <span className="text-brand-gold font-light block text-xs">v</span>
        </div>
      </section>

      {/* Services / Offerings Section */}
      <section ref={servicesRef} className="py-[160px] bg-brand-alabaster overflow-hidden border-b border-brand-sandstone/10" id="services">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <Reveal>
            {/* Header Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline mb-24 text-left">
              <div className="md:col-span-7">
                <span className="label-caps text-brand-espresso mb-4 block">OUR OFFERINGS</span>
                <h2 className="display-lg uppercase text-brand-charcoal">
                  Curated for the<br />Discerning
                </h2>
              </div>
              <div className="md:col-span-5 body-lg text-brand-charcoal/70 md:pl-8">
                <p>Experience a lifestyle destination where every detail is considered and every moment is elevated.</p>
              </div>
            </div>
          </Reveal>

        {/* 2-Column Aligned Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">

          {/* Card 1: Flower Boutique */}
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-brand-cream border border-brand-sandstone/30 p-8 md:p-10 flex flex-col gap-8 transition-shadow duration-500 hover:shadow-xl cursor-pointer"
          >
            <Reveal>
              <div className="w-full aspect-[4/5] relative">
                <ParallaxImage src="/assets/flower_boutique.png" alt="Luxury Flower Arrangement by Cut & Cure" />
                <div className="absolute top-4 right-4 z-20 bg-brand-charcoal/90 backdrop-blur-md text-brand-gold border border-brand-gold/20 text-[9px] uppercase tracking-[0.22em] py-1.5 px-3.5 font-sans font-medium">
                  Coming Soon
                </div>
              </div>
              <div className="text-center flex flex-col gap-4 mt-6">
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-brand-gold">FLORAL ARTISTRY</span>
                <h3 className="font-serif text-[28px] font-light uppercase text-brand-charcoal">Flower Boutique</h3>
                <p className="font-sans text-[14px] font-light leading-relaxed text-brand-espresso/80 max-w-sm mx-auto">
                  Bespoke arrangements for the discerning eye. A fusion of botanical rarity and artistic expression.
                </p>
                <div className="text-[11px] font-semibold tracking-[0.2em] text-brand-gold uppercase mt-4 hover:text-brand-charcoal transition-colors duration-300">
                  Discover More &rarr;
                </div>
              </div>
            </Reveal>
          </motion.div>

          {/* Card 2: Specialty Coffee */}
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-brand-cream border border-brand-sandstone/30 p-8 md:p-10 flex flex-col gap-8 transition-shadow duration-500 hover:shadow-xl cursor-pointer"
          >
            <Reveal>
              <div className="w-full aspect-[4/5] relative">
                <ParallaxImage src="/assets/coffee_experience.png" alt="Specialty Coffee Cup Latte Art" />
                <div className="absolute top-4 right-4 z-20 bg-brand-charcoal/90 backdrop-blur-md text-brand-gold border border-brand-gold/20 text-[9px] uppercase tracking-[0.22em] py-1.5 px-3.5 font-sans font-medium">
                  Coming Soon
                </div>
              </div>
              <div className="text-center flex flex-col gap-4 mt-6">
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-brand-gold">THE ART OF ESPRESSO</span>
                <h3 className="font-serif text-[28px] font-light uppercase text-brand-charcoal">Specialty Coffee</h3>
                <p className="font-sans text-[14px] font-light leading-relaxed text-brand-espresso/80 max-w-sm mx-auto">
                  A curated sensory journey of rare beans. Every cup is a testament to the art of the perfect extraction.
                </p>
                <div className="text-[11px] font-semibold tracking-[0.2em] text-brand-gold uppercase mt-4 hover:text-brand-charcoal transition-colors duration-300">
                  Discover More &rarr;
                </div>
              </div>
            </Reveal>
          </motion.div>

          {/* Card 3: Plants & Landscaping */}
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-brand-cream border border-brand-sandstone/30 p-8 md:p-10 flex flex-col gap-8 transition-shadow duration-500 hover:shadow-xl cursor-pointer"
          >
            <Reveal>
              <div className="w-full aspect-[4/5] relative">
                <ParallaxImage src="/assets/landscaping.png" alt="Premium Architectural Plants & Landscaping Layout" />
                <div className="absolute top-4 right-4 z-20 bg-brand-charcoal/90 backdrop-blur-md text-brand-gold border border-brand-gold/20 text-[9px] uppercase tracking-[0.22em] py-1.5 px-3.5 font-sans font-medium">
                  Coming Soon
                </div>
              </div>
              <div className="text-center flex flex-col gap-4 mt-6">
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-brand-gold">BOTANICAL DESIGN</span>
                <h3 className="font-serif text-[28px] font-light uppercase text-brand-charcoal">Plants & Landscaping</h3>
                <p className="font-sans text-[14px] font-light leading-relaxed text-brand-espresso/80 max-w-sm mx-auto">
                  Bespoke green sanctuaries for premium living. Architecting nature inside the modern urban landscape.
                </p>
                <div className="text-[11px] font-semibold tracking-[0.2em] text-brand-gold uppercase mt-4 hover:text-brand-charcoal transition-colors duration-300">
                  Discover More &rarr;
                </div>
              </div>
            </Reveal>
          </motion.div>

          {/* Card 4: Events Organization */}
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="bg-brand-cream border border-brand-sandstone/30 p-8 md:p-10 flex flex-col gap-8 transition-shadow duration-500 hover:shadow-xl cursor-pointer"
          >
            <Reveal>
              <div className="w-full aspect-[4/5] relative">
                <ParallaxImage src="/assets/events.png" alt="Curated Table Setting for Luxury Event" />
                <div className="absolute top-4 right-4 z-20 bg-brand-charcoal/90 backdrop-blur-md text-brand-gold border border-brand-gold/20 text-[9px] uppercase tracking-[0.22em] py-1.5 px-3.5 font-sans font-medium">
                  Coming Soon
                </div>
              </div>
              <div className="text-center flex flex-col gap-4 mt-6">
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-brand-gold">CURATED SCENOGRAPHY</span>
                <h3 className="font-serif text-[28px] font-light uppercase text-brand-charcoal">Events Organization</h3>
                <p className="font-sans text-[14px] font-light leading-relaxed text-brand-espresso/80 max-w-sm mx-auto">
                  Crafting moments of timeless elegance. Transforming visions into unforgettable sensory experiences.
                  </p>
                <div className="text-[11px] font-semibold tracking-[0.2em] text-brand-gold uppercase mt-4 hover:text-brand-charcoal transition-colors duration-300">
                  Discover More &rarr;
                </div>
              </div>
            </Reveal>
          </motion.div>

        </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-[160px] bg-brand-cream border-b border-brand-sandstone/20" id="about">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-12">
                <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-brand-gold mb-12 block">ABOUT CUT & CURE</span>
              </div>
              <div className="md:col-span-7 headline-lg text-brand-charcoal">
                Cut & Cure is a luxury lifestyle destination designed to bring together beauty, nature, craftsmanship, and hospitality under one elegant roof.
              </div>
              <div className="md:col-span-4 md:col-start-9 body-lg text-brand-espresso/80 space-y-8 md:pt-4">
                <p>Inspired by the art of thoughtful living, we create experiences that transform everyday moments into lasting memories.</p>
                <p>From sculptural floral creations and immersive landscapes to unforgettable gatherings and specialty coffee rituals, every detail is curated with intention.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* The Dubai Experience & Gallery Section */}
      <section className="py-[160px] bg-brand-cream border-b border-brand-sandstone/20" id="gallery">
  <div className="max-w-[1440px] mx-auto px-6 md:px-20">
    <Reveal>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-24 items-start text-left">
        <div className="md:col-span-6">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-brand-gold mb-4 block">THE DUBAI EXPERIENCE</span>
          <h2 className="display-lg uppercase text-brand-charcoal">
            IN THE HEART<br />OF THE CITY
          </h2>
        </div>
        <div className="md:col-span-5 md:col-start-8 body-lg text-brand-espresso/80 space-y-6 md:pt-12">
          <p>Located in the heart of Dubai, Cut & Cure is being created as a destination where nature, design, and hospitality seamlessly come together.</p>
          <p>A place to discover, gather, celebrate, and unwind.</p>
        </div>
      </div>
    </Reveal>

    {/* Gallery Collage */}
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
      {/* Image 1: Dubai Corner (Col 1 to 7) */}
      <div className="md:col-span-7 overflow-hidden border border-brand-sandstone bg-brand-cream relative group aspect-[7/6]">
        <img
          src="/assets/hero_cover.png"
          alt="Bespoke Cut & Cure Store Corner"
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-104"
        />
      </div>

      {/* Philosophy Text (Col 8 to 12) */}
      <div className="md:col-span-5 bg-brand-alabaster border border-brand-sandstone p-10 md:p-12 flex flex-col justify-center text-left">
        <Reveal>
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-brand-gold mb-5 block">OUR PHILOSOPHY</span>
          <p className="font-serif text-[20px] lg:text-[22px] font-light leading-relaxed text-brand-charcoal">
            "We believe true luxury is found in thoughtful details. Every flower selected, every landscape designed, every event curated, and every cup served reflects a commitment to excellence, beauty, and hospitality."
          </p>
        </Reveal>
      </div>

      {/* Image 2: Coffee Curation (Col 1 to 5) */}
      <div className="md:col-span-5 overflow-hidden border border-brand-sandstone bg-brand-cream relative group aspect-[5/4]">
        <img
          src="/assets/coffee_experience.png"
          alt="Coffee Curation Details"
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-104"
        />
      </div>

      {/* Image 3: Flowers (Col 6 to 12) */}
      <div className="md:col-span-7 overflow-hidden border border-brand-sandstone bg-brand-cream relative group aspect-[7/4]">
        <img
          src="/assets/flower_boutique.png"
          alt="Beautiful Muted Roses Arrangement"
          className="w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-104"
        />
      </div>
    </div>
  </div>
</section>

      {/* Luxury Intake Inquiry Section */}
      <section className="py-16 bg-neutral-50 text-center" id="newsletter">
  <div className="max-w-md w-full mx-auto px-6">
    
    {/* Header */}
    <div className="mb-8">
      <span className="text-xs font-semibold tracking-widest uppercase text-amber-600 block mb-2">
        Join the Atelier
      </span>
      <h2 className="text-2xl font-light uppercase text-neutral-800 mb-3 tracking-wide">
        Stay Updated
      </h2>
      <p className="text-sm text-neutral-600 leading-relaxed">
        Receive exclusive event invitations and the latest luxury updates from Dubai.
      </p>
    </div>

    {/* Simple Email Form */}
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
      <div className="flex flex-col gap-1">
        <label htmlFor="emailAddress" className="text-[10px] uppercase tracking-wider text-neutral-400 font-medium">Email Address</label>
        <input
          type="email"
          id="emailAddress"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ENTER YOUR EMAIL"
          required
          className="w-full py-3 border-b border-neutral-300 focus:border-neutral-800 outline-none bg-transparent uppercase text-sm tracking-wide transition-colors"
        />
      </div>

      <button
        type="submit"
        className="w-full mt-2 py-3.5 bg-neutral-900 text-white text-xs tracking-widest uppercase hover:bg-neutral-800 transition-colors font-medium"
      >
        Subscribe
      </button>
    </form>

    {/* Success Message */}
    {showSuccess && (
      <p className="mt-4 text-xs text-emerald-700 tracking-wide">
        Thank you for subscribing!
      </p>
    )}
    
  </div>
</section>

      {/* Footer */}
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
    </div>
  );
}
