import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MOVETRA Digital Solution',
    short_name: 'MOVETRA',
    description: 'Website dan aplikasi untuk pertumbuhan bisnis.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fbf9',
    theme_color: '#07964f',
    lang: 'id',
    icons: [],
  };
}
