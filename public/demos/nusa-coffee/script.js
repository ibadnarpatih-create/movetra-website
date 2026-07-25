const menuButton = document.querySelector('.menu');
const navLinks = document.querySelector('.links');

menuButton?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuButton.textContent = open ? '×' : '☰';
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => navLinks?.classList.remove('open'));
});
