import React, { useState, useEffect, useCallback } from 'react';

export default function CountdownTimer({ t, targetDate = '2026-11-27T10:00:00', eventTitle }) {
  const calculateTimeLeft = useCallback(() => {
    const target = new Date(targetDate).getTime();
    const now = new Date().getTime();
    const difference = target - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft]);

  return (
    <section className="countdown-section">
      <h2 className="section-title-script" style={{ fontSize: '3.2rem' }}>
        {t.countdownTitle} {eventTitle ? `(${eventTitle})` : ''}
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
