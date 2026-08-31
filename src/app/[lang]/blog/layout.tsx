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
    ? 'ប្លុកបច្ចេកវិទ្យា និងវិស្វកម្មសូហ្វវែរ | ខ្មែរសូហ្វវែរ'
    : 'Engineering Blog & Tech Insights | KhmerSoftware';

  const desc = isKm
    ? 'អត្ថបទបច្ចេកទេសស៊ីជម្រៅ គន្លឹះស្ថាបត្យកម្មប្រព័ន្ធ Cloud ការរចនា UI/UX និងមេរៀនជាក់ស្តែងពីក្រុមវិស្វកររបស់យើង។'
    : 'Deep technical articles, software architecture insights, cloud optimization guides, and engineering lessons from the team at KhmerSoftware.';

  return {
    title,
    description: desc,
    alternates: {
      canonical: `${baseUrl}/${lang}/blog`,
      languages: {
        en: `${baseUrl}/en/blog`,
        km: `${baseUrl}/km/blog`,
        'x-default': `${baseUrl}/en/blog`,
      },
    },
    openGraph: {
      title,
      description: desc,
      url: `${baseUrl}/${lang}/blog`,
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

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
