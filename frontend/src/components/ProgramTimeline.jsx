import React from 'react';
import { Clock } from 'lucide-react';

export default function ProgramTimeline({ t }) {
  const events = [
    {
      title: t.guestArrival,
      time: t.guestArrivalTime,
      desc: t.guestArrivalDesc,
    },
    {
      title: t.weddingCeremony,
      time: t.weddingCeremonyTime,
      desc: t.weddingCeremonyDesc,
    },
    {
      title: t.reception,
      time: t.receptionTime,
      desc: t.receptionDesc,
    },
  ];

  return (
    <section className="timeline-section">
      <Clock size={32} color="var(--primary-rose)" style={{ marginBottom: '0.5rem' }} />
      <h2 className="section-title-script">{t.timelineTitle}</h2>
      <div className="ornament-line">✦</div>

      <div className="timeline-container">
        {events.map((evt, idx) => (
          <div className="timeline-item" key={idx}>
            <div className="timeline-marker"></div>
            <div className="timeline-card">
              <h3 className="timeline-title">{evt.title}</h3>
              <p className="timeline-time">{evt.time}</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{evt.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
