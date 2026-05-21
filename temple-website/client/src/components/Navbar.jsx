import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Flame } from 'lucide-react';

const Navbar = ({ activeSection, setActiveSection, currentTheme, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const menuItems = [
    { id: 'hero', label: 'Home' },
    { id: 'darshan', label: 'Darshan' },
    { id: 'booking', label: 'Book Pooja' },
    { id: 'diya', label: 'Light Diya' },
    { id: 'donation', label: 'Seva/Donations' },
    { id: 'wisdom', label: 'Scripture' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        padding: isScrolled ? '1rem 0' : '1.5rem 0',
        background: isScrolled ? 'var(--glass-bg)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--glass-border)' : '1px solid transparent',
        transition: 'var(--transition-smooth)',
      }}
    >
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <div 
          onClick={() => handleNavClick('hero')} 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
        >
          <Flame size={24} style={{ color: 'var(--accent-gold)' }} />
          <span 
            style={{ 
              fontFamily: 'var(--font-heading)', 
              fontWeight: 800, 
              fontSize: '1.2rem', 
              letterSpacing: '0.15em',
              color: 'var(--text-primary)'
            }}
          >
            DEVA<span style={{ color: 'var(--accent-gold)' }}>VRIKSHA</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div style={{ display: 'none', alignItems: 'center', gap: '2.5rem', '@media (min-width: 769px)': { display: 'flex' } }} className="desktop-menu">
          <ul style={{ display: 'flex', listStyle: 'none', gap: '2rem' }}>
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: activeSection === item.id ? 'var(--accent-gold)' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.8rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'var(--transition-fast)',
                    padding: '0.25rem 0',
                    borderBottom: `2px solid ${activeSection === item.id ? 'var(--accent-gold)' : 'transparent'}`
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== item.id) e.target.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== item.id) e.target.style.color = 'var(--text-secondary)';
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.5rem',
              borderRadius: '50%',
              transition: 'var(--transition-fast)',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--accent-gold-glow)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            {currentTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile menu trigger + theme toggle */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', '@media (min-width: 769px)': { display: 'none' } }} className="mobile-menu-trigger">
          <button
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--accent-gold)',
              padding: '0.5rem',
            }}
          >
            {currentTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              padding: '0.25rem',
            }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            background: 'var(--bg-secondary)',
            borderBottom: '1px solid var(--border-color)',
            padding: '1.5rem 0',
            animation: 'fadeIn 0.3s ease-out',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center'
          }}
        >
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.25rem', alignItems: 'center', width: '100%' }}>
            {menuItems.map((item) => (
              <li key={item.id} style={{ width: '100%', textAlign: 'center' }}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: activeSection === item.id ? 'var(--accent-gold)' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.95rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    width: '100%',
                    padding: '0.5rem 0',
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CSS helper inside a style tag to fix desktop-menu responsive hide/show */}
      <style>{`
        @media (min-width: 769px) {
          .desktop-menu { display: flex !important; }
          .mobile-menu-trigger { display: none !important; }
        }
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-menu-trigger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
