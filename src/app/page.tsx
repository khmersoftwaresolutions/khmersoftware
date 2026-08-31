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
};

export default function Home() {
  return <HomePageContent />;
}
