'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight, BarChart3, Check, ChevronDown, Clock3, Code2, ExternalLink,
  Globe2, Headphones, Layers3, Menu, MessageCircle, Rocket, ShieldCheck,
  ShoppingBag, Sparkles, Workflow, X
} from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { defaultSiteContent, SiteContent } from '@/lib/site-content-schema';

const waLink = (number: string, message = 'Halo MOVETRA, saya ingin konsultasi mengenai kebutuhan digital bisnis saya.') =>
  `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

const services = [
  { icon: Globe2, title: 'Website Perusahaan', text: 'Website profesional untuk memperkuat kredibilitas dan menjelaskan nilai bisnis Anda.' },
  { icon: ShoppingBag, title: 'Toko Online', text: 'Pengalaman belanja yang cepat, nyaman, dan siap mendukung pertumbuhan penjualan.' },
  { icon: Code2, title: 'Aplikasi Web', text: 'Sistem khusus untuk menyederhanakan proses operasional dan pekerjaan berulang.' },
  { icon: Layers3, title: 'Desain UI/UX', text: 'Antarmuka yang jelas, konsisten, dan mudah digunakan oleh pelanggan maupun tim.' },
  { icon: Workflow, title: 'PWA & Integrasi', text: 'Pengalaman menyerupai aplikasi dan integrasi dengan layanan yang bisnis Anda gunakan.' },
  { icon: Headphones, title: 'Pemeliharaan', text: 'Dukungan berkala untuk menjaga keamanan, stabilitas, dan performa produk digital.' },
];

const projects = [
  {
    tag: 'APLIKASI WEB', title: 'Platform Operasional Logistik', tone: 'blue',
    image: '/images/logistics-dashboard.webp', result: 'Satu pusat kendali', metric: 'Real-time',
    problem: 'Data pengiriman tersebar dan sulit dipantau oleh tim.',
    solution: 'Dashboard terpusat untuk status, laporan, dan koordinasi operasional.',
    deliverables: ['Dashboard responsif', 'Manajemen data', 'Laporan operasional']
  },
  {
    tag: 'TOKO ONLINE', title: 'Pengalaman Retail Modern', tone: 'green',
    image: '/demos/loka-store/homeware-hero.webp', result: 'Belanja lebih ringkas', metric: 'Mobile-first',
    problem: 'Katalog sulit dijelajahi dan proses pemesanan terlalu panjang.',
    solution: 'Alur belanja ringkas dengan katalog yang mudah dicari di semua perangkat.',
    deliverables: ['Katalog produk', 'Alur checkout', 'Integrasi WhatsApp']
  },
  {
    tag: 'WEBSITE PERUSAHAAN', title: 'Showcase Properti Premium', tone: 'gold',
    image: '/demos/arka-residence/residence-hero.webp', result: 'Presentasi lebih kuat', metric: 'High-converting',
    problem: 'Informasi proyek belum tersaji dengan meyakinkan bagi calon pembeli.',
    solution: 'Presentasi visual yang menonjolkan lokasi, fasilitas, dan unit unggulan.',
    deliverables: ['Halaman proyek', 'Galeri visual', 'Form prospek']
  },
];

const packages = [
  { name: 'Website Esensial', price: 'Mulai Rp3,5 juta', desc: 'Untuk UMKM dan profesional yang membutuhkan kehadiran digital kredibel.', features: ['Hingga 5 halaman', 'Desain responsif', 'Form & WhatsApp', 'SEO dasar', '2 kali revisi'] },
  { name: 'Website Bisnis', price: 'Mulai Rp7,5 juta', desc: 'Untuk perusahaan yang membutuhkan struktur konten dan fitur lebih lengkap.', featured: true, features: ['Hingga 10 halaman', 'Desain khusus', 'CMS atau katalog', 'Analitik & SEO dasar', '3 kali revisi'] },
  { name: 'Aplikasi Khusus', price: 'Sesuai kebutuhan', desc: 'Untuk sistem operasional, portal, dashboard, atau integrasi khusus.', features: ['Analisis kebutuhan', 'UI/UX terarah', 'Pengembangan bertahap', 'Pengujian pengguna', 'Dukungan peluncuran'] },
];

const faqs = [
  ['Berapa lama proses pengerjaannya?', 'Website sederhana umumnya membutuhkan 2–4 minggu. Website bisnis dan aplikasi khusus menyesuaikan ruang lingkup, kesiapan materi, serta integrasi yang diperlukan.'],
  ['Apakah domain dan hosting sudah termasuk?', 'Kami dapat membantu pengadaan dan konfigurasi domain serta hosting. Biaya layanan pihak ketiga akan disampaikan terpisah agar tetap transparan.'],
  ['Apakah website bisa saya kelola sendiri?', 'Bisa. Jika proyek membutuhkan pembaruan rutin, kami dapat menyediakan panel pengelolaan dan panduan penggunaan untuk tim Anda.'],
  ['Bagaimana sistem revisinya?', 'Jumlah revisi mengikuti paket atau proposal yang disepakati. Setiap tahap akan mendapat persetujuan agar perubahan tetap terarah.'],
  ['Apakah tersedia layanan pemeliharaan?', 'Ya. Pemeliharaan dapat mencakup pembaruan, pencadangan, pemantauan, perbaikan minor, dan dukungan teknis berkala.'],
  ['Bagaimana sistem pembayarannya?', 'Pembayaran dilakukan bertahap sesuai milestone proyek. Rincian termin, hasil kerja, dan jadwal akan tertulis jelas dalam proposal.'],
];

function Logo() {
  return <a href="#" className="logo" aria-label="Beranda MOVETRA">
    <span className="logoMark"><i /><i /><i /></span>
    <span><b>MOVETRA</b><small>DIGITAL SOLUTION</small></span>
  </a>;
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const wa = (message?: string) => waLink(content.contact.whatsapp, message);

  useEffect(() => {
    fetch('/api/content', { cache: 'no-store' })
      .then(response => response.ok ? response.json() : null)
      .then(data => data && setContent(data))
      .catch(() => undefined);
  }, []);

  function submitConsultation(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      'Halo MOVETRA, saya ingin konsultasi proyek.',
      '',
      `Nama: ${data.get('name')}`,
      `Perusahaan: ${data.get('company') || '-'}`,
      `Kontak: ${data.get('contact')}`,
      `Kebutuhan: ${data.get('service')}`,
      `Anggaran: ${data.get('budget')}`,
      `Target: ${data.get('timeline')}`,
      `Cerita singkat: ${data.get('message') || '-'}`,
    ].join('\n');
    window.open(wa(message), '_blank', 'noopener,noreferrer');
  }

  const closeMenu = () => setMenu(false);

  return <main id="main-content">
    <nav className="nav">
      <div className="container navInner">
        <Logo />
        <div className="navLinks">
          <a href="#services">Layanan</a><a href="#logistics-product">Produk Logistik</a>
          <a href="/templates">Template</a><a href="#process">Proses</a><a href="#pricing">Estimasi</a><a href="#about">Tentang</a>
        </div>
        <a className="navCta" href={wa()} target="_blank" rel="noreferrer">Konsultasi Gratis <ArrowRight size={17} /></a>
        <button className="menuBtn" onClick={() => setMenu(!menu)} aria-label={menu ? 'Tutup menu' : 'Buka menu'} aria-expanded={menu}>{menu ? <X /> : <Menu />}</button>
      </div>
      {menu && <div className="mobileMenu">
        <a onClick={closeMenu} href="#services">Layanan</a><a onClick={closeMenu} href="#logistics-product">Produk Logistik</a>
        <a onClick={closeMenu} href="/templates">Template</a><a onClick={closeMenu} href="#process">Proses</a><a onClick={closeMenu} href="#pricing">Estimasi</a>
        <a onClick={closeMenu} href="#about">Tentang</a><a onClick={closeMenu} href="#contact">Kontak</a>
      </div>}
    </nav>

    <section className="hero">
      <div className="orb orb1" /><div className="orb orb2" /><div className="gridBg" />
      <div className="container heroGrid">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="heroCopy">
          <span className="eyebrow"><Sparkles size={15} /> {content.hero.eyebrow}</span>
          <h1>{content.hero.title}<br /><em>{content.hero.highlight}</em></h1>
          <p>{content.hero.description}</p>
          <div className="heroActions">
            <a href={wa()} target="_blank" rel="noreferrer" className="primary">Mulai Konsultasi <ArrowRight size={18} /></a>
            <a href="#work" className="secondary"><span><BarChart3 size={14} /></span>Lihat Contoh Solusi</a>
          </div>
          <div className="trust honestTrust">
            <span><MessageCircle /></span>
            <div><b>Konsultasi awal gratis</b><small>Diskusikan kebutuhan dan arah solusi tanpa komitmen.</small></div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: .94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .15, duration: .8 }} className="heroVisual">
          <div className="heroHuman"><span>Teknologi yang bekerja untuk manusia.</span></div>
          <div className="dashboard"><div className="dashTop"><Logo /><span>● ● ●</span></div><div className="dashBody">
            <div className="side"><i /><i /><i /><i /></div>
            <div className="dashContent"><small>PERFORMA BISNIS</small><h3>Keputusan lebih jelas,<br />dalam satu tampilan.</h3>
              <div className="stats"><b>LIVE</b><span>Business insight</span></div><div className="chart"><i /><i /><i /><i /><i /><i /><i /><i /></div>
            </div>
          </div></div>
          <div className="floatCard result"><span><BarChart3 /></span><div><b>Insight terukur</b><small>Data yang mudah dipahami</small></div></div>
          <div className="floatCard secure"><ShieldCheck /><div><b>Aman & Andal</b><small>Dibangun untuk kebutuhan bisnis</small></div></div>
        </motion.div>
      </div>
      <div className="container metrics capabilityMetrics">
        <div><b>100<span>%</span></b><small>Responsif di Semua Perangkat</small></div>
        <div><b><Sparkles /></b><small>Desain Sesuai Brand</small></div>
        <div><b><Clock3 /></b><small>Proses & Jadwal Transparan</small></div>
        <div><b><Headphones /></b><small>Dukungan Setelah Peluncuran</small></div>
      </div>
    </section>

    <section id="services" className="section services"><div className="container">
      <div className="sectionHead"><div><span className="eyebrow">LAYANAN KAMI</span><h2>Solusi digital untuk<br /><em>setiap tahap bisnis.</em></h2></div>
        <p>Dari validasi ide hingga peluncuran, kami hadir sebagai partner yang membantu bisnis bergerak lebih terarah.</p></div>
      <div className="serviceGrid">{services.map((s, i) => <motion.article key={s.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .06 }}>
        <span className="serviceIcon"><s.icon /></span><h3>{s.title}</h3><p>{s.text}</p>
        <a href={wa(`Halo MOVETRA, saya ingin bertanya tentang layanan ${s.title}.`)} target="_blank" rel="noreferrer">Diskusikan layanan <ArrowRight size={16} /></a>
      </motion.article>)}</div>
    </div></section>

    <section id="about" className="why"><div className="container whyGrid">
      <div className="whyVisual"><div className="codeWindow"><div><i /><i /><i /></div><pre><span>01</span>  movetra.build(&#123;<br /><span>02</span>    strategy: <b>&apos;terarah&apos;</b>,<br /><span>03</span>    design: <b>&apos;bermakna&apos;</b>,<br /><span>04</span>    quality: <b>true</b><br /><span>05</span>  &#125;);</pre></div>
        <div className="launch"><Rocket /><b>Siap untuk bertumbuh</b><small>Strategi, desain, dan teknologi</small></div></div>
      <div><span className="eyebrow light">TENTANG MOVETRA</span><h2>Partner teknologi,<br /><em>bukan sekadar vendor.</em></h2>
        <p className="lead">MOVETRA membantu bisnis di Indonesia menerjemahkan tujuan menjadi pengalaman digital yang jelas, relevan, dan dapat dikembangkan.</p>
        <div className="checks">{['Strategi berangkat dari tujuan bisnis', 'Desain konsisten dengan identitas brand', 'Teknologi modern dan mudah dikembangkan', 'Ruang lingkup serta jadwal transparan', 'Dukungan setelah produk diluncurkan'].map(x => <div key={x}><Check /> {x}</div>)}</div>
        <a className="textLink" href={wa('Halo MOVETRA, saya ingin mengenal proses kerja dan tim MOVETRA lebih lanjut.')} target="_blank" rel="noreferrer">Kenali cara kerja kami <ArrowRight /></a>
      </div>
    </div></section>

    <section id="process" className="section process"><div className="container">
      <div className="center"><span className="eyebrow">PROSES KERJA</span><h2>Dari ide menjadi <em>produk digital.</em></h2><p>Setiap tahap memiliki tujuan, hasil kerja, dan ruang persetujuan yang jelas.</p></div>
      <div className="steps">{[
        ['01', 'Memahami Kebutuhan', 'Menyelaraskan tujuan bisnis, audiens, fitur, anggaran, dan target waktu.'],
        ['02', 'Strategi & Desain', 'Menyusun struktur, alur pengguna, serta arah visual sebelum pengembangan.'],
        ['03', 'Pengembangan', 'Membangun secara bertahap dengan pembaruan progres dan pengujian berkala.'],
        ['04', 'Peluncuran & Dukungan', 'Menyiapkan peluncuran, panduan penggunaan, evaluasi, dan pemeliharaan.']
      ].map((s, i) => <div key={s[0]}><b>{s[0]}</b><span>{i === 0 ? <Sparkles /> : i === 1 ? <Layers3 /> : i === 2 ? <Code2 /> : <Rocket />}</span><h3>{s[1]}</h3><p>{s[2]}</p></div>)}</div>
    </div></section>

    <section id="work" className="section work"><div className="container">
      <div className="sectionHead"><div><span className="eyebrow">CONTOH SOLUSI</span><h2>Rancangan yang berangkat<br />dari <em>masalah nyata.</em></h2></div>
        <p className="workNote">Contoh berikut menggambarkan pendekatan dan ruang lingkup solusi. Detail proyek klien hanya ditampilkan setelah memperoleh izin publikasi.</p></div>
      <div className="projectGrid">{projects.map(p => <article key={p.title} className={p.tone}>
        <div className="mock" style={{ backgroundImage: `url("${p.image}")` }}>
          <div className="projectShade" />
          <div className="projectTop"><span>MOVETRA / CASE STUDY</span><b>{p.metric}</b></div>
          <div className="projectResult"><small>HASIL UTAMA</small><strong>{p.result}</strong><span>Lihat pendekatan <ArrowRight /></span></div>
        </div>
        <small>{p.tag}</small><h3>{p.title}</h3><p><b>Tantangan:</b> {p.problem}</p><p><b>Solusi:</b> {p.solution}</p>
        <div className="deliverables">{p.deliverables.map(item => <span key={item}><Check />{item}</span>)}</div>
        <a aria-label={`Diskusikan ${p.title}`} href={wa(`Halo MOVETRA, saya tertarik dengan solusi seperti ${p.title}.`)} target="_blank" rel="noreferrer"><ArrowRight /></a>
      </article>)}</div>
    </div></section>

    <section id="logistics-product" className="productShowcase"><div className="container productShowcaseGrid">
      <div className="productVisual">
        <div className="productBrowser"><div className="productBrowserTop"><i/><i/><i/><span>movetra logistics workspace</span></div><div className="productBrowserImage"/></div>
        <div className="productLiveBadge"><span>●</span><div><b>LIVE PRODUCT DEMO</b><small>Siap dicoba oleh calon klien</small></div></div>
        <div className="productRoleBadge"><b>2 ROLE</b><span>Driver + Admin</span></div>
      </div>
      <div className="productCopy">
        <span className="eyebrow light">{content.logistics.eyebrow}</span>
        <h2>{content.logistics.title}<br/><em>{content.logistics.highlight}</em></h2>
        <p>{content.logistics.description}</p>
        <div className="verifiedFeatures"><span><Check/> Akun dan alur khusus Driver</span><span><Check/> Akses pemeriksaan untuk Admin</span><span><Check/> Pencatatan perjalanan operasional</span><span><Check/> Laporan dengan waktu Asia/Jakarta</span></div>
        <div className="productActions">
          <a href={content.logistics.demoUrl} target="_blank" rel="noreferrer">Coba produk langsung <ExternalLink/></a>
          <a href={wa('Halo MOVETRA, saya tertarik dengan aplikasi pencatatan perjalanan untuk kebutuhan logistik.')} target="_blank" rel="noreferrer">Diskusikan kebutuhan <ArrowRight/></a>
        </div>
        <div className="productRoadmap"><b>DAPAT DIKEMBANGKAN</b><span>Domain khusus</span><span>Nomor resi & barcode</span><span>Notifikasi status</span><span>Integrasi laporan</span></div>
        <p className="productDisclosure">Versi demo saat ini menggunakan alamat Vercel. Domain khusus dan modul resi merupakan pengembangan lanjutan sesuai kebutuhan bisnis.</p>
      </div>
    </div></section>

    <section id="standar-kerja" className="releasePromise"><div className="container">
      <div className="releasePromiseHead">
        <div><span className="eyebrow">STANDAR KERJA MOVETRA</span><h2>Jelas sejak awal.<br/><em>Aman setelah rilis.</em></h2></div>
        <p>Setiap komitmen proyek dituangkan dalam proposal dan ruang lingkup tertulis—tanpa klaim hasil atau biaya tersembunyi.</p>
      </div>
      <div className="releasePromiseGrid">
        <article><span>01</span><ShieldCheck/><h3>Ruang lingkup tertulis</h3><p>Fitur, jadwal, revisi, biaya pihak ketiga, dan hasil kerja disepakati sebelum pengembangan dimulai.</p></article>
        <article><span>02</span><Workflow/><h3>Progres dapat dipantau</h3><p>Persetujuan dilakukan per tahap agar arah desain dan pengembangan tetap terkendali.</p></article>
        <article><span>03</span><Code2/><h3>Serah terima terarah</h3><p>Akses, aset, source code sesuai perjanjian, serta panduan penggunaan disiapkan saat peluncuran.</p></article>
        <article><span>04</span><Headphones/><h3>Dukungan pascarilis</h3><p>Masa dukungan dan opsi pemeliharaan dijelaskan secara transparan dalam proposal proyek.</p></article>
      </div>
      <div className="releaseProof">
        <div><b>Ingin menilai kualitas sebelum memesan?</b><span>Buka katalog template dan demo aplikasi yang dapat dicoba langsung.</span></div>
        <a href="/templates">Lihat semua demo <ArrowRight/></a>
      </div>
    </div></section>

    <section id="pricing" className="section pricing"><div className="container">
      <div className="center"><span className="eyebrow">ESTIMASI INVESTASI</span><h2>Mulai dengan ruang lingkup<br /><em>yang jelas.</em></h2>
        <p>Estimasi awal membantu perencanaan. Nilai final mengikuti kebutuhan, fitur, konten, integrasi, dan target waktu.</p></div>
      <div className="pricingGrid">{content.pricing.map((pkg, pkgIndex) => <article key={pkg.name} className={pkgIndex === 1 ? 'featured' : ''}>
        {pkgIndex === 1 && <span className="popular">PALING POPULER</span>}<h3>{pkg.name}</h3><strong>{pkg.price}</strong><p>{pkg.description}</p>
        <div>{pkg.features.map(feature => <span key={feature}><Check />{feature}</span>)}</div>
        <a href={wa(`Halo MOVETRA, saya ingin konsultasi paket ${pkg.name}.`)} target="_blank" rel="noreferrer">Minta estimasi <ArrowRight /></a>
      </article>)}</div>
      <p className="pricingDisclaimer">* Harga merupakan estimasi awal, belum termasuk domain, hosting, layanan pihak ketiga, pajak (jika berlaku), dan kebutuhan di luar ruang lingkup. Termin pembayaran, hak penggunaan, serah terima source code, masa dukungan, serta batas revisi dicantumkan dalam proposal final.</p>
    </div></section>

    <section className="section faq"><div className="container faqGrid">
      <div><span className="eyebrow">PERTANYAAN UMUM</span><h2>Hal yang sering<br /><em>ditanyakan.</em></h2><p>Belum menemukan jawaban? Hubungi kami dan ceritakan kebutuhan Anda.</p>
        <a className="primary inlineCta" href={wa('Halo MOVETRA, saya memiliki pertanyaan mengenai layanan MOVETRA.')} target="_blank" rel="noreferrer"><MessageCircle /> Tanya via WhatsApp</a></div>
      <div className="accordion">{content.faq.map((faq, i) => <div className={openFaq === i ? 'open' : ''} key={faq.question}>
        <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} aria-expanded={openFaq === i}><span>{faq.question}</span><ChevronDown /></button>
        {openFaq === i && <p>{faq.answer}</p>}
      </div>)}</div>
    </div></section>

    <section id="contact" className="cta"><div className="container ctaInner">
      <div><span className="eyebrow light">MULAI DARI PERCAKAPAN</span><h2>Punya kebutuhan digital?<br /><em>Mari susun arahnya.</em></h2>
        <p>Isi informasi singkat berikut. Setelah dikirim, WhatsApp akan terbuka dengan rangkuman kebutuhan Anda—tidak ada data yang disimpan di website ini.</p>
        <div className="ctaPoints"><span><Check /> Konsultasi awal gratis</span><span><Check /> Estimasi transparan</span><span><Check /> Tanpa komitmen</span></div>
        <a className="directWa" href={wa()} target="_blank" rel="noreferrer"><MessageCircle /> {content.contact.displayWhatsapp} <ExternalLink /></a>
      </div>
      <form onSubmit={submitConsultation}>
        <h3>Konsultasikan Kebutuhan Anda</h3>
        <div className="formRow"><label>Nama lengkap*<input name="name" required placeholder="Masukkan nama Anda" /></label><label>Nama perusahaan<input name="company" placeholder="Opsional" /></label></div>
        <label>Email / WhatsApp*<input name="contact" required placeholder="Nomor atau email aktif" /></label>
        <div className="formRow"><label>Layanan*<select name="service" required defaultValue=""><option value="" disabled>Pilih layanan</option>{services.map(s => <option key={s.title}>{s.title}</option>)}</select><ChevronDown /></label>
          <label>Kisaran anggaran*<select name="budget" required defaultValue=""><option value="" disabled>Pilih anggaran</option><option>Di bawah Rp5 juta</option><option>Rp5–10 juta</option><option>Rp10–25 juta</option><option>Di atas Rp25 juta</option><option>Belum ditentukan</option></select><ChevronDown /></label></div>
        <label>Target waktu*<select name="timeline" required defaultValue=""><option value="" disabled>Pilih target</option><option>Secepatnya</option><option>1–2 bulan</option><option>3–6 bulan</option><option>Masih fleksibel</option></select><ChevronDown /></label>
        <label>Ceritakan kebutuhan Anda<textarea name="message" rows={4} placeholder="Tujuan, fitur utama, atau kendala yang ingin diselesaikan" /></label>
        <button type="submit">Lanjutkan ke WhatsApp <MessageCircle /></button>
        <small>Dengan melanjutkan, Anda menyetujui <a href="/privacy">Kebijakan Privasi</a> kami.</small>
      </form>
    </div></section>

    <footer><div className="container footerTop">
      <div><Logo /><p>Partner teknologi untuk membangun pengalaman digital yang relevan, mudah digunakan, dan siap mendukung pertumbuhan bisnis.</p></div>
      <div><b>Perusahaan</b><a href="#about">Tentang MOVETRA</a><a href="#work">Contoh Solusi</a><a href="#process">Cara Kerja</a></div>
      <div><b>Layanan</b><a href="#services">Website</a><a href="#services">Aplikasi Web</a><a href="#services">Toko Online</a><a href="#pricing">Estimasi Biaya</a></div>
      <div><b>Hubungi</b><a href={`mailto:${content.contact.email}`}>{content.contact.email}</a><a href={wa()} target="_blank" rel="noreferrer">{content.contact.displayWhatsapp}</a><span>{content.contact.location}</span></div>
    </div><div className="container footerBottom"><span>© 2026 MOVETRA Digital Solution.</span><div><a href="/privacy">Kebijakan Privasi</a><a href="/terms">Syarat Layanan</a></div></div></footer>

    <a className="floatingWa" href={wa()} target="_blank" rel="noreferrer" aria-label="Konsultasi melalui WhatsApp"><MessageCircle /><span>Chat WhatsApp</span></a>
  </main>;
}
