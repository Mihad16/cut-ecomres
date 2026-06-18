import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { services } from '../data/services.js';

function ParallaxImage({ src, alt }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden relative border border-[#8C5A2E]/15 bg-[#F4EEE2]"
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ y }}
        className="w-full h-[112%] absolute top-[-6%] left-0 object-cover scale-[1.01] transition-transform duration-[1.6s] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#3D2614]/30 via-transparent to-transparent" />
    </div>
  );
}

function Reveal({ children, delay = 0, y = 30 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 1.4, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function CardStem({ delay = 0 }) {
  return (
    <svg
      width="56"
      height="56"
      viewBox="0 0 56 56"
      fill="none"
      className="absolute -top-4 -left-4 pointer-events-none"
      aria-hidden="true"
    >
      <motion.path
        d="M3 3 C 18 4, 30 12, 36 24 C 41 34, 42 44, 53 53"
        stroke="#8C5A2E"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.45 }}
        viewport={{ once: true }}
        transition={{ duration: 1.3, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

export default function Services({ onSelectService }) {
  const [isMobile, setIsMobile] = useState(false);
  const servicesRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: servicesRef,
    offset: ['start end', 'end start'],
  });

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);

    return () => {
      window.removeEventListener('resize', checkViewport);
    };
  }, []);

  const smoothServicesProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 28,
    restDelta: 0.001,
  });
  const leftY = useTransform(smoothServicesProgress, [0, 1], isMobile ? [0, 0] : [80, -80]);
  const rightY = useTransform(smoothServicesProgress, [0, 1], isMobile ? [0, 0] : [-80, 80]);
  const headerParallaxY = useTransform(smoothServicesProgress, [0, 1], isMobile ? [0, 0] : [30, -30]);

  return (
    <section
      ref={servicesRef}
      className="py-[160px] bg-[#FBF7F2] overflow-hidden border-b border-[#8C5A2E]/10 relative"
      id="services"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,400&family=Inter:wght@300;400;500&display=swap');
        .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
        .font-label { font-family: 'Inter', sans-serif; }
        .service-card { transition: transform 0.6s cubic-bezier(0.16,1,0.3,1), border-color 0.6s ease, box-shadow 0.6s ease; }
        .service-card:hover { border-color: rgba(140,90,46,0.4); box-shadow: 0 24px 60px -32px rgba(61,38,20,0.25); }
        .discover-link { position: relative; }
        .discover-link::after {
          content: '';
          position: absolute;
          left: 0; bottom: -2px;
          width: 0; height: 1px;
          background: #3D2614;
          transition: width 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .discover-link:hover::after { width: 100%; }
      `}</style>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 10% 5%, rgba(140,90,46,0.06), transparent 60%), radial-gradient(ellipse 60% 50% at 95% 95%, rgba(70,99,57,0.04), transparent 60%)',
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-20 relative">
        <Reveal>
          <motion.div
            style={{ y: headerParallaxY }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-baseline mb-24 text-left"
          >
            <div className="md:col-span-7">
              <div className="flex items-center gap-4 mb-6">
                <motion.span
                  className="h-px bg-[#8C5A2E]/70"
                  initial={{ width: 0 }}
                  whileInView={{ width: 40 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                />
                <span className="font-label text-[11px] uppercase tracking-[0.32em] text-[#8C5A2E]">
                  Our Offerings
                </span>
              </div>
              <h2 className="font-display text-[44px] md:text-[68px] leading-[0.96] font-light text-[#3D2614] tracking-[-0.01em]">
                Curated for the
                <br />
                Discerning
              </h2>
            </div>
            <div className="md:col-span-5 font-label text-[17px] md:text-[18px] leading-[1.7] text-[#3D2614]/65 font-light md:pl-8">
              <p>
                Experience a lifestyle destination where every detail is
                considered and every moment is elevated.
              </p>
            </div>
          </motion.div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {services.map((card, idx) => (
            <motion.div
              key={card.title}
              style={{ y: card.column === 'left' ? leftY : rightY }}
            >
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="service-card relative bg-[#FFFDFA] border border-[#8C5A2E]/15 p-8 md:p-10 flex flex-col gap-8 cursor-pointer rounded-[4px]"
                onClick={() => onSelectService(card.id)}
              >
                <Reveal delay={idx * 0.08}>
                  <div className="w-full aspect-[4/5] relative">
                    <ParallaxImage src={card.image} alt={card.alt} />
                    <div className="absolute top-4 right-4 z-20 bg-[#3D2614]/90 backdrop-blur-md text-[#E8C896] border border-[#E8C896]/25 text-[9px] uppercase tracking-[0.22em] py-1.5 px-3.5 font-label font-medium">
                      Coming Soon
                    </div>
                  </div>

                  <div className="relative text-center flex flex-col gap-4 mt-2">
                    <CardStem delay={0.2} />

                    <span className="font-label text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8C5A2E]">
                      {card.label}
                    </span>

                    <h3 className="font-display text-[28px] font-light uppercase text-[#3D2614] tracking-wide">
                      {card.title}
                    </h3>

                    <p className="font-label text-[14px] font-light leading-relaxed text-[#3D2614]/70 max-w-sm mx-auto">
                      {card.description}
                    </p>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectService(card.id);
                      }}
                      className="discover-link inline-flex self-center items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-[#3D2614] uppercase mt-4 font-label"
                    >
                      Discover More
                      <span aria-hidden="true">&rarr;</span>
                    </button>
                  </div>
                </Reveal>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}