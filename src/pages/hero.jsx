import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

function TextReveal({ text, className = '', delay = 0 }) {
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.28em] last:mr-0">
          <motion.span
            className="inline-block"
            initial={{ y: '115%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 1.3,
              delay: delay + i * 0.09,
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

function StemSignature({ side = 'left', scale = 1, opacityMax = 0.55, parallax = 0 }) {
  const flip = side === 'right' ? 'scale-x-[-1]' : '';
  return (
    <motion.svg
      style={{ y: parallax }}
      width={120 * scale}
      height={220 * scale}
      viewBox="0 0 120 220"
      fill="none"
      className={`absolute top-8 hidden lg:block pointer-events-none ${
        side === 'left' ? 'left-2' : 'right-6'
      } ${flip}`}
      aria-hidden="true"
    >
      <motion.path
        d="M60 218 C 58 170, 64 140, 56 110 C 50 86, 64 70, 60 40 C 57 24, 64 14, 60 2"
        stroke="#8C5A2E"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: opacityMax }}
        transition={{ duration: 2.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M58 150 C 70 144, 82 132, 86 116"
        stroke="#8C5A2E"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: opacityMax * 0.8 }}
        transition={{ duration: 1.3, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.path
        d="M57 95 C 46 90, 35 80, 31 66"
        stroke="#8C5A2E"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: opacityMax * 0.8 }}
        transition={{ duration: 1.3, delay: 2.1, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle
        cx="60"
        cy="2"
        r="2.5"
        fill="#8C5A2E"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: opacityMax + 0.3, scale: 1 }}
        transition={{ duration: 0.6, delay: 2.8 }}
      />
    </motion.svg>
  );
}

export default function Hero({ scrollToSection }) {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const stemLeftY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const stemRightY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.35,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full flex items-center overflow-hidden bg-[#FBF7F2]"
      id="home"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,400&family=Inter:wght@300;400;500&display=swap');
        .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
        .font-label { font-family: 'Inter', sans-serif; }
        .amp-accent { font-style: italic; color: #8C5A2E; padding: 0 0.06em; }
        @keyframes grainShift { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-2%,-1%); } }
        .cta-btn { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1); }
        .cta-btn:hover { transform: translateY(-2px); }
        .story-link { position: relative; }
        .story-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: -1px;
          width: 0; height: 1px;
          background: #8C5A2E;
          transition: width 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .story-link:hover::after { width: 100%; }
      `}</style>

      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 30% 20%, rgba(140,90,46,0.08), transparent 60%), radial-gradient(ellipse 70% 60% at 90% 90%, rgba(70,99,57,0.05), transparent 60%)',
        }}
      />

      <div
        className="absolute inset-0 z-10 opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23n)'/%3E%3C/svg%3E\")",
          animation: 'grainShift 6s infinite',
        }}
      />

      <StemSignature side="left" scale={1} opacityMax={0.55} parallax={stemLeftY} />
      <StemSignature side="right" scale={1.5} opacityMax={0.22} parallax={stemRightY} />

      <motion.div
        variants={heroContainerVariants}
        initial="hidden"
        animate="visible"
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-30 w-full max-w-[1440px] mx-auto px-8 md:px-20"
      >
        <div className="max-w-[700px] text-[#3D2614]">
          <motion.div variants={heroItemVariants} className="flex items-center gap-4">
            <motion.span
              className="h-px bg-[#8C5A2E]/70"
              initial={{ width: 0 }}
              animate={{ width: 40 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <span className="font-label text-[11px] uppercase tracking-[0.32em] text-[#8C5A2E]">
              Est. 2026 — Dubai
            </span>
          </motion.div>

          <motion.h1
            variants={heroItemVariants}
            className="mt-9 font-display text-[56px] md:text-[104px] leading-[0.94] font-light tracking-[-0.01em]"
          >
            <TextReveal text="Where Luxury" delay={0.55} />
            <br />
            <span className="inline-flex items-baseline">
              <TextReveal text="Meets" delay={0.78} />
              <span className="amp-accent font-display">&nbsp;&amp;&nbsp;</span>
              <TextReveal text="Life" delay={0.92} />
            </span>
          </motion.h1>

          <motion.p
            variants={heroItemVariants}
            className="mt-9 font-label text-[17px] md:text-[20px] leading-[1.7] text-[#3D2614]/75 max-w-[540px] font-light"
          >
            A bespoke flower boutique, premium landscaping, specialty coffee and
            curated event experiences — cultivated for the heart of Dubai.
          </motion.p>

          <motion.div variants={heroItemVariants} className="flex flex-wrap items-center gap-6 mt-12">
            <motion.a
              href="#services"
              onClick={scrollToSection('services')}
              whileTap={{ scale: 0.97 }}
              className="cta-btn group relative overflow-hidden bg-[#3D2614] text-[#FBF7F2] px-9 py-4 font-label text-[12px] uppercase tracking-[0.22em] font-medium"
            >
              <span className="relative z-10">Discover More</span>
              <span className="absolute inset-0 bg-[#8C5A2E] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </motion.a>

            <a
              href="#about"
              onClick={scrollToSection('about')}
              className="story-link font-label text-[12px] uppercase tracking-[0.22em] text-[#3D2614]/80 hover:text-[#8C5A2E] transition-colors duration-500"
            >
              Our Story
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="absolute bottom-10 left-8 md:left-20 z-30 flex items-center gap-3"
      >
        <motion.span
          className="block w-px bg-[#8C5A2E]/60"
          initial={{ height: 0 }}
          animate={{ height: 40 }}
          transition={{ duration: 1.2, delay: 2, ease: [0.16, 1, 0.3, 1] }}
        />
        <span className="font-label text-[10px] uppercase tracking-[0.3em] text-[#3D2614]/55">
          Scroll To Explore
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1.2 }}
        className="absolute top-10 right-8 md:right-20 z-30 hidden md:block"
      >
        <span className="font-display italic text-[#3D2614]/35 text-[13px] tracking-wide">
          Cut &amp; Cure
        </span>
      </motion.div>
    </section>
  );
}