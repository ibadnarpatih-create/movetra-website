'use client';

import { Check, Eye, FileCode2, LayoutDashboard, LayoutTemplate, LogOut, Menu, MoreHorizontal, PackagePlus, Search, Settings, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

const initialTemplates = [
  { name: 'Nusa Coffee', slug: 'nusa-coffee', category: 'Kuliner', price: 'Rp2.500.000', status: 'Published', demo: '/demos/nusa-coffee/index.html' },
  { name: 'Arka Residence', slug: 'arka-residence', category: 'Properti', price: 'Rp3.500.000', status: 'Published', demo: '/demos/arka-residence/index.html' },
  { name: 'Selaras Studio', slug: 'selaras-studio', category: 'Jasa', price: 'Rp2.750.000', status: 'Published', demo: '/demos/selaras-studio/index.html' },
  { name: 'Loka Store', slug: 'loka-store', category: 'Toko Online', price: 'Rp4.500.000', status: 'Published', demo: '/demos/loka-store/index.html' },
  { name: 'Nexora Logistics', slug: 'nexora-logistics', category: 'Aplikasi Web', price: 'Rp12.500.000', status: 'Published', demo: '/demos/nexora-logistics/index.html' },
  { name: 'Sentosa Medical Center', slug: 'hospital-sentosa', category: 'Kesehatan', price: 'Rp4.500.000', status: 'Published', demo: '/demos/hospital-sentosa/index.html' },
  { name: 'Desa Sukamaju', slug: 'desa-sukamaju', category: 'Pemerintahan', price: 'Rp4.000.000', status: 'Published', demo: '/demos/desa-sukamaju/index.html' },
  { name: 'Nawasena University', slug: 'nawasena-campus', category: 'Pendidikan', price: 'Rp4.500.000', status: 'Published', demo: '/demos/nawasena-campus/index.html' },
  { name: 'Harapan Bersama', slug: 'harapan-bersama', category: 'Yayasan', price: 'Rp3.750.000', status: 'Published', demo: '/demos/harapan-bersama/index.html' },
  { name: 'Koperasi Tumbuh', slug: 'koperasi-tumbuh', category: 'Koperasi', price: 'Rp4.500.000', status: 'Published', demo: '/demos/koperasi-tumbuh/index.html' },
];

export default function AdminTemplates() {
  const [query, setQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const visible = initialTemplates.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));

  return <main className="adminShell">
    <aside className="adminSidebar">
      <a href="/" className="adminLogo"><span>M</span><div><b>MOVETRA</b><small>ADMIN PANEL</small></div></a>
      <nav>
        <a href="#"><LayoutDashboard/> Dashboard</a>
        <a href="/admin/templates" className="active"><LayoutTemplate/> Templates</a>
        <a href="#"><ShoppingBag/> Pesanan <i>3</i></a>
        <a href="#"><Settings/> Pengaturan</a>
      </nav>
      <a href="/" className="adminLogout"><LogOut/> Keluar</a>
    </aside>
    <section className="adminMain">
      <header className="adminTop"><button aria-label="Buka menu"><Menu/></button><div><span>MA</span><div><b>Movetra Admin</b><small>Administrator</small></div></div></header>
      <div className="adminContent">
        <div className="adminHeading"><div><span>TEMPLATE LIBRARY</span><h1>Kelola Template</h1><p>Atur katalog, harga, status publikasi, dan tautan demo.</p></div><button onClick={() => setShowForm(!showForm)}><PackagePlus/> Tambah template</button></div>

        {showForm && <form className="quickTemplateForm" onSubmit={(e) => { e.preventDefault(); setShowForm(false); }}>
          <div><b>Template baru</b><small>Form prototipe—penyimpanan database akan dihubungkan pada tahap backend.</small></div>
          <label>Nama template<input required placeholder="Contoh: Rasa Restaurant"/></label>
          <label>Kategori<select defaultValue=""><option value="" disabled>Pilih kategori</option><option>Kuliner</option><option>Properti</option><option>Jasa</option><option>Toko Online</option></select></label>
          <label>Harga<input required placeholder="Rp2.500.000"/></label>
          <button type="submit"><Check/> Simpan draft</button>
        </form>}

        <div className="adminStats">
          <article><span><LayoutTemplate/></span><div><small>Total template</small><b>10</b></div></article>
          <article><span><Eye/></span><div><small>Dipublikasikan</small><b>10</b></div></article>
          <article><span><FileCode2/></span><div><small>Masih draft</small><b>0</b></div></article>
        </div>

        <div className="adminPanel">
          <div className="adminPanelTop"><div><h2>Semua Template</h2><span>{visible.length} item</span></div><label><Search/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Cari template..."/></label></div>
          <div className="adminTable">
            <div className="tableHead"><span>Template</span><span>Kategori</span><span>Harga</span><span>Status</span><span>Demo</span><span/></div>
            {visible.map(item => <div className="tableRow" key={item.slug}>
              <div><span className="templateThumb">{item.name.slice(0, 1)}</span><div><b>{item.name}</b><small>/{item.slug}</small></div></div>
              <span>{item.category}</span><b>{item.price}</b>
              <span className={item.status === 'Published' ? 'statusPublished' : 'statusDraft'}>{item.status}</span>
              <span>{item.demo ? <a href={item.demo} target="_blank"><Eye/> Buka</a> : '—'}</span>
              <button aria-label={`Menu ${item.name}`}><MoreHorizontal/></button>
            </div>)}
          </div>
        </div>
        <p className="adminNote">Panel ini adalah tampilan fondasi. Login aman, database, upload gambar, dan penyimpanan perubahan perlu dihubungkan sebelum digunakan di produksi.</p>
      </div>
    </section>
  </main>;
}
