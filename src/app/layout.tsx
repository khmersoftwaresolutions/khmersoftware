import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "KhmerSoftware - Professional Software Solutions in Cambodia",
  description: "Leading software company in Cambodia offering software sales, rental, and custom development services. Affordable solutions for Cambodian businesses.",
  keywords: ["software Cambodia", "custom development", "software rental", "business solutions", "Phnom Penh", "Khmer software"],
  authors: [{ name: "KhmerSoftware" }],
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  openGraph: {
    title: "KhmerSoftware - Professional Software Solutions in Cambodia",
    description: "Leading software company in Cambodia offering software sales, rental, and custom development services.",
    type: "website",
    locale: "en_KH",
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
          src="//js-na2.hs-scripts.com/246983131.js"
        />
        {/* End of HubSpot Embed Code */}
      </body>
    </html>
  );
}
