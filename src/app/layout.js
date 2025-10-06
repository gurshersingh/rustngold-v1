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
import { TrackedCallLink } from '../components/TrackedCallLink';

export const metadata = {
  // ... (metadata remains the same)
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

// Extract the conversion ID and phone number for clarity
const CONVERSION_ID = 'AW-17459624697';

export default function RootLayout({ children }) {
  // Function to handle the call link click and report conversion
  
  return (
        <html lang="en" className={pacifico.variable}>
            <head>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" />
            </head>
            <body suppressHydrationWarning={true}>
                {children}
                <SpeedInsights />
                <Analytics />

                {/* --- Google Ads Global Tag (Keep this!) --- */}
                <Script
                    async
                    src={`https://www.googletagmanager.com/gtag/js?id=${CONVERSION_ID}`}
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${CONVERSION_ID}');
                    `}
                </Script>
                {/* --- End Google Tag Integration --- */}

                <footer className="site-footer">
                    {/* ... footer content ... */}
                </footer>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={jsonLd()}
                />

                {/* --- Fixed Call & Order Buttons --- */}
                {/* USE THE NEW TRACKED COMPONENT HERE */}
                <TrackedCallLink 
                    href="tel:+61478177222" 
                    className="fixed-call-button"
                >
                    Call Now
                </TrackedCallLink>

                {/* The other buttons remain the same (for now) */}
                <Link 
                    href="https://rust-n-gold.nextorder.com/"
                    className="fixed-button fixed-promo-button">
                    <span className="promo-click-here">Use Promo: 10OFF</span>
                    <p className="promo-text">10% Off!</p>
                    <span className="promo-date">Online Order Only</span>
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
