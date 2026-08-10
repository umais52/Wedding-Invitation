import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

export default function VenueSection({ t }) {
  const mapUrl = "https://maps.google.com/?q=The+Grand+Rose+Garden+Palace";

  return (
    <section className="venue-section">
      <MapPin size={34} color="var(--primary-rose)" style={{ marginBottom: '0.5rem' }} />
      <h2 className="section-title-script">{t.venueTitle}</h2>
      <div className="ornament-line">✦</div>

      <div className="venue-card">
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--primary-rose-dark)', marginBottom: '0.5rem' }}>
          {t.venueName}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', marginBottom: '1.5rem' }}>
          {t.venueAddress}
        </p>

        <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
          <Navigation size={18} />
          <span>{t.getDirections}</span>
        </a>
      </div>
    </section>
  );
}
