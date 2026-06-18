import { motion } from 'framer-motion';

function ComingSoonTag({ className = '' }) {
  return (
    <span className={`inline-flex w-fit items-center bg-brand-charcoal text-brand-gold border border-brand-gold/20 text-[9px] uppercase tracking-[0.22em] py-1.5 px-3.5 font-sans font-medium ${className}`}>
      Coming Soon
    </span>
  );
}

export default function ServiceDetail({ service, onBack, onContact }) {
  if (!service) return null;

  return (
    <main className="bg-brand-alabaster pt-32">
      <section className="px-6 md:px-20 pb-24">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5"
          >
            <button
              type="button"
              onClick={onBack}
              className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-espresso/70 hover:text-brand-gold transition-colors duration-300 mb-8"
            >
              Back to Services
            </button>

            <div className="flex flex-col gap-5">
              <ComingSoonTag />
              <span className="label-caps text-brand-espresso">{service.label}</span>
              <h1 className="font-display text-[54px] md:text-[86px] leading-[0.9] font-light text-brand-charcoal tracking-[-0.02em]">
                {service.title}
              </h1>
              <p className="body-lg text-brand-espresso/80 max-w-xl">
                {service.intro}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
              <button
                type="button"
                onClick={onContact}
                className="btn-premium bg-brand-charcoal text-white px-7 py-4 rounded-full text-xs uppercase tracking-[0.16em]"
              >
                Join Launch List
              </button>
              <button
                type="button"
                onClick={onBack}
                className="border border-brand-sandstone text-brand-charcoal px-7 py-4 rounded-full text-xs uppercase tracking-[0.16em] hover:border-brand-gold hover:text-brand-gold transition-colors duration-300"
              >
                View All Services
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden border border-brand-sandstone/40 bg-brand-cream">
              <img
                src={service.image}
                alt={service.alt}
                className="h-full w-full object-cover scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
              <ComingSoonTag className="absolute top-5 right-5" />
            </div>
          </motion.div>
        </div>
      </section>

     
      <section className="px-6 md:px-20 py-24 bg-brand-alabaster">
        <div className="max-w-[1180px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="label-caps text-brand-espresso">Service Cards</span>
              <h2 className="headline-lg text-brand-charcoal mt-4">
                What is coming next
              </h2>
            </div>
            <ComingSoonTag />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {service.cards.map((card, index) => (
              <motion.article
  key={card.title}
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: '-120px' }}
  transition={{ duration: 0.9, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
  className="card-premium bg-brand-cream border border-brand-sandstone/30 p-7 min-h-[260px] flex flex-col justify-between relative overflow-hidden"
  style={{
    backgroundImage: `url('${service.image}')`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  }}
>
  {/* Dark overlay for text readability */}
  <div className="absolute inset-0 bg-black/30" />

  <div className="relative z-10">
    <ComingSoonTag />
    <h3 className="font-display text-[30px] leading-tight font-light text-white mt-8">
      {card.title}
    </h3>
    <p className="font-sans text-[14px] leading-relaxed text-white/90 mt-5">
      {card.text}
    </p>
  </div>

  <span className="relative z-10 text-[11px] font-semibold tracking-[0.2em] text-white/80 uppercase mt-10">
    {service.label}
  </span>
</motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
