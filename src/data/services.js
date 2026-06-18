export const services = [
  {
    id: 'flower-boutique',
    column: 'left',
    image: '/assets/flower_boutique.png',
    alt: 'Luxury Flower Arrangement by Cut & Cure',
    label: 'FLORAL ARTISTRY',
    title: 'Flower Boutique',
    description: 'Bespoke arrangements for the discerning eye. A fusion of botanical rarity and artistic expression.',
    intro: 'A floral atelier shaped around rare stems, refined color stories, and expressive arrangements for personal gifting, homes, events, and hospitality spaces.',
    about: 'Each composition is designed with a quiet sense of occasion. From intimate bouquets to sculptural installations, the boutique will pair botanical sourcing with considered styling so every arrangement feels personal, architectural, and beautifully timed.',
    cards: [
      {
        title: 'Bespoke Bouquets',
        text: 'Hand-tied seasonal arrangements created around palette, mood, and occasion.',
        image: '/assets/Bespoke Bouquets.png',

      },
      {
        title: 'Event Florals',
        text: 'Statement centerpieces, ceremonial florals, and venue-scale botanical moments.',
        image: '/assets/Event Florals.png',
      },
      {
        title: 'Weekly Styling',
        text: 'Fresh floral styling for residences, boutiques, restaurants, and suites.',
        image: '/assets/Weekly Styling.png',
      },
    ],
  },
  {
    id: 'specialty-coffee',
    column: 'right',
    image: '/assets/coffee_experience.png',
    alt: 'Specialty Coffee Cup Latte Art',
    label: 'THE ART OF ESPRESSO',
    title: 'Specialty Coffee',
    description: 'A curated sensory journey of rare beans. Every cup is a testament to the art of the perfect extraction.',
    intro: 'A calm coffee experience built around origin-led beans, precise brewing, and a hospitality rhythm made for slow mornings and considered meetings.',
    about: 'The coffee program will bring together espresso craft, tasting rituals, and seasonal pairings. Every detail, from bean selection to cup presentation, is designed to make the service feel polished without losing warmth.',
    cards: [
      {
        title: 'Signature Espresso',
        text: 'Balanced espresso-based drinks prepared with carefully selected seasonal beans.',
      },
      {
        title: 'Slow Bar',
        text: 'Filter and manual brew selections for guests who want a quieter tasting moment.',
      },
      {
        title: 'Private Coffee Service',
        text: 'Coffee experiences for intimate events, brand gatherings, and curated launches.',
      },
    ],
  },
  {
    id: 'plants-landscaping',
    column: 'left',
    image: '/assets/landscaping.png',
    alt: 'Premium Architectural Plants & Landscaping Layout',
    label: 'BOTANICAL DESIGN',
    title: 'Plants & Landscaping',
    description: 'Bespoke green sanctuaries for premium living. Architecting nature inside the modern urban landscape.',
    intro: 'A plant and landscape design service for interiors, terraces, courtyards, and hospitality settings that need greenery with structure and longevity.',
    about: 'The landscaping service will focus on sculptural planting, climate-aware selections, and maintenance-minded design. Each plan is shaped to complement architecture, light, movement, and daily use.',
    cards: [
      {
        title: 'Interior Plant Styling',
        text: 'Statement plants, vessels, and placement plans for homes and commercial interiors.',
      },
      {
        title: 'Outdoor Concepts',
        text: 'Terrace, courtyard, and entrance concepts designed for Dubai conditions.',
      },
      {
        title: 'Care Programs',
        text: 'Maintenance plans to keep planted spaces healthy, composed, and guest-ready.',
      },
    ],
  },
  {
    id: 'events-organization',
    column: 'right',
    image: '/assets/events.png',
    alt: 'Curated Table Setting for Luxury Event',
    label: 'CURATED SCENOGRAPHY',
    title: 'Events Organization',
    description: 'Crafting moments of timeless elegance. Transforming visions into unforgettable sensory experiences.',
    intro: 'A curated event service for intimate gatherings, launch moments, and private celebrations where atmosphere, flowers, tables, and hospitality move together.',
    about: 'Events will be planned as complete sensory compositions. From concept and styling to florals, tablescapes, and guest flow, the service is built for hosts who want elegance without noise.',
    cards: [
      {
        title: 'Concept Direction',
        text: 'Mood, palette, styling, and guest experience direction for refined gatherings.',
      },
      {
        title: 'Tablescape Styling',
        text: 'Layered table settings, floral details, and tactile finishing touches.',
      },
      {
        title: 'Launch Moments',
        text: 'Small-format brand and private events shaped around presence and polish.',
      },
    ],
  },
];

export function getServiceById(id) {
  return services.find((service) => service.id === id);
}
