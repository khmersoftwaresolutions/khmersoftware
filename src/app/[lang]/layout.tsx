import type { Metadata } from 'next';

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'km' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isKm = lang === 'km';
  const baseUrl = 'https://www.khmersoftware.com';
  const currentUrl = `${baseUrl}/${lang}`;

  const title = isKm
    ? 'ខ្មែរសូហ្វវែរ (KhmerSoftware) - ដំណោះស្រាយសូហ្វវែរ និងប្រព័ន្ធបច្ចេកវិទ្យាឈានមុខនៅកម្ពុជា'
    : 'KhmerSoftware - Premier Software Development & Enterprise Solutions in Cambodia';

  const description = isKm
    ? 'ក្រុមហ៊ុនអភិវឌ្ឍន៍សូហ្វវែរឈានមុខគេនៅកម្ពុជា ផ្តល់ជូនសេវាកម្មបង្កើតកម្មវិធីទូរស័ព្ទ (Mobile Apps) ប្រព័ន្ធគេហទំព័រ (Web Apps) ប្រព័ន្ធក្លោដ (Cloud AWS) សន្តិសុខសាយប័រ និងការប្រឹក្សាយោបល់ឌីជីថល។'
    : 'Leading software development agency in Cambodia delivering custom enterprise systems, mobile applications (iOS & Android), cloud infrastructure, cybersecurity audits, and digital transformation consulting.';

  return {
    title: {
      default: title,
      template: `%s | KhmerSoftware`,
    },
    description,
    keywords: isKm
      ? [
          'ខ្មែរសូហ្វវែរ',
          'ក្រុមហ៊ុនសូហ្វវែរកម្ពុជា',
          'បង្កើតកម្មវិធីទូរស័ព្ទ',
          'សេវាកម្ម Cloud',
          'សន្តិសុខសាយប័រ',
          'KhmerSoftware',
          'software company Cambodia',
          'custom software Phnom Penh',
        ]
      : [
          'KhmerSoftware',
          'software development Cambodia',
          'custom software Phnom Penh',
          'mobile app development Cambodia',
          'enterprise software solutions',
          'cloud infrastructure AWS Cambodia',
          'cybersecurity audits Cambodia',
          'IT consulting Cambodia',
        ],
    alternates: {
      canonical: currentUrl,
      languages: {
        en: `${baseUrl}/en`,
        km: `${baseUrl}/km`,
        'x-default': `${baseUrl}/en`,
      },
    },
    openGraph: {
      title,
      description,
      url: currentUrl,
      siteName: 'KhmerSoftware',
      locale: isKm ? 'km_KH' : 'en_US',
      alternateLocale: isKm ? 'en_US' : 'km_KH',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: 'KhmerSoftware - Leading Software Solutions in Cambodia',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isKm = lang === 'km';
  const baseUrl = 'https://www.khmersoftware.com';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#organization`,
    name: 'KhmerSoftware',
    alternateName: 'ខ្មែរសូហ្វវែរ',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/og-image.png`,
    description: isKm
      ? 'ក្រុមហ៊ុនអភិវឌ្ឍន៍សូហ្វវែរឈានមុខគេនៅកម្ពុជា ផ្តល់ជូនដំណោះស្រាយសូហ្វវែរសហគ្រាស កម្មវិធីទូរស័ព្ទ ប្រព័ន្ធក្លោដ និងសន្តិសុខព័ត៌មានវិទ្យា។'
      : "Cambodia's leading software development and enterprise IT solutions company.",
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Phnom Penh City Center',
      addressLocality: 'Phnom Penh',
      addressCountry: 'KH',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '11.5564',
      longitude: '104.9282',
    },
    telephone: '+855-12-345-678',
    email: 'contact@khmersoftware.com',
    priceRange: '$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    areaServed: [
      { '@type': 'Country', name: 'Cambodia' },
      { '@type': 'AdministrativeArea', name: 'Southeast Asia' },
      { '@type': 'Country', name: 'Worldwide' },
    ],
    sameAs: [
      'https://www.facebook.com/khmersoftware',
      'https://www.linkedin.com/company/khmersoftware',
      'https://t.me/khmersoftware',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Software Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Custom Software Development',
            url: `${baseUrl}/${lang}/services/custom`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Mobile App Development (iOS & Android)',
            url: `${baseUrl}/${lang}/services/mobile`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Web Application Engineering',
            url: `${baseUrl}/${lang}/services/web`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cloud Infrastructure & AWS Migration',
            url: `${baseUrl}/${lang}/services/cloud`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Cybersecurity & Penetration Testing',
            url: `${baseUrl}/${lang}/services/security`,
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {children}
    </>
  );
}
