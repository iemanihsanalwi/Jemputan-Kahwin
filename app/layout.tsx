import type { Metadata, Viewport } from "next";
import { weddingConfig } from "@/config/wedding";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAF7F2",
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
        url: weddingConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: weddingConfig.seo.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: weddingConfig.seo.title,
    description: weddingConfig.seo.description,
    images: [weddingConfig.seo.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
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
        addressLocality: "Petaling Jaya",
        addressRegion: "Selangor",
        postalCode: "47820",
        addressCountry: "MY",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: weddingConfig.event.coordinates.lat,
        longitude: weddingConfig.event.coordinates.lng,
      },
    },
    image: [weddingConfig.seo.ogImage],
    organizer: {
      "@type": "Person",
      name: `${weddingConfig.couple.groom.fatherName} & ${weddingConfig.couple.bride.fatherName}`,
    },
  };

  return (
    <html lang="ms" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-wedding-pattern text-stone-800 antialiased">{children}</body>
    </html>
  );
}
