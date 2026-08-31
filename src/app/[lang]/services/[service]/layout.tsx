import type { Metadata } from 'next';

const SERVICES = [
  'custom',
  'mobile',
  'web',
  'cloud',
  'devops',
  'security',
  'strategy',
  'design',
];

const SERVICE_META: Record<
  string,
  {
    en: { title: string; desc: string };
    km: { title: string; desc: string };
  }
> = {
  custom: {
    en: {
      title: 'Custom Software Development in Cambodia',
      desc: 'Bespoke enterprise software systems, internal tools, ERP integrations, and workflow automation tailored to your business in Cambodia.',
    },
    km: {
      title: 'សេវាកម្មបង្កើតសូហ្វវែរផ្ទាល់ខ្លួននៅកម្ពុជា (Custom Software)',
      desc: 'អភិវឌ្ឍន៍ប្រព័ន្ធគ្រប់គ្រងសហគ្រាស កម្មវិធីផ្ទៃក្នុង និងដំណោះស្រាយស្វ័យប្រវត្តិកម្មអាជីវកម្មស្របតាមតម្រូវការជាក់ស្តែង។',
    },
  },
  mobile: {
    en: {
      title: 'Mobile App Development (iOS & Android) in Cambodia',
      desc: 'High-performance native and cross-platform mobile apps for iOS and Android with offline-first architecture, payment gateway integration, and Khmer language support.',
    },
    km: {
      title: 'សេវាកម្មបង្កើតកម្មវិធីទូរស័ព្ទដៃ (Mobile App iOS & Android)',
      desc: 'បង្កើតកម្មវិធីទូរស័ព្ទ iOS និង Android ដែលមានគុណភាពខ្ពស់ គាំទ្រការទូទាត់ Wing/ABA/ACLEDA និងភាសាខ្មែរពេញលេញ។',
    },
  },
  web: {
    en: {
      title: 'Web Application Engineering & SaaS Platforms',
      desc: 'Scalable, high-speed web applications, SaaS platforms, customer portals, and real-time dashboards optimized for SEO and Core Web Vitals.',
    },
    km: {
      title: 'សេវាកម្មបង្កើតគេហទំព័រ និង Web Applications ទំនើប',
      desc: 'បង្កើតប្រព័ន្ធគេហទំព័រ SaaS និង Portal ដែលមានល្បឿនលឿន សុវត្ថិភាពខ្ពស់ និងរចនាសម្ព័ន្ធងាយស្រួលប្រើប្រាស់។',
    },
  },
  cloud: {
    en: {
      title: 'Cloud Infrastructure & AWS Migration Services',
      desc: 'Zero-downtime cloud migration, AWS and GCP architecture design, cloud cost optimization, and high availability systems in Cambodia.',
    },
    km: {
      title: 'សេវាកម្មហេដ្ឋារចនាសម្ព័ន្ធ Cloud & AWS Migration',
      desc: 'ផ្លាស់ប្តូរទិន្នន័យទៅកាន់ប្រព័ន្ធ Cloud (AWS / Google Cloud) ដោយគ្មានការរអាក់រអួល និងជួយសន្សំសំចៃថ្លៃដើមរហូតដល់ ៤០%។',
    },
  },
  devops: {
    en: {
      title: 'DevOps Automation, CI/CD & Kubernetes Services',
      desc: 'Automated CI/CD deployment pipelines, Docker containerization, Kubernetes orchestration, and 24/7 observability stacks.',
    },
    km: {
      title: 'សេវាកម្ម DevOps, CI/CD Pipelines & Kubernetes',
      desc: 'ស្វ័យប្រវត្តិកម្មការដាក់ឱ្យដំណើរការប្រព័ន្ធ (CI/CD) ការគ្រប់គ្រង Container Docker និងការត្រួតពិនិត្យដំណើរការប្រព័ន្ធ ២៤/៧។',
    },
  },
  security: {
    en: {
      title: 'Cybersecurity Audits & Penetration Testing in Cambodia',
      desc: 'Comprehensive penetration testing, vulnerability assessments, code security audits, and compliance readiness (SOC2, ISO27001, NBC guidelines).',
    },
    km: {
      title: 'សេវាកម្មសន្តិសុខសាយប័រ និងការធ្វើតេស្តសុវត្ថិភាព (Cybersecurity)',
      desc: 'ធ្វើតេស្តស្វែងរកចំណុចខ្សោយ (Penetration Testing) ត្រួតពិនិត្យសុវត្ថិភាពកូដ និងធានាការការពារទិន្នន័យតាមស្តង់ដារជាតិ និងអន្តរជាតិ។',
    },
  },
  strategy: {
    en: {
      title: 'IT Strategy & Digital Transformation Consulting',
      desc: 'Strategic technology roadmaps, system architecture reviews, build vs. buy analysis, and executive advisory for business leaders in Cambodia.',
    },
    km: {
      title: 'ប្រឹក្សាយោបល់យុទ្ធសាស្ត្របច្ចេកវិទ្យា (IT Strategy Consulting)',
      desc: 'រៀបចំផែនការយុទ្ធសាស្ត្របច្ចេកវិទ្យា វាយតម្លៃប្រព័ន្ធចាស់ៗ និងជួយថ្នាក់ដឹកនាំធ្វើការសម្រេចចិត្តលើការវិនិយោគបច្ចេកវិទ្យា។',
    },
  },
  design: {
    en: {
      title: 'UI/UX Design & Interactive Prototyping Services',
      desc: 'User research, wireframing, high-fidelity Figma design systems, interactive prototypes, and bilingual (Khmer/English) usability testing.',
    },
    km: {
      title: 'សេវាកម្មរចនា UI/UX Design & Prototyping',
      desc: 'ស្រាវជ្រាវអ្នកប្រើប្រាស់ និងរចនាផ្ទាំងកម្មវិធីទាក់ទាញ ងាយស្រួលប្រើប្រាស់ គាំទ្រភាសាខ្មែរ និងអង់គ្លេសយ៉ាងល្អឥតខ្ចោះ។',
    },
  },
};

export async function generateStaticParams() {
  const params: { lang: string; service: string }[] = [];
  for (const lang of ['en', 'km']) {
    for (const service of SERVICES) {
      params.push({ lang, service });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; service: string }>;
}): Promise<Metadata> {
  const { lang, service } = await params;
  const isKm = lang === 'km';
  const meta = SERVICE_META[service]?.[isKm ? 'km' : 'en'] || {
    title: `${service.toUpperCase()} Services | KhmerSoftware`,
    desc: 'Expert software development and technology solutions by KhmerSoftware Cambodia.',
  };

  const baseUrl = 'https://www.khmersoftware.com';
  const currentUrl = `${baseUrl}/${lang}/services/${service}`;
  const enUrl = `${baseUrl}/en/services/${service}`;
  const kmUrl = `${baseUrl}/km/services/${service}`;

  return {
    title: meta.title,
    description: meta.desc,
    alternates: {
      canonical: currentUrl,
      languages: {
        en: enUrl,
        km: kmUrl,
        'x-default': enUrl,
      },
    },
    openGraph: {
      title: `${meta.title} | KhmerSoftware`,
      description: meta.desc,
      url: currentUrl,
      type: 'website',
      locale: isKm ? 'km_KH' : 'en_US',
      alternateLocale: isKm ? 'en_US' : 'km_KH',
    },
  };
}

export default async function ServiceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string; service: string }>;
}) {
  const { lang, service } = await params;
  const isKm = lang === 'km';
  const baseUrl = 'https://www.khmersoftware.com';
  const meta = SERVICE_META[service]?.[isKm ? 'km' : 'en'];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: isKm ? 'ទំព័រដើម' : 'Home',
        item: `${baseUrl}/${lang}`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: isKm ? 'សេវាកម្ម' : 'Services',
        item: `${baseUrl}/${lang}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: meta?.title || service,
        item: `${baseUrl}/${lang}/services/${service}`,
      },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: meta?.title || service,
    description: meta?.desc,
    provider: {
      '@type': 'ProfessionalService',
      name: 'KhmerSoftware',
      url: baseUrl,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Cambodia',
    },
    url: `${baseUrl}/${lang}/services/${service}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {children}
    </>
  );
}
