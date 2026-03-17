import { SITE } from '@/data';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <h3 className="footer__logo">{SITE.name}</h3>
          <p className="footer__tagline">{SITE.tagline}</p>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#menu">Menu</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contact</h4>
          <ul>
            <li>{SITE.address}</li>
            <li><a href="tel:+61478177222">{SITE.phone}</a></li>
            <li><a href="mailto:admin@rustngold.com">admin@rustngold.com</a></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Follow Us</h4>
          <div className="footer__socials">
            <Link href="https://www.facebook.com/profile.php?id=61579741049135" aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebook /></Link>
            <Link href="https://www.instagram.com/rust.n.gold" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></Link>
            <Link href="https://www.tiktok.com/@rustngold?_t=ZS-8z3vJNcpXpE&_r=1" aria-label="TikTok" target="_blank" rel="noopener noreferrer"><FaTiktok /></Link>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} {SITE.name}. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
