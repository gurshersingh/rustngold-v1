import Link from 'next/link';
import { SITE } from '@/data';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} {SITE.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}