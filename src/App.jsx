import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';

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
function Reveal({ children, delay = 0, y = 30 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// --- STAGGERED WORD REVEAL ---
function TextReveal({ text, className = "", delay = 0 }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              delay: delay + i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// --- NAV LINK WITH ACTIVE INDICATOR ---
function NavLink({ href, id, label, activeSection, onClick }) {
  const isActive = activeSection === id;
  return (
    <a
      href={href}
      onClick={onClick}
      className={`nav-link ${isActive ? "active" : ""}`}
    >
      {label}
    </a>
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

  // Smooth spring-driven parallax for services columns
  const smoothServicesProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.001,
  });
  const leftY = useTransform(smoothServicesProgress, [0, 1], isMobile ? [0, 0] : [80, -80]);
  const rightY = useTransform(smoothServicesProgress, [0, 1], isMobile ? [0, 0] : [-80, 80]);
  const headerParallaxY = useTransform(smoothServicesProgress, [0, 1], isMobile ? [0, 0] : [30, -30]);

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
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-5 left-0 w-full z-50 px-4 md:px-8"
      >

<motion.div
  animate={{
    paddingTop: isScrolled ? 16 : 20,
    paddingBottom: isScrolled ? 16 : 20,
    paddingLeft: isScrolled ? 24 : 32,
    paddingRight: isScrolled ? 24 : 32,
    boxShadow: isScrolled
      ? "0 8px 32px rgba(0,0,0,0.08)"
      : "0 10px 40px rgba(0,0,0,0.06)",
  }}
  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
  className="max-w-[1400px] mx-auto bg-white/90 backdrop-blur-xl rounded-full"
>
  <div className="flex items-center justify-between">

{/* Logo */}
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
  <NavLink href="#home" id="home" label="Home" activeSection={activeSection} onClick={scrollToSection("home")} />
  <NavLink href="#services" id="services" label="Services" activeSection={activeSection} onClick={scrollToSection("services")} />
  <NavLink href="#about" id="about" label="About" activeSection={activeSection} onClick={scrollToSection("about")} />
  <NavLink href="#contact" id="contact" label="Contact" activeSection={activeSection} onClick={scrollToSection("contact")} />
</nav>

{/* Desktop CTA */}
<div className="hidden lg:block">
  <a
    href="#contact"
    onClick={scrollToSection("contact")}
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
    animate={{ opacity: 1, height: "auto" }}
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
        { id: "home", label: "Home" },
        { id: "services", label: "Services" },
        { id: "about", label: "About" },
        { id: "contact", label: "Contact" },
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
          scrollToSection("contact")(e);
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


      {/* Hero Section */}
      <section
  className="relative h-screen w-full flex items-center overflow-hidden"
  id="home"
>
  <div className="absolute inset-0 z-10">
    <img
      src="/assets/hero_cover.png"
      alt="Cut & Cure Dubai Luxury Interior Atmosphere"
      className="w-full h-full object-cover scale-[1.04]"
      style={{
        animation: "slowZoom 25s infinite alternate ease-in-out",
      }}
    />
  </div>

  <div className="absolute inset-0 bg-black/35 z-20" />

<motion.div
variants={heroContainerVariants}
initial="hidden"
animate="visible"
className="relative z-30 w-full max-w-[1440px] mx-auto px-8 md:px-20"

>


<div className="max-w-[700px] text-white">

  <motion.div variants={heroItemVariants}>
    <span className="inline-flex items-center border border-white/30 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-[11px] uppercase tracking-[0.25em]">
      EST. 2026
    </span>
  </motion.div>

  <motion.h1
    variants={heroItemVariants}
    className="mt-8 font-display text-[58px] md:text-[100px] leading-[0.92] font-light tracking-[-0.02em]"
  >
    <TextReveal text="Where Luxury" delay={0.5} />
    <br />
    <TextReveal text="Meets Life" delay={0.7} />
  </motion.h1>

  <motion.p
    variants={heroItemVariants}
    className="mt-8 text-[18px] md:text-[22px] leading-relaxed text-white/85 max-w-[580px]"
  >
    A bespoke flower boutique, premium landscaping,
    specialty coffee and curated event experiences
    coming soon to the heart of Dubai.
  </motion.p>

  <motion.div
    variants={heroItemVariants}
    className="flex flex-wrap gap-4 mt-10"
  >
    <a
      href="#services"
      onClick={scrollToSection("services")}
      className="btn-premium bg-white text-black px-8 py-4 rounded-full text-sm uppercase tracking-[0.18em] font-medium"
    >
      Discover More
    </a>

    <a
      href="#about"
      onClick={scrollToSection("about")}
      className="btn-outline-premium text-white px-8 py-4 rounded-full text-sm uppercase tracking-[0.18em]"
    >
      Our Story
    </a>
  </motion.div>
</div>


</motion.div>

  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
    className="absolute bottom-10 left-8 md:left-20 z-30 scroll-indicator"
  >
    <div className="scroll-indicator-line" />
    <span className="scroll-indicator-text text-[10px] uppercase tracking-[0.3em] text-white/70">
      Scroll To Explore
    </span>
  </motion.div>
</section>


      {/* Services / Offerings Section */}
      <section ref={servicesRef} className="py-[160px] bg-brand-alabaster overflow-hidden border-b border-brand-sandstone/10" id="services">
        <div className="max-w-[1440px] mx-auto px-6 md:px-20">
          <Reveal>
            {/* Header Layout */}
            <motion.div
              style={{ y: headerParallaxY }}
              className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline mb-24 text-left"
            >
              <div className="md:col-span-7">
                <span className="label-caps text-brand-espresso mb-4 block">OUR OFFERINGS</span>
                <h2 className="display-lg uppercase text-brand-charcoal">
                  Curated for the<br />Discerning
                </h2>
              </div>
              <div className="md:col-span-5 body-lg text-brand-charcoal/70 md:pl-8">
                <p>Experience a lifestyle destination where every detail is considered and every moment is elevated.</p>
              </div>
            </motion.div>
          </Reveal>

        {/* 2-Column Aligned Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">

          {/* Card 1: Flower Boutique — left column parallax */}
          <motion.div style={{ y: leftY }}>
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="card-premium bg-brand-cream border border-brand-sandstone/30 p-8 md:p-10 flex flex-col gap-8 cursor-pointer"
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
                <h3 className="font-display text-[28px] font-light uppercase text-brand-charcoal tracking-wide">Flower Boutique</h3>
                <p className="font-sans text-[14px] font-light leading-relaxed text-brand-espresso/80 max-w-sm mx-auto">
                  Bespoke arrangements for the discerning eye. A fusion of botanical rarity and artistic expression.
                </p>
                <div className="text-[11px] font-semibold tracking-[0.2em] text-brand-gold uppercase mt-4 hover:text-brand-charcoal transition-colors duration-300">
                  Discover More &rarr;
                </div>
              </div>
            </Reveal>
          </motion.div>
          </motion.div>

          {/* Card 2: Specialty Coffee — right column parallax */}
          <motion.div style={{ y: rightY }}>
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="card-premium bg-brand-cream border border-brand-sandstone/30 p-8 md:p-10 flex flex-col gap-8 cursor-pointer"
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
                <h3 className="font-display text-[28px] font-light uppercase text-brand-charcoal tracking-wide">Specialty Coffee</h3>
                <p className="font-sans text-[14px] font-light leading-relaxed text-brand-espresso/80 max-w-sm mx-auto">
                  A curated sensory journey of rare beans. Every cup is a testament to the art of the perfect extraction.
                </p>
                <div className="text-[11px] font-semibold tracking-[0.2em] text-brand-gold uppercase mt-4 hover:text-brand-charcoal transition-colors duration-300">
                  Discover More &rarr;
                </div>
              </div>
            </Reveal>
          </motion.div>
          </motion.div>

          {/* Card 3: Plants & Landscaping — left column parallax */}
          <motion.div style={{ y: leftY }}>
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="card-premium bg-brand-cream border border-brand-sandstone/30 p-8 md:p-10 flex flex-col gap-8 cursor-pointer"
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
                <h3 className="font-display text-[28px] font-light uppercase text-brand-charcoal tracking-wide">Plants & Landscaping</h3>
                <p className="font-sans text-[14px] font-light leading-relaxed text-brand-espresso/80 max-w-sm mx-auto">
                  Bespoke green sanctuaries for premium living. Architecting nature inside the modern urban landscape.
                </p>
                <div className="text-[11px] font-semibold tracking-[0.2em] text-brand-gold uppercase mt-4 hover:text-brand-charcoal transition-colors duration-300">
                  Discover More &rarr;
                </div>
              </div>
            </Reveal>
          </motion.div>
          </motion.div>

          {/* Card 4: Events Organization — right column parallax */}
          <motion.div style={{ y: rightY }}>
          <motion.div
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="card-premium bg-brand-cream border border-brand-sandstone/30 p-8 md:p-10 flex flex-col gap-8 cursor-pointer"
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
                <h3 className="font-display text-[28px] font-light uppercase text-brand-charcoal tracking-wide">Events Organization</h3>
                <p className="font-sans text-[14px] font-light leading-relaxed text-brand-espresso/80 max-w-sm mx-auto">
                  Crafting moments of timeless elegance. Transforming visions into unforgettable sensory experiences.
                  </p>
                <div className="text-[11px] font-semibold tracking-[0.2em] text-brand-gold uppercase mt-4 hover:text-brand-charcoal transition-colors duration-300">
                  Discover More &rarr;
                </div>
              </div>
            </Reveal>
          </motion.div>
          </motion.div>

        </div>
        </div>
      </section>

      {/* About Section */}
      <section
  className="py-32 md:py-40 bg-[#f5f1eb]"
  id="about"
>
  <div className="max-w-[1400px] mx-auto px-6 md:px-12">

<div className="grid lg:grid-cols-2 gap-8 items-center">

  {/* Image Side */}
  <Reveal y={40}>
    <div className="relative overflow-hidden rounded-[32px] h-[500px] md:h-[650px] image-reveal-mask">
      <motion.img
        src="/assets/flower_boutique.png"
        alt="Cut & Cure"
        className="w-full h-full object-cover"
        whileInView={{ scale: 1 }}
        initial={{ scale: 1.08 }}
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  </Reveal>

  {/* Content Side */}
  <Reveal delay={0.15}>
    <motion.div
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 30 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white rounded-[32px] p-8 md:p-14 shadow-sm"
    >

    <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-brand-gold block mb-6">
      ABOUT CUT & CURE
    </span>

    <h2 className="font-display text-[42px] md:text-[68px] leading-[0.95] font-light text-brand-charcoal mb-8 tracking-[-0.02em]">
      Where
      Beauty
      Meets
      Lifestyle
    </h2>

    <p className="text-lg text-brand-espresso/80 leading-relaxed mb-6 font-light">
      Cut & Cure is a luxury lifestyle destination designed to bring together beauty, nature, craftsmanship and hospitality under one elegant roof.
    </p>

    <p className="text-lg text-brand-espresso/80 leading-relaxed font-light">
      Inspired by the art of thoughtful living, we create experiences that transform everyday moments into lasting memories through flowers, landscapes, coffee and events.
    </p>

    </motion.div>
  </Reveal>

</div>


  </div>
</section>


      {/* The Dubai Experience & Gallery Section */}
      

      {/* Luxury Intake Inquiry Section */}
      <section className="py-16 bg-neutral-50 text-center" id="contact">
  <div className="max-w-md w-full mx-auto px-6">
    
    <Reveal>
    {/* Header */}
    <div className="mb-8">
      <span className="text-xs font-semibold tracking-widest uppercase text-amber-600 block mb-2">
        Join the Atelier
      </span>
      <h2 className="font-display text-2xl font-light uppercase text-neutral-800 mb-3 tracking-wide">
        Stay Updated
      </h2>
      <p className="text-sm text-neutral-600 leading-relaxed font-light">
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
          className="luxury-input uppercase text-sm tracking-wide"
        />
      </div>

      <button
        type="submit"
        className="btn-premium w-full mt-2 py-3.5 bg-neutral-900 text-white text-xs tracking-widest uppercase hover:bg-neutral-800 font-medium"
      >
        Subscribe
      </button>
    </form>

    {/* Success Message */}
    <AnimatePresence>
    {showSuccess && (
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 text-xs text-emerald-700 tracking-wide"
      >
        Thank you for subscribing!
      </motion.p>
    )}
    </AnimatePresence>
    </Reveal>
    
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
