import type { Metadata } from 'next';
import Analytics from './analytics';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://movetra.id';

export const metadata:Metadata={
 metadataBase:new URL(siteUrl),
 title:{default:'MOVETRA — Website & Aplikasi untuk Pertumbuhan Bisnis',template:'%s | MOVETRA'},
 description:'Partner digital untuk merancang website, toko online, dan aplikasi web yang cepat, profesional, dan selaras dengan tujuan bisnis Anda.',
 keywords:['jasa pembuatan website','aplikasi web','web developer Indonesia','desain UI UX','MOVETRA'],
 authors:[{name:'MOVETRA Digital Solution',url:siteUrl}],
 creator:'MOVETRA Digital Solution',
 publisher:'MOVETRA Digital Solution',
 alternates:{canonical:'/'},
 openGraph:{
  title:'MOVETRA — Solusi Digital untuk Bisnis',
  description:'Website dan aplikasi yang dirancang untuk membantu bisnis bergerak lebih terarah.',
  type:'website',locale:'id_ID',url:'/',siteName:'MOVETRA Digital Solution',
  images:[{url:'/og.png',width:1200,height:630,alt:'MOVETRA Digital Solution'}]
 },
 twitter:{card:'summary_large_image',title:'MOVETRA — Solusi Digital untuk Bisnis',description:'Website dan aplikasi yang dirancang untuk membantu bisnis bergerak lebih terarah.',images:['/og.png']},
 robots:{index:true,follow:true,googleBot:{index:true,follow:true,'max-image-preview':'large','max-snippet':-1,'max-video-preview':-1}},
 category:'technology',
 manifest:'/manifest.webmanifest'
};

const organization = {
 '@context':'https://schema.org',
 '@type':'ProfessionalService',
 name:'MOVETRA Digital Solution',
 url:siteUrl,
 email:'hello@movetra.id',
 telephone:'+62-878-8662-6130',
 areaServed:{'@type':'Country',name:'Indonesia'},
 description:'Partner digital untuk website, toko online, UI/UX, dan aplikasi web bisnis.',
 sameAs:[],
 serviceType:['Website Perusahaan','Toko Online','Aplikasi Web','Desain UI/UX','Pemeliharaan Website']
};

export default function RootLayout({children}:{children:React.ReactNode}){
 return <html lang="id"><body>
  <a className="skipLink" href="#main-content">Lewati ke konten utama</a>
  {children}
  <Analytics />
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organization)}} />
 </body></html>
}
