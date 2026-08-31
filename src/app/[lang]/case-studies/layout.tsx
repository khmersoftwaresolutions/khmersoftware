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
    ? 'ករណីសិក្សាជាក់ស្តែង (Case Studies) | ខ្មែរសូហ្វវែរ'
    : 'Client Case Studies & Success Stories | KhmerSoftware';

  const desc = isKm
    ? 'ស្វែងយល់ពីរបៀបដែលយើងបានជួយអតិថិជនដោះស្រាយបញ្ហាបច្ចេកវិទ្យាដ៏ស្មុគស្មាញ និងបង្កើនប្រសិទ្ធភាពអាជីវកម្មរហូតដល់ ៤០%។'
    : 'In-depth case studies on how KhmerSoftware solved critical engineering challenges, reduced cloud costs by 40%, and scaled platforms for top enterprises.';

  return {
    title,
    description: desc,
    alternates: {
      canonical: `${baseUrl}/${lang}/case-studies`,
      languages: {
        en: `${baseUrl}/en/case-studies`,
        km: `${baseUrl}/km/case-studies`,
        'x-default': `${baseUrl}/en/case-studies`,
      },
    },
    openGraph: {
      title,
      description: desc,
      url: `${baseUrl}/${lang}/case-studies`,
      type: 'website',
      locale: isKm ? 'km_KH' : 'en_US',
    },
  };
}

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
