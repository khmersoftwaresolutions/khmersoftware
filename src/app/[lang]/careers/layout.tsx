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
    ? 'ឱកាសការងារ និងការជ្រើសរើសបុគ្គលិក | ខ្មែរសូហ្វវែរ'
    : 'Careers & Open Positions | KhmerSoftware';

  const desc = isKm
    ? 'ចូលរួមជាមួយក្រុមការងារវិស្វករ និងអ្នករចនាឆ្នើមនៅ ខ្មែរសូហ្វវែរ។ ស្វែងរកឱកាសការងារអភិវឌ្ឍន៍សូហ្វវែរ ប្រាក់បៀវត្សរ៍សមរម្យ និងបរិយាកាសការងារល្អ។'
    : 'Join Cambodia\'s leading software engineering team. Explore open positions for frontend, backend, mobile engineers, DevOps specialists, and UI/UX designers.';

  return {
    title,
    description: desc,
    alternates: {
      canonical: `${baseUrl}/${lang}/careers`,
      languages: {
        en: `${baseUrl}/en/careers`,
        km: `${baseUrl}/km/careers`,
        'x-default': `${baseUrl}/en/careers`,
      },
    },
    openGraph: {
      title,
      description: desc,
      url: `${baseUrl}/${lang}/careers`,
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

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
