// my-restaurant-app/src/app/layout.jsx
import { SITE } from '@/data';
import '@/app/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export const metadata = {
  // Primary SEO
  title: `${SITE.name} Cafe Ballarat – Best Coffee & Restaurant Experience`,
  description: 'Rust n Gold Cafe in Ballarat offers artisan coffee, fresh breakfast, lunch & dinner, and a cozy atmosphere. Perfect for brewed mornings and golden evenings.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://rustngold.com',
  },

  // Open Graph
  openGraph: {
    title: `${SITE.name} - Cafe & Restaurant in Ballarat`,
    description: 'Artisan coffee, fresh meals, and a cozy atmosphere in Ballarat.',
    url: 'https://rustngold.com',
    type: 'website',
    images: {
      url: 'https://rustngold.com/og-image.png',
      width: 1200,
      height: 630,
      alt: `${SITE.name} Cafe and Restaurant in Ballarat`,
    },
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} - Cafe & Restaurant in Ballarat`,
    description: 'Artisan coffee, fresh meals, and a cozy atmosphere in Ballarat.',
    images: 'https://rustngold.com/og-image.png',
  },
  icons: {
    icon: '/favicon.png', // This will use your PNG file as the favicon
    apple: '/apple-touch-icon.png', // This will use your Apple Touch Icon
  },
};

// Schema.org Structured Data - as a separate function or component
function jsonLd() {
  return {
    __html: `{
      "@context": "https://schema.org",
      "@type": "CafeOrCoffeeShop",
      "name": "Rust n Gold",
      "image": "https://rustngold.com/og-image.png",
      "@id": "",
      "url": "https://rustngold.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "202 Albert Street, Sebastopol",
        "addressLocality": "Ballarat",
        "addressRegion": "VIC",
        "postalCode": "3350",
        "addressCountry": "AU"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -37.598549073041625,
        "longitude": 143.84092087277085
      },
      "telephone": "+61-4XX-XXX-XXX",
      "servesCuisine": ["Cafe", "Breakfast", "Lunch", "Dinner"],
      "priceRange": "$15"
    }`
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <footer className="site-footer">
          <div>{SITE.name} — {SITE.tagline}</div>
          <div>© {new Date().getFullYear()} {SITE.name}</div>
        </footer>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd()}
        />
      </body>
    </html>
  );
}