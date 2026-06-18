import { motion } from 'framer-motion';


function Servicepage({ className = '' }) {
  return (
    <span className={`inline-flex w-fit items-center bg-brand-charcoal text-brand-gold border border-brand-gold/20 text-[9px] uppercase tracking-[0.22em] py-1.5 px-3.5 font-sans font-medium ${className}`}>
      Coming Soon
    </span>
  );
}

function ServiceCard({ service, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1, 
        ease: [0.16, 1, 0.3, 1] 
      }}
      className="group relative overflow-hidden rounded-2xl min-h-[380px] flex flex-col justify-end p-8 cursor-pointer"
      style={{
        backgroundImage: `url('${service.image}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/90 group-hover:via-black/40 transition-all duration-500" />
      
      {/* Border Glow */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-brand-gold/50 rounded-2xl transition-all duration-500" />

      {/* Content */}
      <div className="relative z-10 transform group-hover:translate-y-[-4px] transition-transform duration-500">
        <div className="mb-4">
          <ComingSoonTag className="bg-white/10 backdrop-blur-sm border-white/20 text-white" />
        </div>
        
        <h3 className="font-display text-[32px] leading-tight font-light text-white mt-2">
          {service.title}
        </h3>
        
        <p className="font-sans text-[15px] leading-relaxed text-white/80 mt-3 max-w-sm">
          {service.description}
        </p>

        <div className="flex items-center gap-3 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
          <span className="text-[11px] font-semibold tracking-[0.2em] text-white/70 uppercase">
            {service.category || 'Service'}
          </span>
          <span className="w-8 h-px bg-white/30" />
          <span className="text-white/50 text-xs group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>

      {/* Decorative corner */}
      <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-white/10 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.article>
  );
}

export default function ServicesPage() {
  // Example service data - replace with your actual data
  const services = [
    {
      id: 1,
      title: 'Bespoke Bouquets',
      description: 'Hand-tied seasonal arrangements created around palette, mood, and occasion.',
      image: 'https://images.unsplash.com/photo-1561181286-d3fee7d8d3a2?w=800&auto=format&fit=crop',
      category: 'Floral Design'
    },
    {
      id: 2,
      title: 'Event Styling',
      description: 'Full-service floral styling for weddings, corporate events, and celebrations.',
      image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop',
      category: 'Events'
    },
    {
      id: 3,
      title: 'Workshops',
      description: 'Intimate flower arranging classes for groups and private sessions.',
      image: 'https://images.unsplash.com/photo-1532372576444-dda954194ad6?w=800&auto=format&fit=crop',
      category: 'Education'
    },
    {
      id: 4,
      title: 'Subscription Box',
      description: 'Monthly deliveries of fresh, seasonal blooms curated just for you.',
      image: 'https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800&auto=format&fit=crop',
      category: 'Subscription'
    },
    {
      id: 5,
      title: 'Installations',
      description: 'Large-scale floral installations for brand activations and public spaces.',
      image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800&auto=format&fit=crop',
      category: 'Installations'
    },
    {
      id: 6,
      title: 'Private Commissions',
      description: 'One-of-a-kind floral pieces crafted exclusively for your space or occasion.',
      image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&auto=format&fit=crop',
      category: 'Custom'
    }
  ];

  return (
    <main className="bg-brand-alabaster min-h-screen pt-32">
      {/* Hero Section */}
      <section className="px-6 md:px-20 pb-16">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="label-caps text-brand-espresso">Our Services</span>
            <h1 className="font-display text-[48px] md:text-[72px] leading-[0.9] font-light text-brand-charcoal tracking-[-0.02em] mt-4">
              Floral experiences
            </h1>
            <p className="body-lg text-brand-espresso/70 mt-6 max-w-xl mx-auto">
              From intimate bouquets to grand installations — each piece is thoughtfully designed with intention and artistry.
            </p>
            <div className="mt-8 flex justify-center gap-4 flex-wrap">
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-espresso/50 border border-brand-sandstone/40 px-5 py-2 rounded-full">
                Bespoke
              </span>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-espresso/50 border border-brand-sandstone/40 px-5 py-2 rounded-full">
                Seasonal
              </span>
              <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-brand-espresso/50 border border-brand-sandstone/40 px-5 py-2 rounded-full">
                Sustainable
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-6 md:px-20 pb-24">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-20 pb-24">
        <div className="max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative bg-brand-charcoal rounded-3xl overflow-hidden p-12 md:p-20 text-center"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=1600&auto=format&fit=crop')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/60" />
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <ComingSoonTag className="bg-white/10 backdrop-blur-sm border-white/20 text-white mx-auto" />
              <h2 className="font-display text-[36px] md:text-[48px] leading-[1.1] font-light text-white mt-6">
                Let's create something beautiful together
              </h2>
              <p className="text-white/70 text-[15px] leading-relaxed mt-4">
                Have a vision in mind? Reach out and let's bring it to life.
              </p>
              <button className="mt-8 bg-white text-brand-charcoal px-8 py-4 rounded-full text-xs uppercase tracking-[0.16em] font-semibold hover:bg-brand-gold hover:text-brand-charcoal transition-all duration-300">
                Get in Touch
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}