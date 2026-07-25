'use client';

import { ArrowRight, Check, ExternalLink, Eye, LayoutGrid, MessageCircle, MonitorSmartphone, Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';

const WHATSAPP = '6287886626130';

const templates = [
  {
    id: 'nusa-coffee',
    name: 'Nusa Coffee',
    category: 'Kuliner',
    price: 'Rp2.500.000',
    description: 'Landing page hangat untuk kafe, coffee shop, dan produk minuman lokal.',
    tags: ['Responsif', 'Menu', 'WhatsApp'],
    tone: 'coffee',
    demo: '/demos/nusa-coffee/index.html',
    thumbnail: '/demos/nusa-coffee/cafe-interior.webp',
    featured: true,
  },
  {
    id: 'arka-property',
    name: 'Arka Residence',
    category: 'Properti',
    price: 'Rp3.500.000',
    description: 'Presentasi premium untuk perumahan, apartemen, dan agen properti.',
    tags: ['Galeri', 'Daftar unit', 'Form prospek'],
    tone: 'property',
    demo: '/demos/arka-residence/index.html',
    thumbnail: '/demos/arka-residence/residence-hero.webp',
  },
  {
    id: 'selaras-studio',
    name: 'Selaras Studio',
    category: 'Jasa',
    price: 'Rp2.750.000',
    description: 'Landing page minimal untuk konsultan, agensi, dan jasa profesional.',
    tags: ['Portofolio', 'Layanan', 'Testimoni'],
    tone: 'studio',
    demo: '/demos/selaras-studio/index.html',
    thumbnail: '/demos/selaras-studio/studio-photo.webp',
  },
  {
    id: 'loka-store',
    name: 'Loka Store',
    category: 'Toko Online',
    price: 'Rp4.500.000',
    description: 'Etalase produk modern dengan alur pemesanan langsung ke WhatsApp.',
    tags: ['Katalog', 'Filter', 'Keranjang'],
    tone: 'store',
    demo: '/demos/loka-store/index.html',
    thumbnail: '/demos/loka-store/homeware-hero.webp',
  },
  {
    id: 'nexora-logistics',
    name: 'Nexora Logistics',
    category: 'Aplikasi Web',
    price: 'Rp12.500.000',
    description: 'Dashboard operasional interaktif untuk armada, pengiriman, dan performa tim.',
    tags: ['Dashboard', 'Filter data', 'Laporan'],
    tone: 'logistics',
    demo: '/demos/nexora-logistics/index.html',
    thumbnail: '/images/logistics-dashboard.webp',
    featured: true,
  },
  {
    id: 'hospital-sentosa', name: 'Sentosa Medical Center', category: 'Kesehatan',
    price: 'Rp4.500.000', description: 'Website rumah sakit dengan layanan, jadwal dokter, fasilitas, dan formulir janji.',
    tags: ['Jadwal dokter', 'Layanan medis', 'Janji online'], tone: 'healthcare',
    demo: '/demos/hospital-sentosa/index.html', thumbnail: '/demos/hospital-sentosa/hero.webp', featured: true,
  },
  {
    id: 'desa-sukamaju', name: 'Desa Sukamaju', category: 'Pemerintahan',
    price: 'Rp4.000.000', description: 'Portal kantor desa untuk pelayanan warga, potensi desa, berita, dan transparansi.',
    tags: ['Layanan surat', 'Berita desa', 'Aspirasi warga'], tone: 'village',
    demo: '/demos/desa-sukamaju/index.html', thumbnail: '/demos/desa-sukamaju/hero.webp',
  },
  {
    id: 'nawasena-campus', name: 'Nawasena University', category: 'Pendidikan',
    price: 'Rp4.500.000', description: 'Website sekolah atau kampus untuk program studi, admisi, agenda, dan kehidupan kampus.',
    tags: ['Program studi', 'Admisi', 'Agenda kampus'], tone: 'education',
    demo: '/demos/nawasena-campus/index.html', thumbnail: '/demos/nawasena-campus/hero.webp', featured: true,
  },
  {
    id: 'harapan-bersama', name: 'Harapan Bersama', category: 'Yayasan',
    price: 'Rp3.750.000', description: 'Website yayasan dengan program sosial, dampak, laporan, cerita, dan donasi.',
    tags: ['Program', 'Laporan dampak', 'Donasi'], tone: 'foundation',
    demo: '/demos/harapan-bersama/index.html', thumbnail: '/demos/harapan-bersama/hero.webp',
  },
  {
    id: 'koperasi-tumbuh', name: 'Koperasi Tumbuh', category: 'Koperasi',
    price: 'Rp4.500.000', description: 'Website koperasi modern untuk produk anggota, layanan keuangan, dan transparansi.',
    tags: ['Keanggotaan', 'Produk usaha', 'Transparansi'], tone: 'cooperative',
    demo: '/demos/koperasi-tumbuh/index.html', thumbnail: '/demos/koperasi-tumbuh/hero.webp',
  },
];

const categories = ['Semua', 'Kuliner', 'Properti', 'Jasa', 'Toko Online', 'Aplikasi Web', 'Kesehatan', 'Pemerintahan', 'Pendidikan', 'Yayasan', 'Koperasi'];

function orderLink(templateName: string) {
  const message = `Halo MOVETRA, saya tertarik memesan template "${templateName}". Mohon informasi proses kustomisasinya.`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

function MovetraLogo() {
  return <span className="logo catalogMainLogo">
    <span className="logoMark"><i/><i/><i/></span>
    <span><b>MOVETRA</b><small>DIGITAL SOLUTION</small></span>
  </span>;
}

export default function TemplateCatalog() {
  const [category, setCategory] = useState('Semua');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => templates.filter((item) => {
    const categoryMatch = category === 'Semua' || item.category === category;
    const queryMatch = `${item.name} ${item.category} ${item.description}`.toLowerCase().includes(query.toLowerCase());
    return categoryMatch && queryMatch;
  }), [category, query]);

  return <main className="catalogPage">
    <header className="catalogNav">
      <div className="container catalogNavInner">
        <a href="/" aria-label="Kembali ke beranda MOVETRA"><MovetraLogo/></a>
        <nav className="catalogHeaderLinks">
          <a href="#collection">Koleksi</a>
          <a href="#how">Cara Pesan</a>
          <a href="/#services">Layanan Utama</a>
        </nav>
        <a href={orderLink('katalog MOVETRA')} className="catalogHeaderCta" target="_blank" rel="noreferrer"><MessageCircle/> Konsultasi template</a>
      </div>
    </header>

    <section className="catalogHero">
      <div className="container catalogHeroGrid">
        <div className="catalogHeroCopy">
          <span className="catalogKicker"><Sparkles /> MOVETRA TEMPLATE COLLECTION</span>
          <h1>Website profesional.<br/><em>Tanpa mulai dari nol.</em></h1>
          <p>Pilih desain yang sudah matang, lihat pengalaman lengkapnya, lalu kami ubah menjadi website yang sepenuhnya terasa milik brand Anda.</p>
          <div className="catalogHeroActions">
            <a href="#collection">Jelajahi koleksi <ArrowRight/></a>
            <a href="#how">Lihat cara kerja</a>
          </div>
          <div className="catalogFacts">
            <span><Check /> Kode mandiri</span>
            <span><Check /> Responsif</span>
            <span><Check /> Siap dikustomisasi</span>
          </div>
        </div>
        <div className="catalogHeroVisual" aria-hidden="true">
          <div className="heroPreviewCard heroPreviewMain">
            <div className="previewChrome"><i/><i/><i/><span/></div>
            <div className="previewImage"><span>Featured collection</span><strong>Arka<br/>Residence</strong><small>Property experience</small></div>
          </div>
          <div className="heroPreviewCard heroPreviewSide">
            <div className="previewChrome"><i/><i/><i/></div>
            <div className="previewImage"><strong>Nusa</strong><small>Coffee & stories</small></div>
          </div>
          <div className="heroDeviceBadge"><MonitorSmartphone/><div><b>100% Responsive</b><small>Desktop, tablet & mobile</small></div></div>
          <div className="heroCollectionBadge"><LayoutGrid/><b>10</b><small>curated designs</small></div>
        </div>
      </div>
    </section>

    <section id="collection" className="catalogContent">
      <div className="container">
        <div className="catalogToolbar">
          <div className="searchBox"><Search /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari template..." aria-label="Cari template" /></div>
          <div className="filterLabel"><SlidersHorizontal /> Kategori</div>
          <div className="categoryTabs">{categories.map(item =>
            <button key={item} className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>
          )}</div>
        </div>

        <div className="catalogResult"><div><b>{filtered.length} template</b><span>tersedia dalam katalog</span></div><small>Harga mencakup kustomisasi dasar</small></div>

        <div className="templateGrid">
          {filtered.map(item => <article className="templateCard" key={item.id}>
            <div className={`templateCover ${item.tone}`}>
              {item.featured && <span className="featuredBadge">DEMO TERSEDIA</span>}
              <div className="browserMock">
                <div className="browserBar"><i/><i/><i/><span/></div>
                <div className="browserBody" style={{ backgroundImage: `url("${item.thumbnail}")` }}>
                  <div className="thumbnailShade"/>
                  <div className="miniNav"><i/><span/><span/><span/></div>
                  <div className="thumbnailCopy">
                    <span>{item.category}</span>
                    <strong>{item.name}</strong>
                    <small>{item.description}</small>
                    <button>Explore template <b>→</b></button>
                  </div>
                  <div className="thumbnailIndex">0{templates.indexOf(item) + 1}</div>
                </div>
              </div>
            </div>
            <div className="templateInfo">
              <div className="templateMeta"><span>{item.category}</span><small>Mulai dari</small></div>
              <div className="templateTitle"><h2>{item.name}</h2><strong>{item.price}</strong></div>
              <p>{item.description}</p>
              <div className="templateTags">{item.tags.map(tag => <span key={tag}><Check /> {tag}</span>)}</div>
              <div className="templateActions">
                {item.demo
                  ? <a className="previewBtn" href={item.demo} target="_blank" rel="noreferrer"><Eye /> Live demo <ExternalLink /></a>
                  : <span className="comingBtn">Demo segera hadir</span>}
                <a className="orderBtn" href={`/templates/${item.id}`}>Lihat detail <ArrowRight /></a>
              </div>
            </div>
          </article>)}
        </div>

        {!filtered.length && <div className="emptyCatalog"><Search/><h2>Template belum ditemukan</h2><p>Coba kata kunci atau kategori lain.</p></div>}
      </div>
    </section>

    <section id="how" className="catalogHow">
      <div className="container">
        <span className="catalogKicker">CARA PEMESANAN</span>
        <h2>Dari demo menjadi website milik Anda.</h2>
        <div className="howGrid">
          <div><b>01</b><h3>Pilih template</h3><p>Buka live demo dan tentukan desain yang paling sesuai.</p></div>
          <div><b>02</b><h3>Kirim materi</h3><p>Berikan logo, warna, teks, foto, serta informasi bisnis.</p></div>
          <div><b>03</b><h3>Kami kustomisasi</h3><p>Template disalin menjadi proyek khusus milik bisnis Anda.</p></div>
          <div><b>04</b><h3>Review & tayang</h3><p>Setelah disetujui, website dipasang ke domain Anda.</p></div>
        </div>
      </div>
    </section>
  </main>;
}
