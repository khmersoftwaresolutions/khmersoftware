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
    ? 'ឧស្សាហកម្មដែលយើងបម្រើសេវាកម្ម (Industries) | ខ្មែរសូហ្វវែរ'
    : 'Industries We Serve | KhmerSoftware';

  const desc = isKm
    ? 'ដំណោះស្រាយសូហ្វវែរសម្រាប់វិស័យធនាគារ (Fintech) សុខាភិបាល ពាណិជ្ជកម្មអេឡិចត្រូនិច ភស្តុភារ និងស្ថាប័នរដ្ឋនៅកម្ពុជា។'
    : 'Specialized enterprise software solutions for Banking & Fintech, Healthcare, E-Commerce, Logistics, Education, and Government in Cambodia.';

  return {
    title,
    description: desc,
    alternates: {
      canonical: `${baseUrl}/${lang}/industries`,
      languages: {
        en: `${baseUrl}/en/industries`,
        km: `${baseUrl}/km/industries`,
        'x-default': `${baseUrl}/en/industries`,
      },
    },
    openGraph: {
      title,
      description: desc,
      url: `${baseUrl}/${lang}/industries`,
      type: 'website',
      locale: isKm ? 'km_KH' : 'en_US',
    },
  };
}

export default function IndustriesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
