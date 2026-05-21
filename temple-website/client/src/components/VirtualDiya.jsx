import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Bell } from 'lucide-react';

const VirtualDiya = () => {
  const [isLit, setIsLit] = useState(false);
  const [intention, setIntention] = useState('');
  const [sentIntention, setSentIntention] = useState(null);
  const canvasRef = useRef(null);
  const animationFrameId = useRef(null);

  // Play synthesized bell sound using Web Audio API
  const playBellSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const now = ctx.currentTime;
      
      // Harmonics of a large temple bell
      const rootFreq = 220; // Low rich resonance
      const partials = [1, 1.5, 2, 2.6, 3.2, 4.1];
      const gains = [0.8, 0.4, 0.3, 0.15, 0.08, 0.04];
      
      partials.forEach((mult, i) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(rootFreq * mult, now);
        
        // Instant strike, slow bell ring decay
        gainNode.gain.setValueAtTime(0.001, now);
        gainNode.gain.linearRampToValueAtTime(gains[i] * 0.4, now + 0.015);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, now + 5.0 / mult);
        
        osc.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.start(now);
        osc.stop(now + 6.0);
      });
    } catch (e) {
      console.warn('Web Audio Context blocked or not supported:', e);
    }
  };

  const handleLightDiya = (e) => {
    e.preventDefault();
    if (isLit) return;
    setIsLit(true);
    playBellSound();
    if (intention.trim()) {
      setSentIntention(intention);
      setIntention('');
    }
  };

  const handleExtinguish = () => {
    setIsLit(false);
    setSentIntention(null);
  };

  // Canvas particle animation for floating embers when lit
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const maxParticles = 60;
    
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 300;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.reset();
        // start particles around the flame position (center-bottom)
        this.y = canvas.height - 75 - Math.random() * 20;
      }

      reset() {
        this.x = canvas.width / 2 + (Math.random() - 0.5) * 15;
        this.y = canvas.height - 70;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = -Math.random() * 1.5 - 0.5;
        this.size = Math.random() * 2 + 1;
        this.maxLife = Math.random() * 100 + 50;
        this.life = 0;
        // Warm gold particle colors
        this.color = `hsla(${25 + Math.random() * 20}, 85%, 65%, ${0.5 + Math.random() * 0.5})`;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        if (this.life >= this.maxLife) {
          this.reset();
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        // Shadow/glow for sparks
        ctx.shadowBlur = 6;
        ctx.shadowColor = 'rgba(197, 168, 128, 0.4)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      if (isLit) {
        particles.forEach(p => {
          p.update();
          p.draw();
        });
      }
      
      animationFrameId.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [isLit]);

  return (
    <section
      id="diya"
      className="section-padding"
      style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
        position: 'relative',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              color: 'var(--accent-gold)',
              textTransform: 'uppercase',
            }}
          >
            Sanctuary of Intention
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 400,
              marginTop: '0.5rem',
              textTransform: 'uppercase',
            }}
          >
            Light a Virtual Diya
          </h2>
          <div
            style={{
              width: '50px',
              height: '1px',
              backgroundColor: 'var(--accent-gold)',
              margin: '1.5rem auto 0 auto',
            }}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '4rem',
            alignItems: 'center',
          }}
        >
          {/* Diya Interactive Chamber */}
          <div
            className="glass-panel"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem 1.5rem',
              position: 'relative',
              minHeight: '380px',
              overflow: 'hidden',
              boxShadow: isLit ? 'inset 0 0 50px rgba(197, 168, 128, 0.08)' : 'none',
              borderColor: isLit ? 'var(--accent-gold)' : 'var(--glass-border)',
            }}
          >
            {/* Background Glow */}
            {isLit && (
              <div
                style={{
                  position: 'absolute',
                  bottom: '30px',
                  width: '180px',
                  height: '180px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(197, 168, 128, 0.15) 0%, transparent 70%)',
                  pointerEvents: 'none',
                  animation: 'flicker 3s infinite alternate',
                  zIndex: 1,
                }}
              />
            )}

            {/* Sparkle Floating Canvas */}
            <canvas
              ref={canvasRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 2,
              }}
            />

            {/* Diya SVG Assembly */}
            <div
              style={{
                position: 'relative',
                marginTop: 'auto',
                marginBottom: '1rem',
                zIndex: 3,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
              onClick={isLit ? handleExtinguish : handleLightDiya}
            >
              {/* Flame Component */}
              {isLit && (
                <div
                  className="animate-flicker"
                  style={{
                    position: 'absolute',
                    top: '-65px',
                    width: '32px',
                    height: '65px',
                    background: 'radial-gradient(ellipse at bottom, #FFDFB0 0%, #FF9900 40%, rgba(220,100,0,0) 80%)',
                    borderRadius: '50% 50% 35% 35% / 70% 70% 30% 30%',
                    filter: 'drop-shadow(0 0 15px rgba(255, 168, 0, 0.8))',
                  }}
                />
              )}

              {/* Brass Diya Vessel */}
              <svg
                width="160"
                height="80"
                viewBox="0 0 160 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.5))',
                  transition: 'var(--transition-smooth)',
                  transform: isLit ? 'scale(1.03)' : 'scale(1)',
                }}
              >
                {/* Brass Body */}
                <path
                  d="M10 20 C 10 20, 80 15, 150 20 C 150 20, 160 65, 80 75 C 0 65, 10 20, 10 20 Z"
                  fill="url(#brass-grad)"
                  stroke="var(--accent-gold)"
                  strokeWidth="1.5"
                />
                {/* Inside Vessel (Oil Pool) */}
                <ellipse cx="80" cy="22" rx="66" ry="10" fill="#3D2918" stroke="rgba(197,168,128,0.2)" />
                {/* Floating Wick */}
                <path d="M78 24 L82 24 L80 12 Z" fill="#201F1E" />
                {/* Highlights */}
                <path d="M15 25 C 40 42, 120 42, 145 25" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />
                
                {/* Gradients */}
                <defs>
                  <linearGradient id="brass-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#4A3B2C" />
                    <stop offset="30%" stopColor="#9E7B55" />
                    <stop offset="50%" stopColor="#C5A880" />
                    <stop offset="70%" stopColor="#9E7B55" />
                    <stop offset="100%" stopColor="#32261B" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Interactive Bell triggering */}
            <button
              onClick={playBellSound}
              style={{
                background: 'rgba(23,22,20,0.5)',
                border: '1px solid var(--border-color)',
                borderRadius: '50px',
                padding: '0.5rem 1.25rem',
                fontSize: '0.75rem',
                color: 'var(--accent-gold)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                zIndex: 3,
                marginBottom: '1rem',
              }}
              onMouseEnter={(e) => e.target.style.borderColor = 'var(--accent-gold)'}
              onMouseLeave={(e) => e.target.style.borderColor = 'var(--border-color)'}
            >
              <Bell size={12} /> Ring Temple Bell
            </button>

            {/* Status text */}
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                color: isLit ? 'var(--accent-gold)' : 'var(--text-muted)',
                textTransform: 'uppercase',
                zIndex: 3,
              }}
            >
              {isLit ? 'Intention Ignited' : 'Tap Vessel to Ignite'}
            </span>
          </div>

          {/* Intention Input Panel */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.95rem',
                fontWeight: '300',
                lineHeight: '1.7',
              }}
            >
              Lighting an oil lamp is a traditional practice representing the transition from darkness to light. 
              Write down your silent prayer, wish, or names of loved ones below, and press the button to 
              offer your prayers into the temple's sanctuary.
            </p>

            {sentIntention ? (
              <div
                className="glass-panel"
                style={{
                  padding: '2rem',
                  border: '1px dashed var(--accent-gold)',
                  animation: 'fadeIn 0.6s ease-out',
                  textAlign: 'center',
                }}
              >
                <Sparkles
                  size={24}
                  style={{ color: 'var(--accent-gold)', marginBottom: '1rem', animation: 'spinSlow 10s linear infinite' }}
                />
                <h3
                  style={{
                    fontSize: '1rem',
                    textTransform: 'uppercase',
                    marginBottom: '0.75rem',
                    fontWeight: 600,
                  }}
                >
                  Offering Accepted
                </h3>
                <p
                  style={{
                    fontStyle: 'italic',
                    color: 'var(--text-primary)',
                    fontSize: '0.95rem',
                    marginBottom: '1.5rem',
                  }}
                >
                  "{sentIntention}"
                </p>
                <button
                  onClick={handleExtinguish}
                  className="btn-gold"
                  style={{ fontSize: '0.75rem', padding: '0.5rem 1.25rem' }}
                >
                  Offer Another Prayer
                </button>
              </div>
            ) : (
              <form onSubmit={handleLightDiya} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label htmlFor="intention" className="form-label">
                    Your Prayer / Intention
                  </label>
                  <textarea
                    id="intention"
                    value={intention}
                    onChange={(e) => setIntention(e.target.value)}
                    placeholder="Enter names, silent prayer, or a message of peace..."
                    rows="4"
                    className="form-input"
                    style={{ resize: 'none', fontFamily: 'var(--font-body)' }}
                  />
                </div>

                <button type="submit" className="btn-gold-filled" disabled={isLit} style={{ alignSelf: 'flex-start' }}>
                  Light Diya & Send Offerings
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VirtualDiya;
