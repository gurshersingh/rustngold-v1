import { GALLERY } from '@/data';
import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
export default function Enquiry() {
  return (
    <section id="contact" className="enquiry">
      <h2>Enquiry / Bookings</h2>
      <p>If you have a booking or enquiry, drop us a message — we&apos;ll get back to you soon.</p>
      <a className="btn" href="mailto:admin@rustngold.com?subject=Enquiry%20from%20website&body=Hi%20Rust%20n%20Gold,%20I%20would%20like%20to%20enquire%20about...">
        Send Enquiry
      </a>
      <div className="social-links-enquiry">
            <Link
               href="https://www.facebook.com/profile.php?id=61579741049135"
               aria-label="Visit us on Facebook"
               target="_blank"
               rel="noopener noreferrer"
            >
               <FaFacebook size={30} style={{ color: '#1877F2' }} />
            </Link>
            <Link
               href="https://www.instagram.com/rust.n.gold"
               aria-label="Visit us on Instagram"
               target="_blank"
               rel="noopener noreferrer"
            >
               <FaInstagram size={30} style={{ color: '#E4405F' }} />
            </Link>
            <Link
               href="https://www.tiktok.com/@rustngold?_t=ZS-8z3vJNcpXpE&_r=1"
               aria-label="Visit us on TikTok"
               target="_blank"
               rel="noopener noreferrer"
            >
               <FaTiktok size={30} style={{ color: '#000000' }} />
            </Link>
         </div>
    </section>
  )
}