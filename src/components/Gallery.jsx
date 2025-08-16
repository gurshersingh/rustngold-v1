"use client";

import Slider from 'react-slick';
import { GALLERY } from '@/data';
import Image from 'next/image';
export default function Gallery() {
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
            <Image 
              src={src} 
              alt={`Delicious Food from our Ballarat Restaurant - ${i+1}`}
              width={300} // <-- Add a width
              height={200} // <-- Add a height  
               />
          </div>
        ))}
      </Slider>
    </section>
  )
}