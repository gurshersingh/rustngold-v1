'use client';
import Link from 'next/link';
import styles from './PromoFloating.module.css';

export default function FloatingPromoButton() {
  const handleClick = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('openPromo'));
  };

  return (
    <Link href="#" className={styles.fixedPromoButton} onClick={handleClick}>
      <span className={styles.promoText}>🎄 Offers</span>
      <span className={styles.promoSubtext}>Tap to view</span>
    </Link>
  );
}
