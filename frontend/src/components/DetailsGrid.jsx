import React from 'react';
import { Shirt, Sparkles, Bus, Gift } from 'lucide-react';

export default function DetailsGrid({ t }) {
  return (
    <section className="details-section">
      <div style={{ textAlign: 'center' }}>
        <h2 className="section-title-script">Event Information</h2>
        <div className="ornament-line">✦</div>
      </div>

      <div className="details-grid">
        {/* Dress Code Card */}
        <div className="info-card">
          <div className="info-card-icon">
            <Shirt size={24} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--primary-rose-dark)', marginBottom: '0.8rem' }}>
            {t.dressCodeTitle}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.4rem' }}>{t.womenDress}</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{t.menDress}</p>
        </div>

        {/* Pre-wedding Events Card */}
        <div className="info-card">
          <div className="info-card-icon">
            <Sparkles size={24} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--primary-rose-dark)', marginBottom: '0.8rem' }}>
            {t.preEventsTitle}
          </h3>
          <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{t.mehendiTitle}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{t.mehendiTime}</p>
          <p style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{t.haldiTitle} & {t.sangeetTitle}</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{t.haldiTime} | {t.sangeetTime}</p>
        </div>

        {/* Shuttle & Hotel Card */}
        <div className="info-card">
          <div className="info-card-icon">
            <Bus size={24} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--primary-rose-dark)', marginBottom: '0.8rem' }}>
            {t.transportTitle}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{t.shuttleDesc}</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{t.hotelDesc}</p>
        </div>

        {/* Gift Note Card */}
        <div className="info-card">
          <div className="info-card-icon">
            <Gift size={24} />
          </div>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--primary-rose-dark)', marginBottom: '0.8rem' }}>
            {t.giftNoteTitle}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>{t.giftNoteDesc}</p>
        </div>
      </div>
    </section>
  );
}
