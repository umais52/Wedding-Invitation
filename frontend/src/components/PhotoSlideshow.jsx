import React, { useState, useEffect } from 'react';
import { Images } from 'lucide-react';

const SLIDESHOW_IMAGES = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=900&q=80',
];

export default function PhotoSlideshow({ t }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="slideshow-section reveal-section">
      <Images size={30} color="var(--primary-rose)" style={{ marginBottom: '0.5rem' }} />
      <h2 className="section-title-script">{t.slideshowTitle || 'Our Moments'}</h2>
      <div className="ornament-line">♥</div>

      <div className="slideshow-container">
        {SLIDESHOW_IMAGES.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Wedding moment ${idx + 1}`}
            className={`slideshow-image ${idx === currentIndex ? 'active' : ''}`}
          />
        ))}
      </div>

      <div className="slideshow-dots">
        {SLIDESHOW_IMAGES.map((_, idx) => (
          <button
            key={idx}
            className={`slideshow-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
