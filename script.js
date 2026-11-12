
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

// Menú para celulares
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menú');
    });
  });
}

// Año automático
const year = document.querySelector('#year');
if (year) {
  year.textContent = new Date().getFullYear();
}

// Barra de progreso
const progress = document.createElement('div');
progress.className = 'scroll-progress';
document.body.appendChild(progress);

function updateProgress() {
  const scrollable =
    document.documentElement.scrollHeight - window.innerHeight;

  const percentage = scrollable > 0
    ? (window.scrollY / scrollable) * 100
    : 0;

  progress.style.width = `${percentage}%`;
}

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

// Animaciones al entrar en pantalla
const sections = document.querySelectorAll('.reveal-section');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  sections.forEach((section) => observer.observe(section));
} else {
  sections.forEach((section) => section.classList.add('visible'));
}
