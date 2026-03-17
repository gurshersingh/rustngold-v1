'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PromoModal() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleTogglePromo = () => setVisible((prev) => !prev);
    window.addEventListener('togglePromo', handleTogglePromo);
    return () => window.removeEventListener('togglePromo', handleTogglePromo);
  }, []);

  if (!visible) return null;

  return (
    <div className="promo-overlay" onClick={() => setVisible(false)}>
      <div className="promo-modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="promo-modal__close"
          onClick={() => setVisible(false)}
          aria-label="Close promotion"
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#999',
            lineHeight: 1,
          }}
        >
          &times;
        </button>

        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', letterSpacing: '1px', marginBottom: '1rem' }}>
          Now Serving Our Viral Kebabs, Rice Bowls &amp; Churros
        </h2>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
          We&apos;re excited to now bring you our delicious range of <strong>Kebabs and Rice Bowls</strong>,
          made fresh and packed with flavour.
          <br /><br />
          Don&apos;t miss our most popular and viral favourite —
          the <strong>Butter Chicken Kebab</strong>, loved for its rich flavour and unique twist.
          <br /><br />
          You can also now <strong>build your own Rice Bowl</strong> by choosing your preferred base,
          meat, and dips to create your perfect meal.
        </p>

        <Link
          href="/KebabMenu.png"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn--primary"
          style={{ display: 'inline-block', marginBottom: '1.5rem' }}
        >
          View Kebab &amp; Rice Bowl Menu
        </Link>

        <hr style={{ margin: '1.5rem 0', opacity: 0.15 }} />

        <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', letterSpacing: '1px', marginBottom: '0.5rem' }}>
          Make It a Meal for Just $1
        </h3>
        <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.7', fontSize: '0.95rem' }}>
          Add extra value to your order and <strong>make any kebab a meal for just $1 extra</strong>.
          It&apos;s the perfect way to enjoy more for less.
        </p>
      </div>
    </div>
  );
}
