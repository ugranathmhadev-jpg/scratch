import React, { useState, useEffect } from 'react';
import { Clock, ArrowRight } from 'lucide-react';

const Hero = ({ onActionClick }) => {
  const [templeStatus, setTempleStatus] = useState({ open: true, message: '' });
  const [countdownText, setCountdownText] = useState('');

  useEffect(() => {
    const updateTempleStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const mins = now.getMinutes();
      const timeVal = hours + mins / 60;

      // Temple Timings: 06:00 - 12:00, 16:00 - 21:00
      if (timeVal >= 6 && timeVal < 12) {
        setTempleStatus({ open: true, message: 'Open Now • Morning Darshan' });
      } else if (timeVal >= 12 && timeVal < 16) {
        setTempleStatus({ open: false, message: 'Closed Now • Reopens at 4:00 PM' });
      } else if (timeVal >= 16 && timeVal < 21) {
        setTempleStatus({ open: true, message: 'Open Now • Evening Darshan' });
      } else {
        setTempleStatus({ open: false, message: 'Closed Now • Reopens at 6:00 AM' });
      }
    };

    const updateCountdown = () => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMins = now.getMinutes();
      const currentSecs = now.getSeconds();

      // Arati schedule: 07:00 (Morning Arati), 18:30 (Evening Arati)
      let targetHours = 7;
      let targetMins = 0;
      let eventName = 'Morning Arati';

      const currentVal = currentHours * 60 + currentMins;
      const morningVal = 7 * 60;
      const eveningVal = 18 * 60 + 30;

      if (currentVal > morningVal && currentVal <= eveningVal) {
        targetHours = 18;
        targetMins = 30;
        eventName = 'Evening Arati';
      } else if (currentVal > eveningVal) {
        targetHours = 7;
        targetMins = 0;
        eventName = 'Morning Arati (Tomorrow)';
      }

      let diffMs = 0;
      const targetDate = new Date();
      targetDate.setHours(targetHours, targetMins, 0, 0);

      if (currentVal > eveningVal) {
        targetDate.setDate(targetDate.getDate() + 1);
      }

      diffMs = targetDate - now;

      const hrs = Math.floor(diffMs / (1000 * 60 * 60));
      const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diffMs % (1000 * 60)) / 1000);

      const pad = (n) => String(n).padStart(2, '0');
      setCountdownText(`${eventName} in ${pad(hrs)}h ${pad(mins)}m ${pad(secs)}s`);
    };

    updateTempleStatus();
    updateCountdown();

    const interval = setInterval(() => {
      updateTempleStatus();
      updateCountdown();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <header
      id="hero"
      style={{
        position: 'relative',
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: '#0a0908', // solid black fallback
      }}
    >
      {/* Background Image with Dark Golden Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url('/assets/hero_temple_sunset.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.25) contrast(1.1)',
          zIndex: 1,
        }}
      />

      {/* Grid Pattern overlay for spiritual structure feel */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `radial-gradient(circle, rgba(197, 168, 128, 0.05) 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
          zIndex: 2,
        }}
      />

      {/* Main Content Card */}
      <div
        className="container"
        style={{
          zIndex: 3,
          position: 'relative',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '800px',
        }}
      >
        {/* Timing Status Pill */}
        <div
          className="animate-fade-in"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.45rem 1.25rem',
            borderRadius: '50px',
            background: 'rgba(23, 22, 20, 0.6)',
            border: `1px solid ${templeStatus.open ? 'rgba(197, 168, 128, 0.3)' : 'rgba(255, 255, 255, 0.1)'}`,
            marginBottom: '2rem',
            backdropFilter: 'blur(8px)',
          }}
        >
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: templeStatus.open ? '#C5A880' : '#8E8272',
              display: 'inline-block',
              boxShadow: templeStatus.open ? '0 0 10px #C5A880' : 'none',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              fontWeight: '600',
              color: templeStatus.open ? 'var(--accent-gold)' : 'var(--text-secondary)',
            }}
          >
            {templeStatus.message}
          </span>
        </div>

        {/* Brand Name */}
        <h1
          className="animate-slide-up"
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            lineHeight: '1.1',
            marginBottom: '1rem',
            fontWeight: '400',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          Deva<span style={{ color: 'var(--accent-gold)' }}>vriksha</span>
        </h1>

        {/* Subtitle */}
        <p
          className="animate-slide-up"
          style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.25rem)',
            color: 'var(--text-secondary)',
            letterSpacing: '0.1em',
            fontWeight: '300',
            maxWidth: '600px',
            marginBottom: '3rem',
            fontFamily: 'var(--font-heading)',
          }}
        >
          A sanctuary of silence, reflection, and spiritual connection.
        </p>

        {/* Interactive Diya Callout Banner */}
        <div
          className="glass-panel"
          style={{
            padding: '1.25rem 2rem',
            marginBottom: '3rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            border: '1px solid rgba(197, 168, 128, 0.15)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            maxWidth: '450px',
          }}
        >
          <Clock size={16} className="text-gold" />
          <span
            style={{
              fontSize: '0.85rem',
              letterSpacing: '0.08em',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-heading)',
            }}
          >
            {countdownText}
          </span>
        </div>

        {/* Main CTA */}
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button onClick={() => onActionClick('booking')} className="btn-gold-filled">
            Book Pooja Seva
          </button>
          <button onClick={() => onActionClick('diya')} className="btn-gold">
            Light Virtual Diya <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Decorative vertical lines on left and right for sanctuary vibe */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '4%',
          width: '1px',
          height: '100%',
          background: 'linear-gradient(to bottom, transparent, var(--border-color), transparent)',
          opacity: 0.3,
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: '4%',
          width: '1px',
          height: '100%',
          background: 'linear-gradient(to bottom, transparent, var(--border-color), transparent)',
          opacity: 0.3,
          zIndex: 2,
        }}
      />
    </header>
  );
};

export default Hero;
