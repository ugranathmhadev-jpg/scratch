import React, { useState, useEffect } from 'react';
import { dbService } from '../supabase';
import { Maximize2, X, Info } from 'lucide-react';

const Darshan = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const filters = [
    { id: 'all', label: 'All Images' },
    { id: 'daily', label: 'Daily Darshan' },
    { id: 'festivals', label: 'Festivals' },
    { id: 'architecture', label: 'Sacred Spaces' }
  ];

  useEffect(() => {
    const fetchDarshans = async () => {
      setLoading(true);
      const data = await dbService.getDailyDarshans();
      
      // Injecting filter tags locally for demo display
      const itemsWithCategories = [
        {
          id: '1',
          title: 'Garbhagriha Mangala Arati',
          description: 'The morning deity shringar adorned in sacred Tulsi leaves and fresh golden marigolds. Taken during the early morning 6:30 AM Arati.',
          image_url: '/assets/darshan_deity.jpg',
          category: 'daily',
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        },
        {
          id: '2',
          title: 'Maha Deepotsav Festival',
          description: 'A traditional festival of lights where 1008 brass oil lamps are lit around the temple corridors by devotees under the full moon night.',
          image_url: '/assets/festival_celebration.jpg',
          category: 'festivals',
          date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        },
        {
          id: '3',
          title: 'Pradosha Mandapam Pillars',
          description: 'Intricately carved stone pillars representing architectural heritage and geometric symmetry, dating back to historical restoration records.',
          image_url: '/assets/hero_temple_sunset.jpg',
          category: 'architecture',
          date: 'Archival Collection'
        }
      ];

      setGalleryItems(itemsWithCategories);
      setLoading(false);
    };

    fetchDarshans();
  }, []);

  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <section
      id="darshan"
      className="section-padding"
      style={{
        background: 'var(--bg-primary)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.75rem',
              letterSpacing: '0.15em',
              color: 'var(--accent-gold)',
              textTransform: 'uppercase',
            }}
          >
            Visual Sanctuary
          </span>
          <h2
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 400,
              marginTop: '0.5rem',
              textTransform: 'uppercase',
            }}
          >
            Daily Darshan & Gallery
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

        {/* Filter Navigation */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              style={{
                background: activeFilter === filter.id ? 'var(--accent-gold)' : 'transparent',
                color: activeFilter === filter.id ? 'var(--bg-primary)' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: activeFilter === filter.id ? 'var(--accent-gold)' : 'var(--border-color)',
                padding: '0.5rem 1.5rem',
                fontSize: '0.75rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontFamily: 'var(--font-heading)',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                borderRadius: '4px',
              }}
              onMouseEnter={(e) => {
                if (activeFilter !== filter.id) {
                  e.target.style.borderColor = 'var(--accent-gold)';
                  e.target.style.color = 'var(--text-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeFilter !== filter.id) {
                  e.target.style.borderColor = 'var(--border-color)';
                  e.target.style.color = 'var(--text-secondary)';
                }
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '3rem' }}>
            Loading sacred files...
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem',
            }}
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="glass-panel"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  aspectRatio: '4 / 3',
                  border: '1px solid var(--border-color)',
                }}
                onClick={() => setSelectedItem(item)}
              >
                {/* Image */}
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${item.image_url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                  }}
                />

                {/* Dark Vignette Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to top, rgba(10, 9, 8, 0.85) 0%, rgba(10, 9, 8, 0.1) 60%)',
                    zIndex: 2,
                    pointerEvents: 'none',
                  }}
                />

                {/* Text Labels */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    padding: '1.5rem',
                    zIndex: 3,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    pointerEvents: 'none',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '0.65rem',
                        letterSpacing: '0.1em',
                        color: 'var(--accent-gold)',
                        textTransform: 'uppercase',
                        fontWeight: '600',
                      }}
                    >
                      {item.date}
                    </span>
                    <h3
                      style={{
                        fontSize: '1rem',
                        fontWeight: '400',
                        marginTop: '0.25rem',
                        color: '#FAF7F2',
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                  <div
                    style={{
                      background: 'rgba(197, 168, 128, 0.15)',
                      border: '1px solid rgba(197, 168, 128, 0.4)',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--accent-gold)',
                    }}
                  >
                    <Maximize2 size={12} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedItem && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              backgroundColor: 'rgba(10, 9, 8, 0.95)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              animation: 'fadeIn 0.4s ease-out',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              style={{
                position: 'absolute',
                top: '2rem',
                right: '2rem',
                background: 'none',
                border: 'none',
                color: 'var(--text-primary)',
                cursor: 'pointer',
                padding: '0.5rem',
                zIndex: 2001,
              }}
            >
              <X size={28} />
            </button>

            {/* Modal Body */}
            <div
              className="glass-panel"
              style={{
                maxWidth: '1000px',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                overflow: 'hidden',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-secondary)',
              }}
            >
              {/* Image Frame */}
              <div
                style={{
                  width: '100%',
                  height: '400px',
                  backgroundImage: `url(${selectedItem.image_url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRight: '1px solid var(--border-color)',
                }}
              />

              {/* Text Description Pane */}
              <div
                style={{
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <Info size={14} className="text-gold" />
                  <span
                    style={{
                      fontSize: '0.7rem',
                      letterSpacing: '0.12em',
                      color: 'var(--accent-gold)',
                      textTransform: 'uppercase',
                      fontWeight: '600',
                    }}
                  >
                    Category: {selectedItem.category} • {selectedItem.date}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 400,
                    marginBottom: '1rem',
                    textTransform: 'uppercase',
                  }}
                >
                  {selectedItem.title}
                </h3>
                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.9rem',
                    lineHeight: '1.7',
                    fontWeight: '300',
                    marginBottom: '2rem',
                  }}
                >
                  {selectedItem.description}
                </p>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="btn-gold"
                  style={{ alignSelf: 'flex-start' }}
                >
                  Close View
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Darshan;
