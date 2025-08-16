// my-restaurant-app/src/components/Header.jsx
import Link from 'next/link';
import Image from 'next/image';
import { SITE } from '@/data'; // Use the @ alias for absolute imports

export default function Header() {
  return (
    <header className="hero">
        <Image
          src="/images/background.jpg"
          alt="Delicious food at Rust n Gold"
          className="hero-right"
          fill
          priority
        />
      <div className="hero-content">
        <Image src={SITE.logo} alt="Rust n Gold Cafe and Restaurant Logo" className="logo" width={100} height={100} />
        <h1>
          <span className="rust-text">Rust</span>
          <span className="half-rust-gold">n</span>
          <span className="gold-text">Gold</span>
        </h1>
        <h2>
          <span className="rust-text">Brewed mornings.</span>
          <span className="gold-text">Golden evenings.</span>
        </h2>
        <p>
          <span className="tagline">Cafe & Restaurant in Ballarat</span>
        </p>
        <p className="tagline">{SITE.address}</p>
        <Link href="#menu" className="btn">Delicious Menu in Ballarat</Link>
      </div>
    </header>
  )
}