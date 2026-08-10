import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function HeroSection({ t }) {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="heart-divider">♥</div>
        <p className="hero-welcome">{t.welcomeHeader}</p>
        
        <div className="couple-names-wrapper">
          <div className="groom-block">
            <h1 className="groom-name">{t.groomName}</h1>
            <p className="parent-detail">{t.groomParent}</p>
          </div>

          <div className="ampersand">{t.and}</div>

          <div className="bride-block">
            <h1 className="bride-name">{t.brideName}</h1>
            <p className="parent-detail">{t.brideParent}</p>
          </div>
        </div>

        <div className="scroll-indicator">
          <span>{t.scroll}</span>
          <ChevronDown size={18} />
        </div>
      </div>
    </section>
  );
}
