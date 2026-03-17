import { SITE } from '@/data';
import '@/app/globals1.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script';
import { Pacifico } from 'next/font/google';

export const metadata = {
  title: `${SITE.name} Cafe Ballarat – Best Coffee & Restaurant Experience`,
  description:
    'Rust n Gold Cafe in Ballarat offers artisan coffee, fresh breakfast, lunch & dinner, and a cozy atmosphere. We are a family-friendly restaurant located at 202 Albert St, Sebastopol, Ballarat, VIC 3356. Perfect for brewed mornings and golden evenings.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.rustngold.com',
  },
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
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} - Cafe & Restaurant in Ballarat`,
    description: 'Artisan coffee, fresh meals, and a cozy atmosphere in Ballarat.',
    images: 'https://rustngold.com/og-image.png',
  },
  icons: {
    icon: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },
};

const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pacifico',
});

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
          "dayOfWeek": ["Monday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "09:00",
          "closes": "21:00"
        }
      ]
    }`,
  };
}

const CONVERSION_ID = 'AW-17459624697';

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={pacifico.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
        />
      </head>
      <body suppressHydrationWarning={true}>
        {children}
        <SpeedInsights />
        <Analytics />

        {/* Google Ads Global Tag */}
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

        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd()} />
      </body>
    </html>
  );
}
