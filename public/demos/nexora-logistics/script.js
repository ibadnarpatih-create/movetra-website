const views=document.querySelectorAll('.view');
const navButtons=document.querySelectorAll('aside nav [data-view]');
const toast=document.querySelector('#toast');
const showToast=(message)=>{toast.textContent=message;toast.classList.add('show');setTimeout(()=>toast.classList.remove('show'),2200)};

navButtons.forEach(button=>button.addEventListener('click',()=>{
  navButtons.forEach(x=>x.classList.remove('active'));
  views.forEach(x=>x.classList.remove('active'));
  button.classList.add('active');
  document.querySelector(`#${button.dataset.view}`).classList.add('active');
  window.scrollTo({top:0,behavior:'smooth'});
}));

const filterButtons=document.querySelectorAll('[data-filter]');
const overviewRows=document.querySelectorAll('#overview .tr[data-status]');
filterButtons.forEach(button=>button.addEventListener('click',()=>{
  filterButtons.forEach(x=>x.classList.remove('active'));
  button.classList.add('active');
  overviewRows.forEach(row=>row.style.display=button.dataset.filter==='all'||row.dataset.status===button.dataset.filter?'grid':'none');
}));

document.querySelector('#search').addEventListener('input',event=>{
  const value=event.target.value.toLowerCase();
  document.querySelectorAll('.tr[data-status]').forEach(row=>row.style.display=row.textContent.toLowerCase().includes(value)?'grid':'none');
});

document.querySelector('#shipmentStatus').addEventListener('change',event=>{
  document.querySelectorAll('#shipments .tr[data-status]').forEach(row=>row.style.display=event.target.value==='all'||row.dataset.status===event.target.value?'grid':'none');
});

document.querySelectorAll('.export').forEach(button=>button.addEventListener('click',()=>showToast('Laporan demo berhasil disiapkan')));

const modal=document.querySelector('#modal');
document.querySelectorAll('.newShipment').forEach(button=>button.addEventListener('click',()=>modal.classList.add('open')));
document.querySelector('.close').addEventListener('click',()=>modal.classList.remove('open'));
modal.addEventListener('click',event=>{if(event.target===modal)modal.classList.remove('open')});
document.querySelector('#shipmentForm').addEventListener('submit',event=>{event.preventDefault();modal.classList.remove('open');event.target.reset();showToast('Pengiriman baru berhasil dibuat')});

document.querySelector('#theme').addEventListener('click',()=>{document.body.classList.toggle('dark');showToast(document.body.classList.contains('dark')?'Mode gelap aktif':'Mode terang aktif')});
document.querySelector('#support').addEventListener('click',()=>showToast('Tim support akan segera menghubungi Anda'));
document.querySelector('#notify').addEventListener('click',()=>document.querySelector('#notification').classList.toggle('open'));
const drawer=document.querySelector('#shipmentDrawer'),drawerShade=document.querySelector('#drawerShade');
const openDrawer=(resi)=>{document.querySelector('#drawerResi').textContent=resi||'NX-240723-081';drawer.classList.add('open');drawerShade.classList.add('open')};
const closeDrawer=()=>{drawer.classList.remove('open');drawerShade.classList.remove('open')};
document.querySelectorAll('.tr[data-status], [data-shipment]').forEach(item=>item.addEventListener('click',event=>{if(event.target.closest('[data-filter]'))return;openDrawer(item.dataset.shipment||item.querySelector('b')?.textContent)}));
document.querySelector('#closeDrawer').addEventListener('click',closeDrawer);
drawerShade.addEventListener('click',closeDrawer);
document.querySelectorAll('[data-view-jump]').forEach(item=>item.addEventListener('click',event=>{event.preventDefault();const target=item.dataset.viewJump;navButtons.forEach(x=>x.classList.toggle('active',x.dataset.view===target));views.forEach(x=>x.classList.toggle('active',x.id===target));window.scrollTo({top:0,behavior:'smooth'})}));
document.querySelector('.workspace').addEventListener('click',()=>showToast('Workspace demo aktif · Enterprise plan'));
document.querySelectorAll('.drawerActions button').forEach(button=>button.addEventListener('click',()=>showToast(`${button.textContent} · simulasi demo`)));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){modal.classList.remove('open');document.querySelector('#notification').classList.remove('open');closeDrawer()}});
