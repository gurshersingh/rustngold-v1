'use client';
import useScrollReveal from '@/hooks/useScrollReveal';
import { SITE } from '@/data';
import { FaMapMarkerAlt, FaPhone, FaClock } from 'react-icons/fa';

const HOURS = [
  { days: 'Monday', time: '9:00 AM – 9:00 PM' },
  { days: 'Tuesday', time: 'Closed' },
  { days: 'Wednesday – Sunday', time: '9:00 AM – 9:00 PM' },
];

export default function Hours() {
  const ref = useScrollReveal();

  return (
    <section className="hours reveal-section" ref={ref}>
      <div className="hours__inner">
        <div className="hours__info">
          <span className="section-label">Visit Us</span>
          <h2 className="section-heading">We&apos;d love to see you.</h2>
          <ul className="hours__list">
            {HOURS.map((h) => (
              <li key={h.days} className="hours__row">
                <span className="hours__days">{h.days}</span>
                <span className="hours__time">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="hours__details">
          <div className="hours__detail-card">
            <FaMapMarkerAlt className="hours__icon" />
            <div>
              <h4>Location</h4>
              <p>{SITE.address}</p>
            </div>
          </div>
          <div className="hours__detail-card">
            <FaPhone className="hours__icon" />
            <div>
              <h4>Phone</h4>
              <a href="tel:+61478177222">{SITE.phone}</a>
            </div>
          </div>
          <div className="hours__detail-card">
            <FaClock className="hours__icon" />
            <div>
              <h4>Delivery</h4>
              <p>Free delivery on orders over $35</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
