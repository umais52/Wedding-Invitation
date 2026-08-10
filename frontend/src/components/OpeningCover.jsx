import React, { useState, useEffect } from 'react';

export default function OpeningCover({ isOpen, onOpen, t }) {
  const [phase, setPhase] = useState('idle'); // idle → cutting → splitting → done
  const [showCoverContent, setShowCoverContent] = useState(true);

  const handleClick = () => {
    if (phase !== 'idle') return;
    
    // Phase 1: Fade out all cover content
    setShowCoverContent(false);
    
    // Phase 2: Start scalpel cut animation
    setTimeout(() => {
      setPhase('cutting');
    }, 500);

    // Phase 3: Split the screen halves apart
    setTimeout(() => {
      setPhase('splitting');
    }, 2200);

    // Phase 4: Fully done, trigger parent open
    setTimeout(() => {
      setPhase('done');
      onOpen();
    }, 3200);
  };

  if (phase === 'done' && isOpen) {
    return null;
  }

  return (
    <div className={`scalpel-cover ${phase}`}>
      {/* Left half of the screen */}
      <div className="cover-half cover-half-left">
        <div className="cover-half-bg"></div>
      </div>

      {/* Right half of the screen */}
      <div className="cover-half cover-half-right">
        <div className="cover-half-bg"></div>
      </div>

      {/* Cut line glow effect */}
      <div className="cut-line"></div>

      {/* The scalpel SVG that moves down — large & detailed */}
      <div className="scalpel-blade">
        <svg viewBox="0 0 60 340" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Blade - elongated triangular surgical blade */}
          <path d="M30 0 L38 90 L35 110 L30 130 L25 110 L22 90 Z" fill="url(#bladeGrad)" stroke="#B0B0B0" strokeWidth="0.6"/>
          {/* Blade cutting edge highlight */}
          <path d="M30 4 L35 85 L33 105 L30 120 Z" fill="url(#bladeShine)" opacity="0.5"/>
          {/* Blade spine line */}
          <line x1="30" y1="8" x2="30" y2="118" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5"/>
          {/* Neck / ferrule */}
          <rect x="26" y="126" width="8" height="24" rx="2" fill="url(#neckGrad)"/>
          <rect x="27" y="128" width="6" height="20" rx="1.5" fill="#B8B8B8" opacity="0.4"/>
          {/* Handle body */}
          <rect x="21" y="148" width="18" height="130" rx="5" fill="url(#handleGrad)"/>
          {/* Handle texture ridges */}
          <rect x="23" y="162" width="14" height="2.5" rx="1" fill="#4A4A4A" opacity="0.25"/>
          <rect x="23" y="172" width="14" height="2.5" rx="1" fill="#4A4A4A" opacity="0.25"/>
          <rect x="23" y="182" width="14" height="2.5" rx="1" fill="#4A4A4A" opacity="0.25"/>
          <rect x="23" y="192" width="14" height="2.5" rx="1" fill="#4A4A4A" opacity="0.25"/>
          <rect x="23" y="202" width="14" height="2.5" rx="1" fill="#4A4A4A" opacity="0.25"/>
          <rect x="23" y="212" width="14" height="2.5" rx="1" fill="#4A4A4A" opacity="0.25"/>
          <rect x="23" y="222" width="14" height="2.5" rx="1" fill="#4A4A4A" opacity="0.25"/>
          <rect x="23" y="232" width="14" height="2.5" rx="1" fill="#4A4A4A" opacity="0.25"/>
          <rect x="23" y="242" width="14" height="2.5" rx="1" fill="#4A4A4A" opacity="0.25"/>
          <rect x="23" y="252" width="14" height="2.5" rx="1" fill="#4A4A4A" opacity="0.25"/>
          {/* Handle side highlight */}
          <rect x="22" y="150" width="3" height="126" rx="1.5" fill="rgba(255,255,255,0.08)"/>
          {/* Handle bottom cap */}
          <rect x="23" y="274" width="14" height="8" rx="3" fill="#999"/>
          <defs>
            <linearGradient id="bladeGrad" x1="22" y1="0" x2="38" y2="0">
              <stop offset="0%" stopColor="#CCCCCC"/>
              <stop offset="30%" stopColor="#E8E8E8"/>
              <stop offset="50%" stopColor="#FFFFFF"/>
              <stop offset="70%" stopColor="#F0F0F0"/>
              <stop offset="100%" stopColor="#BBBBBB"/>
            </linearGradient>
            <linearGradient id="bladeShine" x1="28" y1="0" x2="36" y2="0">
              <stop offset="0%" stopColor="transparent"/>
              <stop offset="50%" stopColor="rgba(255,255,255,0.9)"/>
              <stop offset="100%" stopColor="transparent"/>
            </linearGradient>
            <linearGradient id="neckGrad" x1="26" y1="126" x2="34" y2="126">
              <stop offset="0%" stopColor="#909090"/>
              <stop offset="50%" stopColor="#B0B0B0"/>
              <stop offset="100%" stopColor="#909090"/>
            </linearGradient>
            <linearGradient id="handleGrad" x1="21" y1="148" x2="39" y2="148">
              <stop offset="0%" stopColor="#4A4A4A"/>
              <stop offset="20%" stopColor="#666666"/>
              <stop offset="50%" stopColor="#777777"/>
              <stop offset="80%" stopColor="#666666"/>
              <stop offset="100%" stopColor="#4A4A4A"/>
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Sparkle particles along the cut */}
      <div className="cut-sparks">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="spark" style={{
            animationDelay: `${i * 0.12}s`,
            left: `${48 + (Math.random() - 0.5) * 6}%`,
          }}></div>
        ))}
      </div>

      {/* Cover content (fades out first) */}
      <div className={`cover-content-overlay ${showCoverContent ? '' : 'fading'}`}>
        {/* Medical cross decorations */}
        <div className="medical-cross top-left-cross">✚</div>
        <div className="medical-cross top-right-cross">✚</div>
        <div className="medical-cross bottom-left-cross">✚</div>
        <div className="medical-cross bottom-right-cross">✚</div>

        {/* Heartbeat line decoration */}
        <div className="heartbeat-line-wrapper">
          <svg className="heartbeat-svg" viewBox="0 0 400 60" preserveAspectRatio="none">
            <path d="M0,30 L80,30 L100,10 L115,50 L130,5 L145,55 L160,30 L400,30" 
              stroke="rgba(212,175,55,0.4)" strokeWidth="2" fill="none" className="heartbeat-path"/>
          </svg>
        </div>

        <div className="cover-title-wrapper">
          <h1 className="cover-script">{t.coverTitle}</h1>
          <p className="cover-subtitle">{t.coverSubtitle || 'A Prescription for Love'}</p>
        </div>

        <div className="wax-seal-wrapper">
          <button className="wax-seal-btn" onClick={handleClick} aria-label="Open Invitation">
            <div className="wax-seal-inner-ring"></div>
            {/* Beating heart icon */}
            <div className="beating-heart">
              <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <span style={{ position: 'relative', zIndex: 3 }}>TAP TO OPEN</span>
          </button>
        </div>

        <p className="cover-hint">{t.coverHint}</p>

        {/* Bottom heartbeat line */}
        <div className="heartbeat-line-wrapper bottom-heartbeat">
          <svg className="heartbeat-svg" viewBox="0 0 400 60" preserveAspectRatio="none">
            <path d="M0,30 L80,30 L100,10 L115,50 L130,5 L145,55 L160,30 L400,30" 
              stroke="rgba(212,175,55,0.4)" strokeWidth="2" fill="none" className="heartbeat-path"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
