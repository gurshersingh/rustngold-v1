'use client';

export default function FloatingPromoButton() {
  const handleClick = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('togglePromo'));
  };

  return (
    <a href="#" className="floating-promo" onClick={handleClick}>
      <span className="floating-promo__text">Offers</span>
      <span className="floating-promo__sub">Tap to view</span>
    </a>
  );
}
