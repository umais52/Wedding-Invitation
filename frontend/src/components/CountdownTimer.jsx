import React, { useState, useEffect } from 'react';

export default function CountdownTimer({ t }) {
  const targetDate = new Date('2026-11-30T10:20:00').getTime();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="countdown-section">
      <h2 className="section-title-script" style={{ fontSize: '3.2rem' }}>
        {t.countdownTitle}
      </h2>
      <div className="ornament-line">✦</div>

      <div className="countdown-grid">
        <div className="countdown-box">
          <div className="countdown-num">{String(timeLeft.days).padStart(2, '0')}</div>
          <div className="countdown-label">{t.days}</div>
        </div>
        <div className="countdown-box">
          <div className="countdown-num">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="countdown-label">{t.hours}</div>
        </div>
        <div className="countdown-box">
          <div className="countdown-num">{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className="countdown-label">{t.minutes}</div>
        </div>
        <div className="countdown-box">
          <div className="countdown-num">{String(timeLeft.seconds).padStart(2, '0')}</div>
          <div className="countdown-label">{t.seconds}</div>
        </div>
      </div>
    </section>
  );
}
