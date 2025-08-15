// my-restaurant-app/src/components/Header.jsx
import Link from 'next/link';
import Image from 'next/image';
import { SITE } from '@/data'; // Use the @ alias for absolute imports

export default function Header() {
  return (
    <header className="hero">
      <div className="hero-left"></div>
      <div className="hero-right"></div>
      <div className="hero-content">
        <Image src={SITE.logo} alt="Rust n Gold logo" className="logo" width={100} height={100} />
        <h1>
          <span className="rust-text">Rust</span>
          <span className="half-rust-gold">n</span>
          <span className="gold-text">Gold</span>
        </h1>
        <h2>
          <span className="rust-text">Brewed mornings.</span>
          <span className="gold-text">Golden evenings.</span>
        </h2>
        <p className="tagline">{SITE.address}</p>
        <Link href="#menu" className="btn">See Menu</Link>
      </div>
    </header>
  )
}