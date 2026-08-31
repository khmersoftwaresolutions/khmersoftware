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
    ? 'ស្នាដៃ និងគម្រោងដែលយើងបានកសាង (Portfolio) | ខ្មែរសូហ្វវែរ'
    : 'Our Portfolio & Case Studies | KhmerSoftware';

  const desc = isKm
    ? 'ស្វែងយល់ពីគម្រោងសូហ្វវែរ វេទិកាហិរញ្ញវត្ថុ កម្មវិធីទូរស័ព្ទ និងប្រព័ន្ធពាណិជ្ជកម្មអេឡិចត្រូនិចដែលយើងបានសាងសង់ដោយជោគជ័យ។'
    : 'Explore our portfolio of successful software products, banking integrations, enterprise portals, and mobile apps delivered for clients across Southeast Asia.';

  return {
    title,
    description: desc,
    alternates: {
      canonical: `${baseUrl}/${lang}/portfolio`,
      languages: {
        en: `${baseUrl}/en/portfolio`,
        km: `${baseUrl}/km/portfolio`,
        'x-default': `${baseUrl}/en/portfolio`,
      },
    },
    openGraph: {
      title,
      description: desc,
      url: `${baseUrl}/${lang}/portfolio`,
      type: 'website',
      locale: isKm ? 'km_KH' : 'en_US',
    },
  };
}

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
