import React, { useState } from 'react';
import { Mail, CheckCircle, Send } from 'lucide-react';

export default function RsvpForm({ t, onRsvpSubmitted }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attending: 'yes',
    guestsCount: 1,
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg(null);

    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatusMsg({ type: 'success', text: 'Thank you! Your RSVP and wish have been recorded. ♥' });
        setFormData({ name: '', email: '', attending: 'yes', guestsCount: 1, message: '' });
        if (onRsvpSubmitted) onRsvpSubmitted(data.data);
      } else {
        setStatusMsg({ type: 'error', text: data.error || 'Failed to submit RSVP. Please try again.' });
      }
    } catch (err) {
      console.error(err);
      setStatusMsg({ type: 'error', text: 'Network error. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="rsvp-section" id="rsvp">
      <div style={{ textAlign: 'center' }}>
        <Mail size={32} color="var(--primary-rose)" style={{ marginBottom: '0.5rem' }} />
        <h2 className="section-title-script">{t.rsvpTitle}</h2>
        <div className="ornament-line">✦</div>
      </div>

      <div className="rsvp-container">
        {statusMsg && (
          <div
            style={{
              padding: '1rem',
              borderRadius: '8px',
              marginBottom: '1.5rem',
              backgroundColor: statusMsg.type === 'success' ? '#E8F5E9' : '#FFEBEE',
              color: statusMsg.type === 'success' ? '#2E7D32' : '#C62828',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: 500,
            }}
          >
            <CheckCircle size={18} />
            <span>{statusMsg.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">{t.yourName} *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. John Doe"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t.yourEmail} *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">{t.willAttend} *</label>
            <select
              name="attending"
              value={formData.attending}
              onChange={handleChange}
              className="form-select"
            >
              <option value="yes">{t.attendingYes}</option>
              <option value="no">{t.attendingNo}</option>
              <option value="maybe">{t.attendingMaybe}</option>
            </select>
          </div>

          {formData.attending === 'yes' && (
            <div className="form-group">
              <label className="form-label">{t.guestsCount}</label>
              <select
                name="guestsCount"
                value={formData.guestsCount}
                onChange={handleChange}
                className="form-select"
              >
                <option value={1}>1 Guest</option>
                <option value={2}>2 Guests</option>
                <option value={3}>3 Guests</option>
                <option value={4}>4 Guests</option>
              </select>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">{t.yourMessage}</label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder={t.writeWishes}
              className="form-textarea"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '1rem' }}
          >
            <Send size={18} />
            <span>{loading ? t.sending : t.sendMsg}</span>
          </button>
        </form>
      </div>
    </section>
  );
}
