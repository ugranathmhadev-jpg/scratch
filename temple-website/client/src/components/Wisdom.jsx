import React, { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const Wisdom = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const scriptures = [
    {
      sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
      transliteration: "karmaṇy-evādhikāras te mā phaleṣu kadācana\nmā karma-phala-hetur bhūr mā te saṅgo ’stv-akarmaṇi",
      translation: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, and never be attached to not doing your duty.",
      source: "Bhagavad Gita, Chapter 2, Verse 47"
    },
    {
      sanskrit: "यतो धर्मस्ततो जयः ।",
      transliteration: "yato dharmas tato jayaḥ",
      translation: "Where there is righteousness, there is victory.",
      source: "Sanskrit Maxim, Mahabharata"
    },
    {
      sanskrit: "अहिंसा परमो धर्मः ।",
      transliteration: "ahiṃsā paramo dharmaḥ",
      translation: "Non-violence is the ultimate righteousness.",
      source: "Mahabharata, Adi Parva"
    },
    {
      sanskrit: "तमसॊ मा ज्यॊतिर्गमय ।",
      transliteration: "tamaso mā jyotirgamaya",
      translation: "Lead me from darkness to light.",
      source: "Brihadaranyaka Upanishad"
    }
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % scriptures.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + scriptures.length) % scriptures.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 10000); // cycle every 10s
    return () => clearInterval(timer);
  }, []);

  const current = scriptures[activeIndex];

  return (
    <section
      id="wisdom"
      className="section-padding"
      style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        textAlign: 'center',
      }}
    >
      <div className="container" style={{ maxWidth: '800px' }}>
        {/* Quote Icon */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              backgroundColor: 'var(--accent-gold-glow)',
              color: 'var(--accent-gold)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Quote size={20} />
          </div>
        </div>

        {/* Quotes Body */}
        <div style={{ minHeight: '340px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* Sanskrit verse */}
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.2rem, 3.5vw, 1.8rem)',
              lineHeight: '1.8',
              letterSpacing: '0.05em',
              color: 'var(--text-primary)',
              whiteSpace: 'pre-line',
              marginBottom: '1.5rem',
            }}
          >
            {current.sanskrit}
          </p>

          {/* Transliteration */}
          <p
            style={{
              fontStyle: 'italic',
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              letterSpacing: '0.05em',
              marginBottom: '2rem',
              maxWidth: '650px',
              margin: '0 auto 2rem auto',
            }}
          >
            {current.transliteration}
          </p>

          {/* Translation */}
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              fontWeight: 300,
              lineHeight: '1.8',
              maxWidth: '700px',
              margin: '0 auto 2.5rem auto',
            }}
          >
            "{current.translation}"
          </p>

          {/* Source */}
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              color: 'var(--accent-gold)',
              textTransform: 'uppercase',
              fontWeight: '600',
            }}
          >
            {current.source}
          </span>
        </div>

        {/* Carousel controls */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '1.5rem',
            marginTop: '3rem',
          }}
        >
          <button
            onClick={handlePrev}
            style={{
              background: 'none',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-gold)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            <ChevronLeft size={16} />
          </button>

          {/* Navigation dots */}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {scriptures.map((_, index) => (
              <span
                key={index}
                onClick={() => setActiveIndex(index)}
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: index === activeIndex ? 'var(--accent-gold)' : 'var(--border-color)',
                  cursor: 'pointer',
                  display: 'inline-block',
                  transition: 'background-color 0.3s ease',
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            style={{
              background: 'none',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-gold)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-color)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Wisdom;
