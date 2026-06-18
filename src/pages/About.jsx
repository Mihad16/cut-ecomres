import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

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

function CornerStem() {
  return (
    <svg
      width="90"
      height="90"
      viewBox="0 0 90 90"
      fill="none"
      className="absolute -top-6 -right-6 hidden md:block pointer-events-none"
      aria-hidden="true"
    >
      <motion.path
        d="M4 4 C 30 6, 50 18, 60 38 C 68 54, 70 70, 86 86"
        stroke="#8C5A2E"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.55 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.circle
        cx="86"
        cy="86"
        r="2.2"
        fill="#8C5A2E"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 0.85, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 1.8 }}
      />
    </svg>
  );
}

export default function About() {
  const imgWrapRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: imgWrapRef,
    offset: ['start end', 'end start'],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section className="py-32 md:py-40 bg-[#FBF7F2] relative overflow-hidden" id="about">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;1,9..144,400&family=Inter:wght@300;400;500&display=swap');
        .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
        .font-label { font-family: 'Inter', sans-serif; }
        .amp-accent { font-style: italic; color: #8C5A2E; padding: 0 0.05em; }
        .about-card { transition: transform 0.7s cubic-bezier(0.16,1,0.3,1), box-shadow 0.7s cubic-bezier(0.16,1,0.3,1); }
        .about-card:hover { transform: translateY(-4px); }
      `}</style>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 85% 10%, rgba(140,90,46,0.08), transparent 60%), radial-gradient(ellipse 70% 60% at 5% 95%, rgba(70,99,57,0.05), transparent 60%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <Reveal y={40}>
            <div
              ref={imgWrapRef}
              className="relative overflow-hidden rounded-[4px] h-[500px] md:h-[650px] image-reveal-mask border border-[#8C5A2E]/20"
            >
              <motion.img
                src="/assets/flower_boutique.png"
                alt="Cut & Cure"
                className="w-full h-full object-cover"
                style={{ y: imgY, scale: 1.15 }}
                initial={{ scale: 1.22 }}
                whileInView={{ scale: 1.15 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D2614]/35 via-transparent to-transparent" />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <motion.div
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="about-card relative bg-[#FFFDFA] rounded-[4px] p-8 md:p-14 border border-[#8C5A2E]/10"
            >
              <CornerStem />

              <div className="flex items-center gap-4 mb-7">
                <motion.span
                  className="h-px bg-[#8C5A2E]/70"
                  initial={{ width: 0 }}
                  whileInView={{ width: 40 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
                <span className="font-label text-[11px] uppercase tracking-[0.32em] text-[#8C5A2E]">
                  About Cut &amp; Cure
                </span>
              </div>

              <h2 className="font-display text-[42px] md:text-[64px] leading-[0.98] font-light text-[#3D2614] mb-8 tracking-[-0.01em]">
                Where Beauty
                <br />
                <span className="inline-flex items-baseline">
                  Meets
                  <span className="amp-accent font-display">&nbsp;&amp;&nbsp;</span>
                  Lifestyle
                </span>
              </h2>

              <p className="font-label text-[17px] md:text-[18px] text-[#3D2614]/75 leading-[1.7] mb-6 font-light">
                Cut &amp; Cure is a luxury lifestyle destination designed to
                bring together beauty, nature, craftsmanship and hospitality
                under one elegant roof.
              </p>

              <p className="font-label text-[17px] md:text-[18px] text-[#3D2614]/75 leading-[1.7] font-light mb-10">
                Inspired by the art of thoughtful living, we create
                experiences that transform everyday moments into lasting
                memories through flowers, landscapes, coffee and events.
              </p>

              <div className="flex gap-10 pt-8 border-t border-[#8C5A2E]/15">
                {[
                  { value: '4', label: 'Curated experiences' },
                  { value: '2026', label: 'Founding year' },
                  { value: '1', label: 'Dubai address' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="font-display text-[28px] text-[#3D2614] leading-none">
                      {stat.value}
                    </p>
                    <p className="font-label text-[11px] uppercase tracking-[0.18em] text-[#3D2614]/55 mt-2">
                      {stat.label}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}