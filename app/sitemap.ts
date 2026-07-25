import type { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movetra.id';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '', '/templates', '/templates/nusa-coffee', '/templates/arka-property',
    '/templates/selaras-studio', '/templates/loka-store', '/templates/nexora-logistics',
    '/templates/hospital-sentosa', '/templates/desa-sukamaju', '/templates/nawasena-campus',
    '/templates/harapan-bersama', '/templates/koperasi-tumbuh',
    '/privacy', '/terms',
  ];
  return routes.map(route => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : route === '/templates' ? 0.9 : 0.7,
  }));
}
