import React, { useState } from 'react';
import { dbService } from '../supabase';
import { Calendar, User, Check, AlertCircle, ArrowLeft } from 'lucide-react';

const Booking = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookingResult, setBookingResult] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    pooja_type: '',
    booking_date: '',
    time_slot: '',
    devotee_name: '',
    gotra: '',
    email: '',
  });

  const poojaOptions = [
    { id: 'archana', name: 'Archana Seva', price: '$15', desc: 'Personal chanting of prayers with flower and coconut offerings.' },
    { id: 'rudrabhishek', name: 'Maha Rudrabhishek', price: '$51', desc: 'Elaborate bathing ritual of Shiva accompanied by Rig Vedic chants.' },
    { id: 'satyanarayan', name: 'Satyanarayan Katha', price: '$75', desc: 'Sacred storytelling and prayers dedicated to Narayana for prosperity.' },
    { id: 'havan', name: 'Navagraha Havan', price: '$121', desc: 'Traditional homam (sacred fire) to resolve planetary configurations.' }
  ];

  const timeSlots = [
    'Morning Slot (07:00 AM - 09:00 AM)',
    'Mid-day Slot (10:00 AM - 12:00 PM)',
    'Evening Slot (05:30 PM - 07:30 PM)'
  ];

  const handleSelectPooja = (poojaName) => {
    setFormData({ ...formData, pooja_type: poojaName });
    setStep(2);
  };

  const handleNextStep = () => {
    if (step === 2 && (!formData.booking_date || !formData.time_slot)) {
      setError('Please choose a date and time slot.');
      return;
    }
    setError(null);
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setError(null);
    setStep(step - 1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    if (!formData.devotee_name || !formData.email) {
      setError('Name and Email are required.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await dbService.createBooking(formData);
      setBookingResult(data);
      setStep(4);
    } catch (err) {
      setError(err.message || 'Something went wrong during the booking process. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      pooja_type: '',
      booking_date: '',
      time_slot: '',
      devotee_name: '',
      gotra: '',
      email: '',
    });
    setBookingResult(null);
    setStep(1);
  };

  return (
    <section
      id="booking"
      className="section-padding"
      style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div className="container" style={{ maxWidth: '700px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              color: 'var(--accent-gold)',
              textTransform: 'uppercase',
            }}
          >
            Sacred Offerings
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 400,
              marginTop: '0.5rem',
              textTransform: 'uppercase',
            }}
          >
            Book Pooja Seva
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

        {/* Wizard Card */}
        <div
          className="glass-panel"
          style={{
            padding: '2.5rem',
            border: '1px solid var(--border-color)',
            boxShadow: '0 12px 40px var(--shadow-color)',
            borderRadius: '8px',
          }}
        >
          {/* Progress Indicators */}
          {step < 4 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '2.5rem',
                position: 'relative',
              }}
            >
              {/* Progress Line */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  width: '100%',
                  height: '1px',
                  backgroundColor: 'var(--border-color)',
                  zIndex: 1,
                  transform: 'translateY(-50%)',
                }}
              />
              {/* Active Progress Line */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: 0,
                  width: `${((step - 1) / 2) * 100}%`,
                  height: '1px',
                  backgroundColor: 'var(--accent-gold)',
                  zIndex: 2,
                  transform: 'translateY(-50%)',
                  transition: 'width 0.4s ease',
                }}
              />

              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: step >= num ? 'var(--accent-gold)' : 'var(--bg-secondary)',
                    color: step >= num ? 'var(--bg-primary)' : 'var(--text-muted)',
                    border: `1px solid ${step >= num ? 'var(--accent-gold)' : 'var(--border-color)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    zIndex: 3,
                    transition: 'all 0.3s ease',
                  }}
                >
                  {step > num ? <Check size={14} /> : num}
                </div>
              ))}
            </div>
          )}

          {error && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem',
                background: 'rgba(230, 80, 80, 0.1)',
                border: '1px solid rgba(230, 80, 80, 0.2)',
                borderRadius: '4px',
                color: '#E65050',
                fontSize: '0.85rem',
                marginBottom: '1.5rem',
              }}
            >
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* STEP 1: Pooja Selection */}
          {step === 1 && (
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                Select a Pooja offering
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {poojaOptions.map((pooja) => (
                  <div
                    key={pooja.id}
                    className="glass-panel"
                    style={{
                      padding: '1.5rem',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: '1.5rem',
                      border: '1px solid var(--border-color)',
                      transition: 'var(--transition-fast)',
                    }}
                    onClick={() => handleSelectPooja(pooja.name)}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-gold)'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                  >
                    <div style={{ flex: 1 }}>
                      <h4 style={{ fontWeight: '600', color: 'var(--text-primary)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        {pooja.name}
                      </h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem', fontWeight: '300' }}>
                        {pooja.desc}
                      </p>
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: '600',
                        color: 'var(--accent-gold)',
                        fontSize: '1.1rem',
                      }}
                    >
                      {pooja.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Time & Date Slot Selection */}
          {step === 2 && (
            <div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                Choose Schedule Timings
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <label htmlFor="booking_date" className="form-label">
                    Select Date
                  </label>
                  <input
                    type="date"
                    id="booking_date"
                    name="booking_date"
                    value={formData.booking_date}
                    onChange={handleInputChange}
                    className="form-input"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="form-label">Select time slot</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData({ ...formData, time_slot: slot })}
                        style={{
                          width: '100%',
                          textAlign: 'left',
                          padding: '1rem',
                          background: formData.time_slot === slot ? 'var(--accent-gold-glow)' : 'var(--bg-tertiary)',
                          color: formData.time_slot === slot ? 'var(--accent-gold)' : 'var(--text-primary)',
                          border: `1px solid ${formData.time_slot === slot ? 'var(--accent-gold)' : 'var(--border-color)'}`,
                          borderRadius: '4px',
                          cursor: 'pointer',
                          transition: 'var(--transition-fast)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                        }}
                      >
                        <span
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            border: '1px solid var(--accent-gold)',
                            display: 'inline-block',
                            backgroundColor: formData.time_slot === slot ? 'var(--accent-gold)' : 'transparent',
                          }}
                        />
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
                <button onClick={handlePrevStep} className="btn-gold" style={{ padding: '0.5rem 1.25rem' }}>
                  <ArrowLeft size={14} /> Back
                </button>
                <button onClick={handleNextStep} className="btn-gold-filled" style={{ padding: '0.5rem 1.25rem' }}>
                  Next Step
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Devotee Details */}
          {step === 3 && (
            <form onSubmit={handleSubmitBooking}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                Devotee Identification
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label htmlFor="devotee_name" className="form-label">
                    Primary Devotee Name *
                  </label>
                  <input
                    type="text"
                    id="devotee_name"
                    name="devotee_name"
                    value={formData.devotee_name}
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    className="form-input"
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label htmlFor="gotra" className="form-label">
                      Gotra (Vedic Clan)
                    </label>
                    <input
                      type="text"
                      id="gotra"
                      name="gotra"
                      value={formData.gotra}
                      onChange={handleInputChange}
                      placeholder="e.g. Kashyap"
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="form-label">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="devotee@example.com"
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div
                  className="glass-panel"
                  style={{
                    padding: '1.25rem',
                    border: '1px solid var(--border-color)',
                    fontSize: '0.85rem',
                    color: 'var(--text-secondary)',
                    marginTop: '0.5rem',
                  }}
                >
                  <h4 style={{ fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', color: 'var(--accent-gold)' }}>
                    Verification Summary
                  </h4>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <li><strong>Offering:</strong> {formData.pooja_type}</li>
                    <li><strong>Date:</strong> {formData.booking_date}</li>
                    <li><strong>Time:</strong> {formData.time_slot}</li>
                  </ul>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2.5rem' }}>
                <button type="button" onClick={handlePrevStep} className="btn-gold" style={{ padding: '0.5rem 1.25rem' }}>
                  <ArrowLeft size={14} /> Back
                </button>
                <button type="submit" className="btn-gold-filled" style={{ padding: '0.5rem 1.25rem' }} disabled={loading}>
                  {loading ? 'Processing...' : 'Confirm & Schedule'}
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Success Screen */}
          {step === 4 && bookingResult && (
            <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
              <div
                style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '50%',
                  background: 'var(--accent-gold-glow)',
                  border: '1px solid var(--accent-gold)',
                  color: 'var(--accent-gold)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto',
                  animation: 'pulseGold 2s infinite',
                }}
              >
                <Check size={28} />
              </div>
              <h3 style={{ fontSize: '1.35rem', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                Pooja Scheduled
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                Your sacred slot has been blocked. A confirmation mail has been sent to <strong>{bookingResult.email}</strong>.
              </p>

              <div
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  border: '1px solid var(--border-color)',
                  textAlign: 'left',
                  marginBottom: '2rem',
                  fontSize: '0.85rem',
                }}
              >
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <li><strong>Reference ID:</strong> <span style={{ fontFamily: 'monospace', color: 'var(--accent-gold)' }}>{bookingResult.id}</span></li>
                  <li><strong>Devotee:</strong> {bookingResult.devotee_name}</li>
                  {bookingResult.gotra && <li><strong>Gotra:</strong> {bookingResult.gotra}</li>}
                  <li><strong>Offering:</strong> {bookingResult.pooja_type}</li>
                  <li><strong>Date:</strong> {bookingResult.booking_date}</li>
                  <li><strong>Time Slot:</strong> {bookingResult.time_slot}</li>
                </ul>
              </div>

              <button onClick={resetForm} className="btn-gold-filled">
                Schedule Another Seva
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Booking;
