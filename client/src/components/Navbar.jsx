'use client';
import { useState, useEffect } from 'react';
import { SITE } from '@/data';
import { TrackedCallLink } from './TrackedCallLink';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Menu', href: '#menu' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <a href="#hero" className="navbar__brand" onClick={(e) => handleClick(e, '#hero')}>
          {SITE.name}
        </a>

        <ul className={`navbar__links ${mobileOpen ? 'navbar__links--open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a href={link.href} onClick={(e) => handleClick(e, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
          <li className="navbar__cta-mobile">
            <a
              href="https://rust-n-gold.nextorder.com"
              target="_blank"
              rel="noopener noreferrer"
              className="navbar__order-btn"
            >
              Order Online
            </a>
          </li>
        </ul>

        <div className="navbar__actions">
          <TrackedCallLink href="tel:+61478177222" className="navbar__call-btn">
            Call Now
          </TrackedCallLink>
          <a
            href="https://rust-n-gold.nextorder.com"
            target="_blank"
            rel="noopener noreferrer"
            className="navbar__order-btn"
          >
            Order Online
          </a>
        </div>

        <button
          className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle navigation menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
