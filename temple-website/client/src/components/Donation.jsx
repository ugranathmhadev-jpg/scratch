import React, { useState } from 'react';
import { dbService } from '../supabase';
import { Heart, CreditCard, Shield, Check, DollarSign } from 'lucide-react';

const Donation = () => {
  const [amount, setAmount] = useState(51);
  const [isCustomAmount, setIsCustomAmount] = useState(false);
  const [devoteeName, setDevoteeName] = useState('');
  const [sevaType, setSevaType] = useState('Annadanam (Feeding Pilgrims)');
  const [message, setMessage] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactionId, setTransactionId] = useState(null);

  const presetAmounts = [11, 25, 51, 108, 251];

  const sevas = [
    { id: 'anna', name: 'Annadanam (Feeding Pilgrims)', desc: 'Provides hot sanctified meals to pilgrims and underprivileged families visiting the temple.' },
    { id: 'goshala', name: 'Goshala Care (Cow Shelter)', desc: 'Covers green fodder, clean drinking water, shelter, and medical care for sacred cows in our heritage goshala.' },
    { id: 'restoration', name: 'Preservation & Heritage', desc: 'Directly funds stone carvings, restoration of architectural facades, and maintenance of sacred chambers.' }
  ];

  const handleSelectPreset = (value) => {
    setAmount(value);
    setIsCustomAmount(false);
  };

  const handleCustomChange = (e) => {
    const val = parseFloat(e.target.value);
    setAmount(isNaN(val) ? 0 : val);
  };

  const triggerPaymentFlow = (e) => {
    e.preventDefault();
    if (!devoteeName || amount <= 0) return;
    setShowPaymentModal(true);
  };

  const handleProcessPayment = async () => {
    setLoading(true);
    // Mimic processing delay
    setTimeout(async () => {
      try {
        const donationData = {
          devotee_name: devoteeName,
          amount: parseFloat(amount),
          seva_type: sevaType,
          message: message,
        };
        const res = await dbService.createDonation(donationData);
        setTransactionId(res.id || Math.random().toString(36).substr(2, 9));
        setPaymentSuccess(true);
      } catch (err) {
        console.error('Donation error:', err);
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  const handleCloseSuccess = () => {
    setShowPaymentModal(false);
    setPaymentSuccess(false);
    setDevoteeName('');
    setMessage('');
    setAmount(51);
    setIsCustomAmount(false);
  };

  return (
    <section
      id="donation"
      className="section-padding"
      style={{
        background: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-color)',
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
            Sacred Contributions
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 400,
              marginTop: '0.5rem',
              textTransform: 'uppercase',
            }}
          >
            Seva & Donations
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            alignItems: 'start',
          }}
        >
          {/* Left panel: Causes list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', textTransform: 'uppercase', fontWeight: 400 }}>
              Supporting Sacred Causes
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontWeight: 300, fontSize: '0.95rem', lineHeight: '1.7' }}>
              Your financial contributions keep the temple doors open, fund daily meals for hundreds of searchers, 
              and maintain historical architectural components for generations to come. All donations are logged securely.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {sevas.map((s) => (
                <div
                  key={s.id}
                  className="glass-panel"
                  style={{
                    padding: '1.5rem',
                    border: '1px solid var(--border-color)',
                    borderColor: sevaType === s.name ? 'var(--accent-gold)' : 'var(--glass-border)',
                    cursor: 'pointer',
                    transition: 'var(--transition-smooth)',
                  }}
                  onClick={() => setSevaType(s.name)}
                >
                  <h4 style={{ color: 'var(--text-primary)', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Heart size={14} className={sevaType === s.name ? 'text-gold' : ''} /> {s.name}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem', fontWeight: 300 }}>
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel: Donation builder form */}
          <div
            className="glass-panel"
            style={{
              padding: '2.5rem',
              border: '1px solid var(--border-color)',
              boxShadow: '0 12px 40px var(--shadow-color)',
            }}
          >
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', textTransform: 'uppercase', color: 'var(--accent-gold)' }}>
              Setup Contribution
            </h3>

            <form onSubmit={triggerPaymentFlow} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Preset buttons */}
              <div>
                <label className="form-label">Select Amount (USD)</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem', marginBottom: '1rem' }}>
                  {presetAmounts.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => handleSelectPreset(amt)}
                      style={{
                        padding: '0.65rem 0',
                        background: amount === amt && !isCustomAmount ? 'var(--accent-gold)' : 'var(--bg-tertiary)',
                        color: amount === amt && !isCustomAmount ? 'var(--bg-primary)' : 'var(--text-primary)',
                        border: `1px solid ${amount === amt && !isCustomAmount ? 'var(--accent-gold)' : 'var(--border-color)'}`,
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        borderRadius: '4px',
                        transition: 'var(--transition-fast)',
                      }}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>

                {/* Custom toggle */}
                <button
                  type="button"
                  onClick={() => setIsCustomAmount(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--accent-gold)',
                    fontSize: '0.8rem',
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    display: 'block',
                    marginBottom: '1rem',
                  }}
                >
                  Or enter custom amount
                </button>

                {isCustomAmount && (
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}>$</span>
                    <input
                      type="number"
                      placeholder="Enter amount"
                      className="form-input"
                      style={{ paddingLeft: '2rem' }}
                      onChange={handleCustomChange}
                      min="1"
                      required
                    />
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="devotee_name" className="form-label">
                  Devotee Name *
                </label>
                <input
                  type="text"
                  id="devotee_name"
                  value={devoteeName}
                  onChange={(e) => setDevoteeName(e.target.value)}
                  placeholder="Your full name"
                  className="form-input"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="form-label">
                  Dedication Message (Optional)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Offerings/remembrance message..."
                  rows="3"
                  className="form-input"
                  style={{ resize: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <Shield size={12} className="text-gold" />
                <span>SSL Encrypted Transaction Simulation</span>
              </div>

              <button type="submit" className="btn-gold-filled" style={{ marginTop: '0.5rem' }}>
                Offer Seva (${amount})
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Payment Gateway Modal (Mock) */}
      {showPaymentModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(10, 9, 8, 0.96)',
            zIndex: 3000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          <div
            className="glass-panel"
            style={{
              maxWidth: '450px',
              width: '100%',
              padding: '2.5rem',
              border: '1px solid var(--border-color)',
              position: 'relative',
            }}
          >
            {!paymentSuccess ? (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
                  <CreditCard size={18} className="text-gold" />
                  <h3 style={{ fontSize: '1.1rem', textTransform: 'uppercase', fontWeight: 400 }}>
                    Secure Checkout Gate
                  </h3>
                </div>

                <div style={{ marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '4px' }}>
                    <li><strong>Seva:</strong> {sevaType}</li>
                    <li><strong>Devotee:</strong> {devoteeName}</li>
                    <li><strong>Amount:</strong> ${amount}</li>
                  </ul>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                  <div>
                    <label className="form-label">Dummy Card Number</label>
                    <input type="text" placeholder="4111 2222 3333 4444" className="form-input" disabled={loading} />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label className="form-label">Expiry Date</label>
                      <input type="text" placeholder="12/28" className="form-input" disabled={loading} />
                    </div>
                    <div>
                      <label className="form-label">CVV</label>
                      <input type="password" placeholder="***" className="form-input" disabled={loading} />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    onClick={() => setShowPaymentModal(false)}
                    className="btn-gold"
                    style={{ flex: 1, padding: '0.5rem' }}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleProcessPayment}
                    className="btn-gold-filled"
                    style={{ flex: 1, padding: '0.5rem' }}
                    disabled={loading}
                  >
                    {loading ? 'Securing...' : `Pay $${amount}`}
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-gold-glow)',
                    border: '1px solid var(--accent-gold)',
                    color: 'var(--accent-gold)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem auto',
                    animation: 'pulseGold 2s infinite',
                  }}
                >
                  <Check size={24} />
                </div>
                <h3 style={{ fontSize: '1.25rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  Seva Offering Complete
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                  Your donation has been verified. A mock receipt has been generated. Thank you for your support.
                </p>

                <div style={{ textAlign: 'left', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: '4px', fontSize: '0.8rem', marginBottom: '2rem' }}>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <li><strong>Receipt ID:</strong> <span style={{ fontFamily: 'monospace' }}>{transactionId}</span></li>
                    <li><strong>Amount Paid:</strong> ${amount}</li>
                    <li><strong>Status:</strong> Approved</li>
                  </ul>
                </div>

                <button onClick={handleCloseSuccess} className="btn-gold-filled" style={{ width: '100%' }}>
                  Return to Sanctuary
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Donation;
