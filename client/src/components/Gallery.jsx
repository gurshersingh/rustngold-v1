'use client';
import Image from 'next/image';
import { GALLERY } from '@/data';
import useScrollReveal from '@/hooks/useScrollReveal';

export default function Gallery() {
  const ref = useScrollReveal();

  return (
    <section id="gallery" className="gallery reveal-section" ref={ref}>
      <div className="gallery__inner">
        <span className="section-label">Gallery</span>
        <h2 className="section-heading">A taste of what awaits.</h2>
        <div className="gallery__grid">
          {GALLERY.map((src, i) => (
            <div key={i} className={`gallery__item ${i === 0 || i === 5 ? 'gallery__item--large' : ''}`}>
              <Image
                src={src}
                alt={`Rust n Gold dish ${i + 1} — freshly prepared at our Ballarat restaurant`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="gallery__img"
              />
              <div className="gallery__item-overlay" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
