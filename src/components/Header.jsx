'use client';
// src/components/Header.jsx
import Link from 'next/link';
import Image from 'next/image';
import { SITE } from '@/data';
import { FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
export default function Header() {
  
  return (
    <header className="hero-modern">
      <Image
        src="/images/background.jpg"
        alt="A modern and elegant cafe interior at Rust n Gold"
        className="hero-background-image"
        fill
        priority
      />
      <div className="hero-overlay"></div>
      
      <div className="hero-content-modern">
       <h1 className="main-heading">
          <span className="logo-text">
            <span>Rust</span><br className="mobile-only-break" />
            <span className="brittany-n">n</span><br className="mobile-only-break" />
            <span>Gold</span>
          </span>
        </h1>
        <h2 className="sub-heading">
          <span className="brittany-n-tagline">Brewed Mornings.</span>
          <br className="mobile-only-break"/>
          <span  className="brittany-n-tagline">Golden Evenings.</span>
        </h2>
        <Link href="#menu" className="cta-button">
          Explore Our Menu
        </Link>
      </div>
       <div className="contact-details-bar">
          <a
            href="tel:+61478177222"
            className="phone-contact"
            onClick={() => gtag('event', 'conversion', { 'send_to': 'AW-17459624697/dAPfCKWdhZ0bEPn1soVB' })}
  >
            <FaPhone /> 0478 177 222
          </a>
          
          <p className="address-contact">
            <FaMapMarkerAlt /> {SITE.address}
          </p>
        </div>
    </header>
  );
}