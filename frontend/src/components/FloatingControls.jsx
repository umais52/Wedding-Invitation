import React from 'react';
import { Volume2, VolumeX, Globe } from 'lucide-react';

export default function FloatingControls({ isMuted, toggleMute, currentLang, toggleLang, t }) {
  return (
    <>
      {/* Sound Mute / Unmute Button (Top-Right) */}
      <button
        className="floating-sound-toggle"
        onClick={toggleMute}
        title={isMuted ? "Unmute Background Music" : "Mute Background Music"}
        aria-label="Toggle Sound"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Language Switcher (Bottom-Left) */}
      <button
        className="floating-lang-toggle"
        onClick={toggleLang}
        aria-label="Toggle Language"
      >
        <Globe size={16} color="var(--primary-rose)" />
        <span>{t.languageName}</span>
      </button>
    </>
  );
}
