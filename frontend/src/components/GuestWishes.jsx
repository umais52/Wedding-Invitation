import React from 'react';
import { MessageSquareHeart } from 'lucide-react';

export default function GuestWishes({ wishes, t }) {
  return (
    <div className="wishes-section">
      <div style={{ textAlign: 'center' }}>
        <MessageSquareHeart size={30} color="var(--primary-rose)" style={{ marginBottom: '0.3rem' }} />
        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--primary-rose-dark)' }}>
          {t.wishesTitle}
        </h3>
        <div className="ornament-line">✦</div>
      </div>

      {(!wishes || wishes.length === 0) ? (
        <p style={{ textAlign: 'center', color: 'var(--text-muted)', margin: '2rem 0' }}>
          {t.noWishesYet}
        </p>
      ) : (
        <div className="wishes-grid">
          {wishes.map((item) => (
            <div className="wish-card" key={item._id || Math.random()}>
              <div className="wish-header">
                <span className="wish-author">{item.name}</span>
                <span className="wish-date">
                  {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recently'}
                </span>
              </div>
              <p className="wish-text">"{item.message || 'Sending my warmest congratulations to the happy couple!'}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
