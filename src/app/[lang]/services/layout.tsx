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
    ? 'សេវាកម្មអភិវឌ្ឍន៍សូហ្វវែរ និងបច្ចេកវិទ្យា | ខ្មែរសូហ្វវែរ'
    : 'Software Engineering & Enterprise Services | KhmerSoftware';

  const desc = isKm
    ? 'ស្វែងយល់ពីសេវាកម្មពេញលេញរបស់យើង៖ ការអភិវឌ្ឍន៍សូហ្វវែរផ្ទាល់ខ្លួន កម្មវិធីទូរស័ព្ទ ក្លោដ AWS សន្តិសុខសាយប័រ និងការប្រឹក្សាយោបល់ IT នៅកម្ពុជា។'
    : 'Explore our full suite of software development services: Custom Software, Mobile Apps, Web Platforms, Cloud Migration, DevOps, Cybersecurity, and IT Strategy in Cambodia.';

  return {
    title,
    description: desc,
    alternates: {
      canonical: `${baseUrl}/${lang}/services`,
      languages: {
        en: `${baseUrl}/en/services`,
        km: `${baseUrl}/km/services`,
        'x-default': `${baseUrl}/en/services`,
      },
    },
    openGraph: {
      title,
      description: desc,
      url: `${baseUrl}/${lang}/services`,
      type: 'website',
      locale: isKm ? 'km_KH' : 'en_US',
    },
  };
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
