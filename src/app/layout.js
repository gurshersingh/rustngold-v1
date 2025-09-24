// my-restaurant-app/src/app/layout.jsx
import { SITE } from '@/data';
import '@/app/globals1.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script'; // Import the Script component
import { Pacifico } from 'next/font/google';
import Link from 'next/link';

export const metadata = {
  // Primary SEO
  title: `${SITE.name} Cafe Ballarat – Best Coffee & Restaurant Experience`,
  description: 'Rust n Gold Cafe in Ballarat offers artisan coffee, fresh breakfast, lunch & dinner, and a cozy atmosphere. We are a family-friendly restaurant located at 202 Albert St, Sebastopol, Ballarat, VIC 3356. Perfect for brewed mornings and golden evenings.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.rustngold.com',
  },

  // Open Graph
  openGraph: {
    title: `${SITE.name} - Cafe & Restaurant in Ballarat`,
    description: 'Artisan coffee, fresh meals, and a cozy atmosphere in Ballarat.',
    url: 'https://www.rustngold.com',
    type: 'website',
    images: {
      url: 'https://www.rustngold.com/og-image.png',
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

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'], // Use the weight that you need
  variable: '--font-bebas-neue',
});

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
      "telephone": "+61-478-177-222",
      "servesCuisine": ["Cafe", "Breakfast", "Lunch", "Dinner"],
      "priceRange": "$15",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "07:00",
          "closes": "21:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Saturday", "Sunday"],
          "opens": "08:00",
          "closes": "22:00"
        }
      ]
    }`
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={pacifico.variable}>
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" />
      </head>
      <body suppressHydrationWarning={true}>
        {children}
        <SpeedInsights />
        <Analytics />

        {/* --- Google Tag Integration --- */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17459624697"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17459624697');
          `}
        </Script>
        {/* --- End Google Tag Integration --- */}
        {/* --- New Phone Call Tracking Snippet --- */}
        <Script id="phone-call-tracking">
          {`
            gtag('config', 'AW-17459624697/dAPfCKWdhZ0bEPn1soVB', {
              'phone_conversion_number': '0478 177 222'
            });
          `}
        </Script>
        <footer className="site-footer">
          <div>{SITE.name} — {SITE.tagline}</div>
          <div>© {new Date().getFullYear()} {SITE.name}</div>
        </footer>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd()}
        />

         {/* --- Fixed Call & Order Buttons --- */}
        <Link href="tel:+61478177222" className="fixed-call-button">
          Call Now
        </Link>

        <Link 
          href="https://rust-n-gold.nextorder.com/"
          className="fixed-button fixed-promo-button">
          <span className="promo-click-here">Dine-in Only</span>
          <p className="promo-text">KIDS EAT FREE!</p>
          <p className="promo-subtext">School Holidays Special</p>
          <span className="promo-date">until 5th Oct</span>
        </Link>

        <Link
          href="https://rust-n-gold.nextorder.com/"
          className="fixed-cta-button"
          target="_blank"
          rel="noopener noreferrer"
        >
          Order Online
        </Link>
        {/* --- End Fixed Call & Order Buttons --- */}
      </body>
    </html>
  );
}