import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "../styles/globals.css";
import "../styles/utilities.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import LanguageBody from "@/components/LanguageBody";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.khmersoftware.com"),
  title: {
    default: "KhmerSoftware - Professional Software Solutions in Cambodia",
    template: "%s | KhmerSoftware",
  },
  description:
    "Leading software company in Cambodia offering custom development, mobile apps, cloud architecture, and enterprise software solutions.",
  keywords: [
    "software Cambodia",
    "custom software development",
    "mobile app development Phnom Penh",
    "cloud migration AWS",
    "cybersecurity Cambodia",
    "KhmerSoftware",
    "enterprise software solutions",
  ],
  authors: [{ name: "KhmerSoftware", url: "https://www.khmersoftware.com" }],
  creator: "KhmerSoftware",
  publisher: "KhmerSoftware",
  alternates: {
    canonical: "https://www.khmersoftware.com/en",
    languages: {
      en: "https://www.khmersoftware.com/en",
      km: "https://www.khmersoftware.com/km",
      "x-default": "https://www.khmersoftware.com/en",
    },
  },
  openGraph: {
    title: "KhmerSoftware - Professional Software Solutions in Cambodia",
    description:
      "Leading software development company in Cambodia offering custom enterprise software, mobile apps, cloud infrastructure, and cybersecurity.",
    url: "https://www.khmersoftware.com",
    siteName: "KhmerSoftware",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "KhmerSoftware - Professional Software Solutions in Cambodia",
    description:
      "Leading software development company in Cambodia offering custom enterprise software, mobile apps, and cloud solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <LanguageBody>
            <Navigation />
            {children}
            <Footer />
          </LanguageBody>
        </LanguageProvider>
        {/* Start of HubSpot Embed Code */}
        <Script
          id="hs-script-loader"
          strategy="afterInteractive"
          src="https://js-na2.hs-scripts.com/246983131.js"
        />
        {/* End of HubSpot Embed Code */}

        {/* Google Sitelinks Structured Data */}
        <Script
          id="google-sitelinks"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "KhmerSoftware",
              url: "https://www.khmersoftware.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.khmersoftware.com/en/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
