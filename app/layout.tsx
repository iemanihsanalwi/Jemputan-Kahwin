import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Amiri, Alex_Brush } from "next/font/google";
import { weddingConfig } from "@/config/wedding";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  variable: "--font-amiri",
  display: "swap",
});

const alexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-alex-brush",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#091F18",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://jemputan-kahwin.vercel.app"
  ),
  title: {
    default: weddingConfig.seo.title,
    template: `%s | ${weddingConfig.seo.siteName}`,
  },
  description: weddingConfig.seo.description,
  keywords: weddingConfig.seo.keywords,
  authors: [{ name: weddingConfig.seo.siteName }],
  creator: weddingConfig.seo.siteName,
  openGraph: {
    type: "website",
    locale: "ms_MY",
    url: weddingConfig.seo.url,
    title: weddingConfig.seo.title,
    description: weddingConfig.seo.description,
    siteName: weddingConfig.seo.siteName,
    images: [
      {
        url: "/favicon.svg",
        width: 512,
        height: 512,
        alt: weddingConfig.seo.title,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: weddingConfig.seo.title,
    description: weddingConfig.seo.description,
    images: ["/favicon.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "180x180" },
      { url: "/apple-icon.svg", type: "image/svg+xml", sizes: "180x180" },
    ],
    shortcut: "/favicon.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: weddingConfig.seo.siteName,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data Schema (JSON-LD) for Wedding Event
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SocialEvent",
    name: weddingConfig.event.title,
    description: weddingConfig.event.invitationMessage,
    startDate: `${weddingConfig.event.date}T11:00:00+08:00`,
    endDate: `${weddingConfig.event.date}T16:00:00+08:00`,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: weddingConfig.event.venueName,
      address: {
        "@type": "PostalAddress",
        streetAddress: weddingConfig.event.venueAddress,
        addressLocality: "Port Dickson",
        addressRegion: "Negeri Sembilan",
        postalCode: "71960",
        addressCountry: "MY",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: weddingConfig.event.coordinates.lat,
        longitude: weddingConfig.event.coordinates.lng,
      },
    },
    image: ["/favicon.svg"],
    organizer: {
      "@type": "Person",
      name: `${weddingConfig.couple.groom.fatherName} & ${weddingConfig.couple.bride.fatherName}`,
    },
  };

  return (
    <html
      lang="ms"
      className={`${playfair.variable} ${plusJakarta.variable} ${amiri.variable} ${alexBrush.variable} scroll-smooth`}
    >
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <meta name="apple-mobile-web-app-title" content={weddingConfig.seo.siteName} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-wedding-pattern text-stone-800 antialiased">{children}</body>
    </html>
  );
}
