'use client';
import { useState, useEffect } from 'react';
import styles from './PromoModal.module.css';
import Link from 'next/link';
export default function PromoModal() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // ✅ Listen for open event from floating button
    // const handleOpenPromo = () => setVisible(true);
    // window.addEventListener('openPromo', handleOpenPromo);

    // // Optional: auto-show modal once per visit
    // if (!sessionStorage.getItem('promoShown')) {
    //   setTimeout(() => {
    //     setVisible(true);
    //     sessionStorage.setItem('promoShown', 'true');
    //   }, 1500);
    // }
     // ✅ Listen for toggle event
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
        <button className={styles.close} onClick={() => setVisible(false)}>×</button>

        <h2>🎄 Christmas 4-Course Feast – $39.99 per person</h2>
        <p>Celebrate this festive season with a gourmet 4-course menu!<br/>
          Minimum 6 people per booking.
        </p>

        {/* New button to view the image */}
        <Link href="/chrismas.png" target="_blank" rel="noopener noreferrer" className={styles.btn}>
          🎅 View Christmas Menu
        </Link>

        <hr style={{ margin: '2rem 0', opacity: 0.3 }} />

        <h3>🍳 Breakfast Now Served Weekends!</h3>
        <p>From fresh Eggs Benny to our Big Aussie Breakfast — start your day the Rust n Gold way.</p>
        <hr style={{ margin: '2rem 0', opacity: 0.3 }} />

        <h3>🚗 Better Than Uber Eats, DoorDash & Menulog!</h3>
        <p>
        Enjoy <strong>exclusive lower prices</strong> when ordering directly through our website — 
        plus <strong>FREE delivery</strong> on orders over $35 within 5kms.<br/>
        <em>Support local, save more, and get your favourites faster!</em>
        </p>
      </div>
    </div>
  );
}


