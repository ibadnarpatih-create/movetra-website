const MOVETRA='6287886626130';
const menu=document.querySelector('.menu'),nav=document.querySelector('nav'),toast=document.querySelector('.toast');
menu?.addEventListener('click',()=>{nav.classList.toggle('open');menu.textContent=nav.classList.contains('open')?'×':'☰'});
const notify=()=>{toast?.classList.add('show');setTimeout(()=>toast?.classList.remove('show'),1800)};
document.querySelector('#track-service')?.addEventListener('click',()=>{const code=document.querySelector('#track-code');if(!code.value)code.value='SKM-2026-0142';document.querySelector('#track-result').classList.add('show');notify()});
document.querySelectorAll('.service-choice').forEach(card=>card.addEventListener('click',()=>{document.querySelectorAll('.service-choice').forEach(x=>x.classList.remove('active'));card.classList.add('active');notify()}));
document.querySelector('form')?.addEventListener('submit',e=>{e.preventDefault();const service=e.currentTarget.querySelector('select').value;window.open(`https://wa.me/${MOVETRA}?text=${encodeURIComponent(`Halo MOVETRA, saya mencoba demo Desa Sukamaju dan membutuhkan portal desa dengan layanan ${service}. Mohon informasi pembuatannya.`)}`,'_blank')});
document.querySelector('.wa-float').href=`https://wa.me/${MOVETRA}?text=${encodeURIComponent('Halo MOVETRA, saya butuh website seperti demo Desa Sukamaju untuk kantor desa kami. Mohon informasi fitur dan harga.')}`;
