import React, { useState, useEffect, useRef, useCallback } from 'react';
import { translations } from './utils/translations';
import OpeningCover from './components/OpeningCover';
import HeroSection from './components/HeroSection';
import ScratchCard from './components/ScratchCard';
import PhotoSlideshow from './components/PhotoSlideshow';
import CountdownTimer from './components/CountdownTimer';
import ProgramTimeline from './components/ProgramTimeline';
import VenueSection from './components/VenueSection';
import RsvpForm from './components/RsvpForm';
import GuestWishes from './components/GuestWishes';
import FloatingControls from './components/FloatingControls';

export default function App() {
  const [isCoverOpen, setIsCoverOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [lang, setLang] = useState('en');
  const [wishes, setWishes] = useState([]);

  const t = translations[lang];

  // =============================================
  // Scroll Reveal Animation (IntersectionObserver)
  // =============================================
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe all sections with the reveal class
    const revealSections = document.querySelectorAll('.reveal-section');
    revealSections.forEach((el) => observer.observe(el));

    return () => {
      revealSections.forEach((el) => observer.unobserve(el));
    };
  }, [isCoverOpen, lang]);

  // =============================================
  // Fetch guest wishes on mount
  // =============================================
  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const res = await fetch('/api/rsvps');
      const data = await res.json();
      if (data.success) {
        setWishes(data.data);
      }
    } catch (err) {
      console.error('Failed to fetch wishes:', err);
    }
  };

  const handleRsvpSubmitted = (newRsvp) => {
    setWishes((prev) => [newRsvp, ...prev]);
  };

  // =============================================
  // Toggle Language & Direction (English <-> Urdu)
  // =============================================
  const toggleLang = () => {
    const nextLang = lang === 'en' ? 'ur' : 'en';
    setLang(nextLang);
    document.documentElement.dir = translations[nextLang].direction;
  };

  // =============================================
  // Web Audio ambient background music
  // =============================================
  useEffect(() => {
    let audioCtx = null;
    let timer = null;

    if (!isMuted) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [261.63, 329.63, 392.00, 523.25, 440.00, 349.23];
        let idx = 0;

        timer = setInterval(() => {
          if (!audioCtx || audioCtx.state === 'closed') return;
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(notes[idx % notes.length], audioCtx.currentTime);
          gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 2.5);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start();
          osc.stop(audioCtx.currentTime + 2.5);
          idx++;
        }, 1800);
      } catch (e) {
        console.log('Audio Context error:', e);
      }
    }

    return () => {
      if (timer) clearInterval(timer);
      if (audioCtx) audioCtx.close();
    };
  }, [isMuted]);

  const handleOpenCover = () => {
    setIsCoverOpen(true);
    setIsMuted(false);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className={`app-container ${translations[lang].direction}`}>
      {/* Cover Screen */}
      <OpeningCover isOpen={isCoverOpen} onOpen={handleOpenCover} t={t} />

      {/* Floating Action Controls */}
      <FloatingControls
        isMuted={isMuted}
        toggleMute={toggleMute}
        currentLang={lang}
        toggleLang={toggleLang}
        t={t}
      />

      {/* Main Invitation Webpage */}
      <HeroSection t={t} />

      {/* Intro Verse */}
      <section className="intro-section reveal-section">
        <div className="intro-container">
          <div className="ornament-line">♥</div>
          <p className="intro-text">{t.introVerse}</p>
          <div className="ornament-line">♥</div>
        </div>
      </section>

      {/* Scratch Card Section */}
      <ScratchCard t={t} />

      {/* Photo Slideshow - below Scratch Card */}
      <PhotoSlideshow t={t} />

      {/* Countdown Timer */}
      <div className="reveal-section">
        <CountdownTimer t={t} />
      </div>

      {/* Program Timeline */}
      <div className="reveal-section">
        <ProgramTimeline t={t} />
      </div>

      {/* Venue & Location */}
      <div className="reveal-section">
        <VenueSection t={t} />
      </div>

      {/* RSVP Form & Guest Wishes */}
      <div className="reveal-section">
        <RsvpForm t={t} onRsvpSubmitted={handleRsvpSubmitted} />
      </div>
      <div className="reveal-section">
        <GuestWishes wishes={wishes} t={t} />
      </div>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-names">Dr. Usama &amp; Dr. Anoosha</div>
        <p>{t.footerText}</p>
        <p style={{ marginTop: '0.4rem', color: '#9E8B86' }}>
          &copy; Umais Wahab. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
