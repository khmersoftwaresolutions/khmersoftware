import type { Metadata } from 'next';
import HomePageContent from '@/components/HomePageContent';

export const metadata: Metadata = {
  title: 'KhmerSoftware - Custom Software & Enterprise Solutions in Cambodia',
  description:
    "Cambodia's premier software development agency. We engineer custom enterprise systems, mobile applications, cloud infrastructure, cybersecurity, and digital solutions for leading businesses.",
  alternates: {
    canonical: 'https://www.khmersoftware.com/en',
    languages: {
      en: 'https://www.khmersoftware.com/en',
      km: 'https://www.khmersoftware.com/km',
      'x-default': 'https://www.khmersoftware.com/en',
    },
  },
  openGraph: {
    title: 'KhmerSoftware - Custom Software & Enterprise Solutions in Cambodia',
    description:
      "Cambodia's premier software development agency. We engineer custom enterprise systems, mobile applications, cloud infrastructure, cybersecurity, and digital solutions for leading businesses.",
    url: 'https://www.khmersoftware.com',
    siteName: 'KhmerSoftware',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: 'https://www.khmersoftware.com/ogimg.jpeg',
        secureUrl: 'https://www.khmersoftware.com/ogimg.jpeg',
        type: 'image/jpeg',
        width: 1200,
        height: 630,
        alt: 'KhmerSoftware - Custom Software & Enterprise Solutions in Cambodia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KhmerSoftware - Custom Software & Enterprise Solutions in Cambodia',
    description:
      "Cambodia's premier software development agency. We engineer custom enterprise systems, mobile applications, cloud infrastructure, cybersecurity, and digital solutions for leading businesses.",
    images: ['https://www.khmersoftware.com/ogimg.jpeg'],
  },
};

export default function Home() {
  return <HomePageContent />;
}
