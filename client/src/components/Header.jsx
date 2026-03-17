'use client';
import Image from 'next/image';
import { SITE } from '@/data';
import { useEffect, useState } from 'react';

export default function Header() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const scrollToMenu = (e) => {
    e.preventDefault();
    document.querySelector('#menu')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header id="hero" className="hero">
      <Image
        src="/images/background.jpg"
        alt="Rust n Gold cafe interior — warm, golden-lit dining room in Ballarat"
        className="hero__bg"
        fill
        priority
        sizes="100vw"
        quality={85}
      />
      <div className="hero__overlay" />

      <div className={`hero__content ${loaded ? 'hero__content--visible' : ''}`}>
        <p className="hero__kicker">Welcome to</p>
        <h1 className="hero__title">
          <span className="hero__title-rust">Rust</span>
          <span className="hero__title-n">n</span>
          <span className="hero__title-gold">Gold</span>
        </h1>
        <p className="hero__tagline">{SITE.tagline}</p>
        <div className="hero__actions">
          <a href="#menu" className="btn btn--primary" onClick={scrollToMenu}>
            Explore Our Menu
          </a>
          <a
            href="https://rust-n-gold.nextorder.com"
            className="btn btn--outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Order Online
          </a>
        </div>
      </div>

      <div className="hero__scroll-indicator">
        <span>Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </header>
  );
}
