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
    ? 'បច្ចេកវិទ្យា និង Frameworks ដែលយើងប្រើប្រាស់ | ខ្មែរសូហ្វវែរ'
    : 'Technologies & Tech Stack | KhmerSoftware';

  const desc = isKm
    ? 'ស្វែងយល់អំពីបច្ចេកវិទ្យាទំនើបៗដែលយើងប្រើប្រាស់ដូចជា React, Next.js, Flutter, Node.js, Python, AWS, Docker និង Kubernetes។'
    : 'Our modern technology stack: React, Next.js, TypeScript, Flutter, Node.js, Python, AWS, Docker, Kubernetes, and PostgreSQL built for high availability and scale.';

  return {
    title,
    description: desc,
    alternates: {
      canonical: `${baseUrl}/${lang}/technologies`,
      languages: {
        en: `${baseUrl}/en/technologies`,
        km: `${baseUrl}/km/technologies`,
        'x-default': `${baseUrl}/en/technologies`,
      },
    },
    openGraph: {
      title,
      description: desc,
      url: `${baseUrl}/${lang}/technologies`,
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

export default function TechnologiesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
