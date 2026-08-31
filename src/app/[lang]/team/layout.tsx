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
    ? 'ក្រុមការងារ និងអ្នកដឹកនាំរបស់យើង | ខ្មែរសូហ្វវែរ'
    : 'Our Leadership & Engineering Team | KhmerSoftware';

  const desc = isKm
    ? 'ជួបជាមួយក្រុមវិស្វករ អ្នករចនា និងអ្នកគ្រប់គ្រងបច្ចេកវិទ្យាដែលមានបទពិសោធន៍ខ្ពស់នៅក្រុមហ៊ុន ខ្មែរសូហ្វវែរ។'
    : 'Meet the engineers, architects, managers, and designers powering digital transformation and custom software at KhmerSoftware in Cambodia.';

  return {
    title,
    description: desc,
    alternates: {
      canonical: `${baseUrl}/${lang}/team`,
      languages: {
        en: `${baseUrl}/en/team`,
        km: `${baseUrl}/km/team`,
        'x-default': `${baseUrl}/en/team`,
      },
    },
    openGraph: {
      title,
      description: desc,
      url: `${baseUrl}/${lang}/team`,
      type: 'website',
      locale: isKm ? 'km_KH' : 'en_US',
    },
  };
}

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
