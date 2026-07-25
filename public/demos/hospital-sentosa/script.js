const MOVETRA='6287886626130';
const menu=document.querySelector('.menu'),nav=document.querySelector('nav'),toast=document.querySelector('.toast');
menu?.addEventListener('click',()=>{nav.classList.toggle('open');menu.textContent=nav.classList.contains('open')?'×':'☰'});
const notify=()=>{toast?.classList.add('show');setTimeout(()=>toast?.classList.remove('show'),1800)};
document.querySelector('#find-doctor')?.addEventListener('click',()=>{const specialty=document.querySelector('#doctor-specialty').value;const result=document.querySelector('#doctor-result');const totals={all:3,jantung:1,anak:1,kandungan:1};result.querySelector('b').textContent=`${totals[specialty]} dokter tersedia`;result.classList.add('show');notify()});
document.querySelector('form')?.addEventListener('submit',e=>{e.preventDefault();const name=e.currentTarget.querySelector('input').value;const service=e.currentTarget.querySelector('select').value;window.open(`https://wa.me/${MOVETRA}?text=${encodeURIComponent(`Halo MOVETRA, saya mencoba demo Sentosa Medical Center. Saya ingin bertanya tentang fitur janji dokter untuk ${service}. Nama: ${name}`)}`,'_blank')});
document.querySelector('.wa-float').href=`https://wa.me/${MOVETRA}?text=${encodeURIComponent('Halo MOVETRA, saya butuh website seperti demo Sentosa Medical Center. Mohon informasi harga dan proses pembuatannya.')}`;
