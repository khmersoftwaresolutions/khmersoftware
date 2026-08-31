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
    ? 'អំពីយើង - រឿងរ៉ាវ និងចក្ខុវិស័យរបស់យើង | ខ្មែរសូហ្វវែរ'
    : 'About Us - Our Story, Vision & Mission | KhmerSoftware';

  const desc = isKm
    ? 'ស្វែងយល់អំពីប្រវត្តិ បេសកកម្ម និងចក្ខុវិស័យរបស់ក្រុមហ៊ុន ខ្មែរសូហ្វវែរ ក្នុងការជួយជំរុញការធ្វើបរិវត្តកម្មឌីជីថលនៅកម្ពុជា។'
    : 'Learn about KhmerSoftware, our mission, core values, and our journey building mission-critical software for top businesses and organizations in Cambodia.';

  return {
    title,
    description: desc,
    alternates: {
      canonical: `${baseUrl}/${lang}/about`,
      languages: {
        en: `${baseUrl}/en/about`,
        km: `${baseUrl}/km/about`,
        'x-default': `${baseUrl}/en/about`,
      },
    },
    openGraph: {
      title,
      description: desc,
      url: `${baseUrl}/${lang}/about`,
      type: 'website',
      locale: isKm ? 'km_KH' : 'en_US',
    },
  };
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
