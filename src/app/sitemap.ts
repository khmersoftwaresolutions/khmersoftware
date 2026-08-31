import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.khmersoftware.com';

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

const STATIC_ROUTES = [
  { path: '', priority: 1.0, changeFrequency: 'daily' as const },
  { path: '/services', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/portfolio', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: '/case-studies', priority: 0.85, changeFrequency: 'weekly' as const },
  { path: '/industries', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/team', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/technologies', priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/careers', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/contact', priority: 0.75, changeFrequency: 'monthly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  // Generate static routes for both languages with alternate links
  for (const route of STATIC_ROUTES) {
    for (const lang of ['en', 'km'] as const) {
      const url = `${BASE_URL}/${lang}${route.path}`;
      const enUrl = `${BASE_URL}/en${route.path}`;
      const kmUrl = `${BASE_URL}/km${route.path}`;

      entries.push({
        url,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            en: enUrl,
            km: kmUrl,
            'x-default': enUrl,
          },
        },
      });
    }
  }

  // Generate service detail pages for both languages with alternate links
  for (const service of SERVICES) {
    for (const lang of ['en', 'km'] as const) {
      const url = `${BASE_URL}/${lang}/services/${service}`;
      const enUrl = `${BASE_URL}/en/services/${service}`;
      const kmUrl = `${BASE_URL}/km/services/${service}`;

      entries.push({
        url,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.85,
        alternates: {
          languages: {
            en: enUrl,
            km: kmUrl,
            'x-default': enUrl,
          },
        },
      });
    }
  }

  return entries;
}
