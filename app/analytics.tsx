'use client';

import Script from 'next/script';
import { useEffect } from 'react';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function Analytics() {
  useEffect(() => {
    if (!GA_ID) return;

    const trackClick = (event: MouseEvent) => {
      const link = (event.target as HTMLElement).closest('a');
      if (!link) return;
      const href = link.getAttribute('href') || '';
      const isConversion = href.includes('wa.me') || href.includes('jne-mobil-km-app');
      if (!isConversion) return;
      window.gtag?.('event', href.includes('wa.me') ? 'whatsapp_click' : 'product_demo_click', {
        link_text: link.textContent?.trim().slice(0, 80),
        link_url: href,
      });
    };

    document.addEventListener('click', trackClick);
    return () => document.removeEventListener('click', trackClick);
  }, []);

  if (!GA_ID) return null;

  return <>
    <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
    <Script id="movetra-analytics" strategy="afterInteractive">
      {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
    </Script>
  </>;
}
