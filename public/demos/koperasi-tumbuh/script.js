const MOVETRA='6287886626130';
const menu=document.querySelector('.menu'),nav=document.querySelector('nav');
menu?.addEventListener('click',()=>{nav.classList.toggle('open');menu.textContent=nav.classList.contains('open')?'×':'☰'});
const rupiah=value=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(value);
const calculate=()=>{const loan=Number(document.querySelector('#loan').value),months=Number(document.querySelector('#tenor').value),installment=(loan+(loan*.06))/months;document.querySelector('#loan-label').textContent=rupiah(loan);document.querySelector('#principal').textContent=rupiah(loan);document.querySelector('#months').textContent=`${months} bulan`;document.querySelector('#installment').textContent=rupiah(installment)};
document.querySelector('#loan')?.addEventListener('input',calculate);document.querySelector('#tenor')?.addEventListener('change',calculate);calculate();
document.querySelector('form')?.addEventListener('submit',e=>{e.preventDefault();const need=e.currentTarget.querySelector('select').value;window.open(`https://wa.me/${MOVETRA}?text=${encodeURIComponent(`Halo MOVETRA, saya mencoba demo Koperasi Tumbuh. Kami membutuhkan website koperasi dengan fitur ${need} dan kalkulator pembiayaan.`)}`,'_blank')});
document.querySelector('.wa-float').href=`https://wa.me/${MOVETRA}?text=${encodeURIComponent('Halo MOVETRA, saya butuh website seperti demo Koperasi Tumbuh untuk koperasi kami. Mohon informasi fitur dan harga.')}`;
