'use client';
import { useState, useEffect } from 'react';
import styles from './PromoModal.module.css';
import Link from 'next/link';

export default function PromoModal() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleTogglePromo = () => setVisible(prev => !prev);
    window.addEventListener('togglePromo', handleTogglePromo);

    return () => {
      window.removeEventListener('togglePromo', handleTogglePromo);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={() => setVisible(false)}>
          ×
        </button>

        <h2>🔥 Now Serving Our Viral Kebabs, Rice Bowls & Churros</h2>
        <p>
          We’re excited to now bring you our delicious range of <strong>Kebabs and Rice Bowls</strong>,
          made fresh and packed with flavour.
          <br /><br />
          Don’t miss our most popular and viral favourite —
          the <strong>Butter Chicken Kebab</strong>, loved for its rich flavour and unique twist.
          <br /><br />
          You can also now <strong>build your own Rice Bowl</strong> by choosing your preferred base,
          meat, and dips to create your perfect meal.
        </p>

        <Link
          href="/KebabMenu.png"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.btn}
        >
          🌯 View Kebab & Rice Bowl Menu
        </Link>

        <hr style={{ margin: '2rem 0', opacity: 0.3 }} />

        <h3>🥤 Make It a Meal for Just $1</h3>
        <p>
          Add extra value to your order and <strong>make any kebab a meal for just $1 extra</strong>.
          It’s the perfect way to enjoy more for less.
        </p>
      </div>
    </div>
  );
}