import React from 'react'
import { SITE, GALLERY, MENU } from './data'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

function Header() {
  return (
    <header className="hero">
      <div className="hero-content">
        <img src={SITE.logo} alt="Rust n Gold logo" className="logo" onError={(e)=>{e.target.style.display='none'}}/>
        <h1>{SITE.name}</h1>
        <h2 className="tagline">{SITE.tagline}</h2>
        <p className="tagline">{SITE.address}</p>
        <a href="#menu" className="btn">See Menu</a>
      </div>
    </header>
  )
}

function MenuSection() {
  return (
    <section id="menu" className="menu-section">
      <h2>Menu</h2>
      <div className="menu-grid">
        {MENU.map(category => (
          <div key={category.id} className="menu-card">
            <h3>{category.title}</h3>
            <ul>
              {category.items.map((it, i) => (
                <li key={i} className="menu-item">
                  <div>
                    <strong>{it.name}</strong>
                    {it.desc && <div className="desc">{it.desc}</div>}
                  </div>
                  <div className="price">${it.price}</div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}

function Gallery() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: 'ease-in-out',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  }
  return (
    <section className="gallery">
      <h2>Gallery</h2>
      <Slider {...settings}>
        {GALLERY.map((src, i) => (
          <div key={i} className="gallery-item">
            <img src={src} alt={`food-${i}`} />
          </div>
        ))}
      </Slider>
    </section>
  )
}

function Enquiry() {
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

export default function App(){
  return (
    <div className="site">
      <Header />
      <main>
        <MenuSection />
        <Gallery />
        <Enquiry />
      </main>
      <footer className="site-footer">
        <div>{SITE.name} — {SITE.tagline}</div>
        <div>© {new Date().getFullYear()} {SITE.name}</div>
      </footer>
    </div>
  )
}