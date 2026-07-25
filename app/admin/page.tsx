'use client';

import { defaultSiteContent, SiteContent } from '@/lib/site-content-schema';
import {
  BarChart3, Check, ChevronRight, CircleUserRound, Eye, FileText, Globe2,
  LayoutDashboard, Loader2, LockKeyhole, LogOut, MessageCircle, Package,
  RefreshCcw, Save, Settings, ShieldCheck, Sparkles
} from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

type Section = 'ringkasan' | 'beranda' | 'logistik' | 'harga' | 'faq' | 'kontak';

export default function AdminPage() {
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [section, setSection] = useState<Section>('ringkasan');

  useEffect(() => {
    fetch('/api/admin/content', { cache: 'no-store' }).then(async response => {
      if (!response.ok) return;
      const data = await response.json();
      setRole(data.role);
      setContent(data.content);
    }).finally(() => setLoading(false));
  }, []);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoginError('');
    const form = new FormData(event.currentTarget);
    const response = await fetch('/api/admin/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: form.get('username'), password: form.get('password') }),
    });
    const data = await response.json();
    if (!response.ok) return setLoginError(data.error);
    const contentResponse = await fetch('/api/admin/content', { cache: 'no-store' });
    const contentData = await contentResponse.json();
    setRole(data.role);
    setContent(contentData.content);
  }

  async function save() {
    setSaving(true); setSaved(false);
    const response = await fetch('/api/admin/content', {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(content),
    });
    if (response.ok) {
      const data = await response.json();
      setContent(data.content); setSaved(true);
      setTimeout(() => setSaved(false), 2600);
    }
    setSaving(false);
  }

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setRole('');
  }

  async function resetContent() {
    if (!confirm('Kembalikan seluruh konten website ke versi awal?')) return;
    const response = await fetch('/api/admin/content', { method: 'DELETE' });
    if (response.ok) setContent((await response.json()).content);
  }

  const updateHero = (key: keyof SiteContent['hero'], value: string) =>
    setContent(current => ({ ...current, hero: { ...current.hero, [key]: value } }));
  const updateLogistics = (key: keyof SiteContent['logistics'], value: string) =>
    setContent(current => ({ ...current, logistics: { ...current.logistics, [key]: value } }));
  const updateContact = (key: keyof SiteContent['contact'], value: string) =>
    setContent(current => ({ ...current, contact: { ...current.contact, [key]: value } }));

  if (loading) return <main className="cmsLoading"><Loader2/><span>Menyiapkan panel MOVETRA…</span></main>;

  if (!role) return <main className="cmsLogin">
    <section>
      <div className="cmsBrand"><span>M</span><div><b>MOVETRA</b><small>CONTENT MANAGEMENT</small></div></div>
      <div className="cmsLoginCopy"><span><ShieldCheck/> Area terlindungi</span><h1>Kelola website<br/>dalam satu panel.</h1><p>Masuk sebagai administrator atau editor untuk memperbarui konten website MOVETRA.</p></div>
      <form onSubmit={login}>
        <label>Username<input name="username" autoComplete="username" required placeholder="Masukkan username"/></label>
        <label>Kata sandi<input name="password" type="password" autoComplete="current-password" required placeholder="Masukkan kata sandi"/></label>
        {loginError && <p className="cmsError">{loginError}</p>}
        <button type="submit">Masuk ke panel <ChevronRight/></button>
        <small><LockKeyhole/> Sesi berakhir otomatis setelah 8 jam.</small>
      </form>
    </section>
  </main>;

  const navigation: Array<[Section, string, typeof LayoutDashboard]> = [
    ['ringkasan','Ringkasan',LayoutDashboard],['beranda','Halaman utama',Sparkles],
    ['logistik','Produk logistik',Package],['harga','Harga & paket',FileText],
    ['faq','Pertanyaan umum',MessageCircle],['kontak','Kontak bisnis',Settings],
  ];

  return <main className="cmsShell">
    <aside className="cmsSidebar">
      <div className="cmsBrand light"><span>M</span><div><b>MOVETRA</b><small>ADMINISTRATOR</small></div></div>
      <nav>{navigation.map(([id,label,Icon]) => <button key={id} className={section === id ? 'active' : ''} onClick={() => setSection(id)}><Icon/>{label}</button>)}</nav>
      <div className="cmsAccount"><CircleUserRound/><div><b>{role === 'administrator' ? 'Administrator' : 'Editor'}</b><small>{role === 'administrator' ? 'Akses penuh' : 'Editor konten'}</small></div><button onClick={logout} aria-label="Keluar"><LogOut/></button></div>
    </aside>

    <section className="cmsMain">
      <header><div><small>MOVETRA CMS</small><b>{navigation.find(item => item[0] === section)?.[1]}</b></div><div className="cmsHeaderActions"><a href="/" target="_blank"><Eye/> Lihat website</a><button onClick={save} disabled={saving}>{saving ? <Loader2 className="spin"/> : saved ? <Check/> : <Save/>}{saved ? 'Tersimpan' : 'Simpan perubahan'}</button></div></header>
      <div className="cmsContent">
        {section === 'ringkasan' && <div className="cmsOverview">
          <div className="cmsWelcome"><div><span>Selamat datang kembali</span><h1>Website siap dikelola.</h1><p>Perbarui konten, simpan perubahan, lalu buka preview untuk memeriksa hasilnya.</p></div><Globe2/></div>
          <div className="cmsStats"><article><span><FileText/></span><div><small>Bagian dikelola</small><b>5 bagian utama</b></div></article><article><span><ShieldCheck/></span><div><small>Hak akses</small><b>{role === 'administrator' ? 'Administrator' : 'Editor'}</b></div></article><article><span><BarChart3/></span><div><small>Terakhir diperbarui</small><b>{content.updatedAt ? new Date(content.updatedAt).toLocaleString('id-ID') : 'Belum ada perubahan'}</b></div></article></div>
          <div className="cmsGuide"><h2>Alur publikasi konten</h2><div><span>01</span><p><b>Pilih bagian</b><small>Buka menu konten di sebelah kiri.</small></p><span>02</span><p><b>Perbarui informasi</b><small>Edit teks, harga, tautan, atau kontak.</small></p><span>03</span><p><b>Simpan & periksa</b><small>Buka website untuk memastikan hasilnya.</small></p></div></div>
        </div>}

        {section === 'beranda' && <EditorCard title="Hero halaman utama" description="Konten pertama yang dilihat calon pelanggan.">
          <label>Label kecil<input value={content.hero.eyebrow} onChange={e => updateHero('eyebrow', e.target.value)}/></label>
          <label>Judul utama<input value={content.hero.title} onChange={e => updateHero('title', e.target.value)}/></label>
          <label>Teks sorotan<input value={content.hero.highlight} onChange={e => updateHero('highlight', e.target.value)}/></label>
          <label>Deskripsi<textarea rows={4} value={content.hero.description} onChange={e => updateHero('description', e.target.value)}/></label>
        </EditorCard>}

        {section === 'logistik' && <EditorCard title="Produk logistik" description="Atur presentasi produk dan alamat demo eksternal.">
          <label>Label bagian<input value={content.logistics.eyebrow} onChange={e => updateLogistics('eyebrow', e.target.value)}/></label>
          <label>Judul<input value={content.logistics.title} onChange={e => updateLogistics('title', e.target.value)}/></label>
          <label>Teks sorotan<input value={content.logistics.highlight} onChange={e => updateLogistics('highlight', e.target.value)}/></label>
          <label>Deskripsi<textarea rows={4} value={content.logistics.description} onChange={e => updateLogistics('description', e.target.value)}/></label>
          <label>URL demo<input type="url" value={content.logistics.demoUrl} onChange={e => updateLogistics('demoUrl', e.target.value)}/></label>
        </EditorCard>}

        {section === 'harga' && <div className="cmsEditorStack"><div className="cmsSectionIntro"><h1>Harga & paket</h1><p>Edit nama, harga, deskripsi, serta daftar fasilitas.</p></div>
          {content.pricing.map((item,index) => <EditorCard key={index} title={`Paket ${index + 1}`} description={item.name}>
            <div className="cmsTwo"><label>Nama paket<input value={item.name} onChange={e => setContent(c => ({...c,pricing:c.pricing.map((p,i)=>i===index?{...p,name:e.target.value}:p)}))}/></label><label>Harga<input value={item.price} onChange={e => setContent(c => ({...c,pricing:c.pricing.map((p,i)=>i===index?{...p,price:e.target.value}:p)}))}/></label></div>
            <label>Deskripsi<textarea rows={3} value={item.description} onChange={e => setContent(c => ({...c,pricing:c.pricing.map((p,i)=>i===index?{...p,description:e.target.value}:p)}))}/></label>
            <label>Fasilitas <small>Satu fasilitas per baris</small><textarea rows={5} value={item.features.join('\n')} onChange={e => setContent(c => ({...c,pricing:c.pricing.map((p,i)=>i===index?{...p,features:e.target.value.split('\n').filter(Boolean)}:p)}))}/></label>
          </EditorCard>)}
        </div>}

        {section === 'faq' && <div className="cmsEditorStack"><div className="cmsSectionIntro"><h1>Pertanyaan umum</h1><p>Jawaban yang membantu pelanggan sebelum menghubungi MOVETRA.</p></div>
          {content.faq.map((item,index) => <EditorCard key={index} title={`Pertanyaan ${index + 1}`} description={item.question}>
            <label>Pertanyaan<input value={item.question} onChange={e => setContent(c => ({...c,faq:c.faq.map((f,i)=>i===index?{...f,question:e.target.value}:f)}))}/></label>
            <label>Jawaban<textarea rows={4} value={item.answer} onChange={e => setContent(c => ({...c,faq:c.faq.map((f,i)=>i===index?{...f,answer:e.target.value}:f)}))}/></label>
          </EditorCard>)}
        </div>}

        {section === 'kontak' && <EditorCard title="Kontak bisnis" description="Digunakan oleh tombol WhatsApp dan informasi footer.">
          <label>Nomor WhatsApp <small>Format internasional tanpa tanda +</small><input value={content.contact.whatsapp} onChange={e => updateContact('whatsapp', e.target.value.replace(/\D/g,''))}/></label>
          <label>Nomor yang ditampilkan<input value={content.contact.displayWhatsapp} onChange={e => updateContact('displayWhatsapp', e.target.value)}/></label>
          <label>Email<input type="email" value={content.contact.email} onChange={e => updateContact('email', e.target.value)}/></label>
          <label>Wilayah layanan<input value={content.contact.location} onChange={e => updateContact('location', e.target.value)}/></label>
          {role === 'administrator' && <div className="cmsDanger"><div><b>Reset seluruh konten</b><span>Mengembalikan website ke konten bawaan.</span></div><button onClick={resetContent}><RefreshCcw/> Reset konten</button></div>}
        </EditorCard>}
      </div>
    </section>
  </main>;
}

function EditorCard({title,description,children}:{title:string;description:string;children:React.ReactNode}) {
  return <section className="cmsEditorCard"><div><h2>{title}</h2><p>{description}</p></div><div className="cmsFields">{children}</div></section>;
}

