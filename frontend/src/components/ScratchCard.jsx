import React, { useRef, useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function ScratchCard({ t }) {
  const canvasRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratching, setIsScratching] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw gold foil background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#D4AF37');
    gradient.addColorStop(0.3, '#E8C84A');
    gradient.addColorStop(0.5, '#F4E8C1');
    gradient.addColorStop(0.7, '#D4AF37');
    gradient.addColorStop(1, '#AA7C11');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add subtle shine overlay
    const shineGrad = ctx.createRadialGradient(
      canvas.width * 0.3, canvas.height * 0.3, 10,
      canvas.width * 0.5, canvas.height * 0.5, canvas.width * 0.6
    );
    shineGrad.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
    shineGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = shineGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add centered text
    ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
    ctx.font = 'italic 18px "Cormorant Garamond", serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ Scratch to Reveal ✦', canvas.width / 2, canvas.height / 2);
  }, []);

  const scratch = (x, y) => {
    const canvas = canvasRef.current;
    if (!canvas || isRevealed) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 24, 0, Math.PI * 2);
    ctx.fill();

    checkScratchPercentage(canvas, ctx);
  };

  const checkScratchPercentage = (canvas, ctx) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let clearPixels = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) clearPixels++;
    }
    const percentage = (clearPixels / (pixels.length / 4)) * 100;
    if (percentage > 40 && !isRevealed) {
      setIsRevealed(true);
    }
  };

  const getCoords = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handleMouseDown = (e) => {
    setIsScratching(true);
    const { x, y } = getCoords(e, canvasRef.current);
    scratch(x, y);
  };

  const handleMouseMove = (e) => {
    if (!isScratching) return;
    const { x, y } = getCoords(e, canvasRef.current);
    scratch(x, y);
  };

  const handleMouseUp = () => setIsScratching(false);
  const handleMouseLeave = () => setIsScratching(false);

  const handleTouchStart = (e) => {
    e.preventDefault();
    if (!e.touches[0]) return;
    const { x, y } = getCoords(e.touches[0], canvasRef.current);
    scratch(x, y);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (!e.touches[0]) return;
    const { x, y } = getCoords(e.touches[0], canvasRef.current);
    scratch(x, y);
  };

  return (
    <section className="scratch-section reveal-section">
      <h2 className="section-title-script">
        {isRevealed ? t.scratchedHeader : t.scratchTitle}
      </h2>
      <div className="ornament-line">♥</div>

      <div className="canvas-wrapper">
        <div className="scratch-underlayer">
          <Sparkles size={24} color="var(--primary-rose)" style={{ marginBottom: '6px' }} />
          <h3 style={{ fontFamily: 'var(--font-heading)', color: 'var(--primary-rose-dark)', fontSize: '1.5rem', fontWeight: 700 }}>
            {t.weddingDateFull}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '4px' }}>
            {t.weddingTimeFull}
          </p>
        </div>

        {!isRevealed && (
          <canvas
            ref={canvasRef}
            width={400}
            height={180}
            className="scratch-canvas"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          />
        )}
      </div>
    </section>
  );
}
