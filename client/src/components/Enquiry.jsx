'use client';
import useScrollReveal from '@/hooks/useScrollReveal';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';

export default function Enquiry() {
  const ref = useScrollReveal();

  return (
    <section id="contact" className="contact reveal-section" ref={ref}>
      <div className="contact__inner">
        <span className="section-label">Get in Touch</span>
        <h2 className="section-heading">Enquiry &amp; Bookings</h2>
        <p className="contact__text">
          Whether it&apos;s a table for two or a private event, drop us a line — we&apos;ll get back to you soon.
        </p>
        <a
          className="btn btn--primary"
          href="mailto:admin@rustngold.com?subject=Enquiry%20from%20website&body=Hi%20Rust%20n%20Gold,%20I%20would%20like%20to%20enquire%20about..."
        >
          Send Enquiry
        </a>

        <div className="contact__socials">
          <Link
            href="https://www.facebook.com/profile.php?id=61579741049135"
            aria-label="Visit us on Facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__social-link"
          >
            <FaFacebook />
          </Link>
          <Link
            href="https://www.instagram.com/rust.n.gold"
            aria-label="Visit us on Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__social-link"
          >
            <FaInstagram />
          </Link>
          <Link
            href="https://www.tiktok.com/@rustngold?_t=ZS-8z3vJNcpXpE&_r=1"
            aria-label="Visit us on TikTok"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__social-link"
          >
            <FaTiktok />
          </Link>
        </div>
      </div>
    </section>
  );
}
