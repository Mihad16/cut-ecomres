import { useEffect, useState } from 'react';
import Navbar from './Component/navbar.jsx';
import Footer from './Component/Footer.jsx';
import Hero from './pages/hero.jsx';
import Services from './pages/Services.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import ServiceDetail from './pages/ServiceDetail.jsx';
import { getServiceById } from './data/services.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



const SECTION_IDS = ['home', 'services', 'about', 'contact'];
const HEADER_OFFSET = 90;

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const selectedService = getServiceById(selectedServiceId);

  useEffect(() => {
    if (selectedServiceId) {
      setActiveSection('services');
      return undefined;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [selectedServiceId]);

  const scrollToElement = (id) => {
    const element = document.getElementById(id);

    if (element) {
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - HEADER_OFFSET;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToSection = (id) => (e) => {
    e.preventDefault();

    setSelectedServiceId(null);
    window.setTimeout(() => scrollToElement(id), 0);
  };

  const openService = (serviceId) => {
    setSelectedServiceId(serviceId);
    setActiveSection('services');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToServices = () => {
    setSelectedServiceId(null);
    setActiveSection('services');
    window.setTimeout(() => scrollToElement('services'), 0);
  };

  const goToContact = () => {
    setSelectedServiceId(null);
    setActiveSection('contact');
    window.setTimeout(() => scrollToElement('contact'), 0);
  };

  return (
    <div className="relative min-h-screen bg-brand-alabaster text-brand-charcoal overflow-x-hidden selection:bg-brand-charcoal selection:text-brand-alabaster">
      <Navbar activeSection={activeSection} scrollToSection={scrollToSection} />
      {selectedService ? (
        <ServiceDetail service={selectedService} onBack={backToServices} onContact={goToContact} />
      ) : (
        <>
          <Hero scrollToSection={scrollToSection} />
            <About />
          <Services onSelectService={openService} />
        
          <Contact />
        
        </>
      )}
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}
