import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Footer = () => {
  const timings = [
    { name: 'Morning Darshan', hours: '06:00 AM - 12:00 PM' },
    { name: 'Afternoon Closed', hours: '12:00 PM - 04:00 PM' },
    { name: 'Evening Darshan', hours: '04:00 PM - 09:00 PM' },
    { name: 'Morning Maha Arati', hours: '07:00 AM Daily' },
    { name: 'Evening Sandhya Arati', hours: '06:30 PM Daily' }
  ];

  return (
    <footer
      style={{
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--border-color)',
        padding: '5rem 0 3rem 0',
        fontSize: '0.85rem',
        color: 'var(--text-secondary)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '3.5rem',
            marginBottom: '4rem',
          }}
        >
          {/* Logo & About */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '1.25rem',
                color: 'var(--text-primary)',
                letterSpacing: '0.15em',
                marginBottom: '1.5rem',
              }}
            >
              DEVA<span style={{ color: 'var(--accent-gold)' }}>VRIKSHA</span>
            </h3>
            <p style={{ fontWeight: 300, lineHeight: '1.7', marginBottom: '1.5rem' }}>
              A sanctuary offering deep spiritual contemplation, scriptural learning, and philanthropic Sevas. 
              Built on traditional stone-carving foundations.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={14} className="text-gold" /> 108 Sacred Banyan Lane, Rishikesh, UK
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Phone size={14} className="text-gold" /> +91 135 244 0108
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Mail size={14} className="text-gold" /> contact@devavriksha.org
              </span>
            </div>
          </div>

          {/* Timings */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '0.9rem',
                color: 'var(--text-primary)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}
            >
              Sacred Timings
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {timings.map((t, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid var(--border-color)',
                    paddingBottom: '0.5rem',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                    <Clock size={12} className="text-gold" /> {t.name}
                  </span>
                  <span style={{ fontWeight: 300 }}>{t.hours}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Guidelines */}
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                fontSize: '0.9rem',
                color: 'var(--text-primary)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}
            >
              Visiting Guidelines
            </h3>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontWeight: 300, lineHeight: '1.6' }}>
              <li>
                <strong>Dress Code:</strong> Traditional attire is highly recommended. Please dress modestly covering shoulders and knees.
              </li>
              <li>
                <strong>Photography:</strong> strictly prohibited inside the main Garbhagriha. Permitted in the outer courtyards.
              </li>
              <li>
                <strong>Incense & Offerings:</strong> Allowed outside the threshold. Flower garlands are accepted at the reception office.
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            borderTop: '1px solid var(--border-color)',
            paddingTop: '2rem',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
            justifyContent: 'space-between',
            '@media (min-width: 769px)': { flexDirection: 'row' }
          }}
          className="footer-bottom"
        >
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            © {new Date().getFullYear()} DevaVriksha Temple Foundation. All rights reserved.
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem' }}>
            <a href="#hero" style={{ textDecoration: 'underline' }}>Privacy Policy</a>
            <a href="#hero" style={{ textDecoration: 'underline' }}>Terms of Seva</a>
          </span>
        </div>
      </div>
      <style>{`
        @media (min-width: 769px) {
          .footer-bottom { flex-direction: row !important; }
        }
        @media (max-width: 768px) {
          .footer-bottom { flex-direction: column !important; gap: 1rem; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
