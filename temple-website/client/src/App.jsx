import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Darshan from './components/Darshan';
import Booking from './components/Booking';
import VirtualDiya from './components/VirtualDiya';
import Donation from './components/Donation';
import Wisdom from './components/Wisdom';
import Footer from './components/Footer';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    // Force default dark theme on init
    document.documentElement.setAttribute('data-theme', 'dark');
    
    // Intersection Observer to update active section in navbar during scroll
    const sections = ['hero', 'darshan', 'booking', 'diya', 'donation', 'wisdom'];
    const observers = [];

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const obs = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        }, {
          threshold: 0.3, // trigers when 30% of the section is visible
          rootMargin: '-80px 0px 0px 0px' // adjust for fixed navbar height
        });
        
        obs.observe(el);
        observers.push({ obs, el });
      }
    });

    return () => {
      observers.forEach(({ obs, el }) => obs.unobserve(el));
    };
  }, []);

  const handleScrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        currentTheme={theme}
        toggleTheme={toggleTheme}
      />
      
      <main style={{ flex: 1 }}>
        <Hero onActionClick={handleScrollToSection} />
        <Darshan />
        <Booking />
        <VirtualDiya />
        <Donation />
        <Wisdom />
      </main>

      <Footer />
    </div>
  );
}

export default App;
