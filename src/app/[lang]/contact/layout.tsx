import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isKm = lang === 'km';
  const baseUrl = 'https://www.khmersoftware.com';

  const title = isKm
    ? 'ទាក់ទងមកយើង - ពិគ្រោះយោបល់គម្រោងឥតគិតថ្លៃ | ខ្មែរសូហ្វវែរ'
    : 'Contact Us - Get a Free Consultation & Quote | KhmerSoftware';

  const desc = isKm
    ? 'ទាក់ទងមកកាន់ក្រុមការងារ ខ្មែរសូហ្វវែរ ដើម្បីពិភាក្សាអំពីគម្រោងសូហ្វវែរ កម្មវិធីទូរស័ព្ទ ឬប្រព័ន្ធក្លោដរបស់អ្នក។ ឆ្លើយតបក្នុងរយៈពេល ២៤ ម៉ោង។'
    : 'Contact the KhmerSoftware team to discuss your software development requirements, request a free project quote, or schedule a technical consultation.';

  return {
    title,
    description: desc,
    alternates: {
      canonical: `${baseUrl}/${lang}/contact`,
      languages: {
        en: `${baseUrl}/en/contact`,
        km: `${baseUrl}/km/contact`,
        'x-default': `${baseUrl}/en/contact`,
      },
    },
    openGraph: {
      title,
      description: desc,
      url: `${baseUrl}/${lang}/contact`,
      type: 'website',
      locale: isKm ? 'km_KH' : 'en_US',
      images: [
        {
          url: `${baseUrl}/ogimg.jpeg`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: desc,
      images: [`${baseUrl}/ogimg.jpeg`],
    },
  };
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
