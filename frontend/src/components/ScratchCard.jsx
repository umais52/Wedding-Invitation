import React, { useRef, useEffect, useState } from 'react';
import { Calendar, Heart, Sparkles, Lock, KeyRound, X } from 'lucide-react';

function SingleScratchCard({ icon: Icon, title, subtitle, t, width = 280, height = 160 }) {
  const canvasRef = useRef(null);
  const [locked, setLocked] = useState(true);
  const [chainPulled, setChainPulled] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [code, setCode] = useState('');
  const [shaking, setShaking] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);

  // Draw scratch foil only after unlock
  useEffect(() => {
    if (locked || !canvasReady) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#D4AF37');
    gradient.addColorStop(0.3, '#E8C84A');
    gradient.addColorStop(0.5, '#F4E8C1');
    gradient.addColorStop(0.7, '#D4AF37');
    gradient.addColorStop(1, '#AA7C11');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const shineGrad = ctx.createRadialGradient(
      canvas.width * 0.3, canvas.height * 0.3, 10,
      canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.6
    );
    shineGrad.addColorStop(0, 'rgba(255, 255, 255, 0.2)');
    shineGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = shineGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
    ctx.font = 'italic 16px "Cormorant Garamond", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ Scratch to Reveal ✦', canvas.width / 2, canvas.height / 2);
  }, [locked, canvasReady]);

  // After unlock, wait a tick for canvas to mount, then mark ready
  useEffect(() => {
    if (!locked && !canvasReady) {
      requestAnimationFrame(() => setCanvasReady(true));
    }
  }, [locked, canvasReady]);

  // Tap card → pull chain back, show password field
  const handleCardTap = () => {
    if (!locked || chainPulled || showInput) return;
    setChainPulled(true);
    setTimeout(() => setShowInput(true), 600);
  };

  // Submit password
  const handleSubmit = (e) => {
    e.preventDefault();
    const valid = ['2026', 'usama', 'anoosha', '786', 'wedding'];
    if (valid.includes(code.trim().toLowerCase())) {
      setShowInput(false);
      setLocked(false);
    } else {
      // Wrong → shake card, then snap chain back
      setShaking(true);
      setTimeout(() => {
        setShowInput(false);
        setChainPulled(false);
        setCode('');
        setShaking(false);
      }, 800);
    }
  };

  // Cancel password entry → snap chain back
  const handleCancel = (e) => {
    e.stopPropagation();
    setShowInput(false);
    setChainPulled(false);
    setCode('');
  };

  // ---- Scratch logic (unchanged) ----
  const scratch = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 22, 0, Math.PI * 2);
    ctx.fill();
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let clear = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) clear++;
    }
    if ((clear / (imageData.data.length / 4)) * 100 > 40) setIsRevealed(true);
  };

  const coords = (e, c) => {
    const r = c.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (c.width / r.width), y: (e.clientY - r.top) * (c.height / r.height) };
  };

  const onMD = (e) => { setIsScratching(true); scratch(...Object.values(coords(e, canvasRef.current))); };
  const onMM = (e) => { if (isScratching) scratch(...Object.values(coords(e, canvasRef.current))); };
  const onMU = () => setIsScratching(false);
  const onTS = (e) => { if (e.touches[0]) scratch(...Object.values(coords(e.touches[0], canvasRef.current))); };
  const onTM = (e) => { if (e.touches[0]) scratch(...Object.values(coords(e.touches[0], canvasRef.current))); };

  return (
    <div
      className={`canvas-wrapper single-card ${locked ? 'card-locked' : ''} ${shaking ? 'shake-error' : ''}`}
      onClick={locked && !showInput ? handleCardTap : undefined}
    >
      {/* Hidden date content */}
      <div className="scratch-underlayer">
        <Icon size={24} color="var(--primary-rose)" style={{ marginBottom: '6px' }} />
        <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary-rose-dark)', fontSize: '1.25rem', fontWeight: 700, textAlign: 'center', lineHeight: '1.3' }}>
          {title}
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '4px', textAlign: 'center' }}>
          {subtitle}
        </p>
      </div>

      {/* Gold scratch canvas (only after unlock) */}
      {!locked && !isRevealed && (
        <canvas ref={canvasRef} width={width} height={height} className="scratch-canvas"
          onMouseDown={onMD} onMouseMove={onMM} onMouseUp={onMU} onMouseLeave={onMU}
          onTouchStart={onTS} onTouchMove={onTM}
        />
      )}

      {/* ===== LOCK OVERLAY: chains + beating heart ===== */}
      {locked && (
        <div className={`lock-overlay ${chainPulled ? 'chains-pulled' : ''}`}>
          {/* Two diagonal chains */}
          <svg className="chain-svg chain-1" viewBox="0 0 300 16" preserveAspectRatio="none">
            <line x1="0" y1="8" x2="300" y2="8" stroke="#D4AF37" strokeWidth="6" strokeDasharray="12 5" strokeLinecap="round" />
            <line x1="0" y1="8" x2="300" y2="8" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeDasharray="12 5" strokeLinecap="round" />
          </svg>
          <svg className="chain-svg chain-2" viewBox="0 0 300 16" preserveAspectRatio="none">
            <line x1="0" y1="8" x2="300" y2="8" stroke="#D4AF37" strokeWidth="6" strokeDasharray="12 5" strokeLinecap="round" />
            <line x1="0" y1="8" x2="300" y2="8" stroke="rgba(255,255,255,0.25)" strokeWidth="2" strokeDasharray="12 5" strokeLinecap="round" />
          </svg>

          {/* Center beating heart with lock */}
          <div className="heart-lock-badge">
            <div className="heart-lock-icon">
              <Heart size={40} fill="#B75D69" stroke="#7a313c" strokeWidth={1.5} />
              <Lock size={16} className="inner-lock" />
            </div>
            <span className="tap-label">{t?.tapToUnlock || 'TAP TO UNLOCK'}</span>
          </div>
        </div>
      )}

      {/* ===== PASSWORD INPUT ===== */}
      {locked && showInput && (
        <div className="pass-overlay" onClick={(e) => e.stopPropagation()}>
          <button className="pass-close" onClick={handleCancel}><X size={14} /></button>
          <div className="pass-title">
            <KeyRound size={18} color="#B75D69" />
            <span>{t?.enterPasscode || 'Enter Passcode'}</span>
          </div>
          <form onSubmit={handleSubmit} className="pass-form">
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder={t?.passcodePlaceholder || 'Passcode'}
              className="pass-input"
              autoFocus
            />
            <button type="submit" className="pass-btn">{t?.unlockBtn || 'Unlock'}</button>
          </form>
          <p className="pass-hint">{t?.passcodeHint || 'Hint: 2026'}</p>
        </div>
      )}
    </div>
  );
}

export default function ScratchCard({ t }) {
  return (
    <section className="scratch-section reveal-section">
      <h2 className="section-title-script">{t.scratchTitle}</h2>
      <div className="ornament-line">♥</div>

      <div className="scratch-grid">
        <SingleScratchCard icon={Calendar} title={t.nikahTitle} subtitle={t.nikahDate} t={t} />
        <SingleScratchCard icon={Heart} title={t.baraatTitle} subtitle={t.baraatDate} t={t} />
        <SingleScratchCard icon={Sparkles} title={t.valimaTitle} subtitle={t.valimaDate} t={t} />
      </div>
    </section>
  );
}
