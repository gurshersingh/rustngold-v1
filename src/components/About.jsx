'use client';
import useScrollReveal from '@/hooks/useScrollReveal';
import { FaCoffee, FaUtensils, FaHeart } from 'react-icons/fa';

const FEATURES = [
  {
    icon: FaCoffee,
    title: 'Artisan Coffee',
    text: 'Premium beans, expertly crafted — your perfect cup, every single time.',
  },
  {
    icon: FaUtensils,
    title: 'Fresh & Local',
    text: 'Seasonal menus crafted with the finest regional ingredients.',
  },
  {
    icon: FaHeart,
    title: 'Family Owned',
    text: 'A warm, welcoming space for families, friends, and the community.',
  },
];

export default function About() {
  const ref = useScrollReveal();

  return (
    <section id="about" className="about reveal-section" ref={ref}>
      <div className="about__inner">
        <div className="about__text">
          <span className="section-label">Our Story</span>
          <h2 className="section-heading">
            Brewed with passion,<br />served with love.
          </h2>
          <p className="about__description">
            Nestled in the heart of Ballarat, Rust n Gold is more than a cafe —
            it&apos;s a gathering place where rich coffee meets hearty meals. From
            golden mornings with artisan brews to cozy evenings with chef-crafted
            mains, every visit is an experience worth savouring.
          </p>
        </div>
        <div className="about__features">
          {FEATURES.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-card__icon">
                <f.icon />
              </div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__text">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
