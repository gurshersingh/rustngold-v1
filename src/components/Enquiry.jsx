import { GALLERY } from '@/data';
export default function Enquiry() {
  return (
    <section id="contact" className="enquiry">
      <h2>Enquiry / Bookings</h2>
      <p>If you have a booking or enquiry, drop us a message — we&apos;ll get back to you soon.</p>
      <a className="btn" href="mailto:admin@rustngold.com?subject=Enquiry%20from%20website&body=Hi%20Rust%20n%20Gold,%20I%20would%20like%20to%20enquire%20about...">
        Send Enquiry
      </a>
    </section>
  )
}