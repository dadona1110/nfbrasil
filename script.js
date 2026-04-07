/* =====================================================
   NF BRASIL – script.js
   ===================================================== */

/* ── Elementos ───────────────────────────────────────── */
const navbar        = document.getElementById('navbar');
const burgerBtn     = document.getElementById('burger-btn');
const burgerMenu    = document.getElementById('burger-menu');
const burgerOverlay = document.getElementById('burger-overlay');
const burgerClose   = document.getElementById('burger-close');
const backToTop     = document.getElementById('back-to-top');

/* ── Burger Menu: abrir / fechar ─────────────────────── */
function openMenu() {
  burgerMenu.classList.add('open');
  burgerOverlay.classList.add('open');
  burgerBtn.classList.add('open');
  burgerBtn.setAttribute('aria-expanded', 'true');
  burgerMenu.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  burgerMenu.classList.remove('open');
  burgerOverlay.classList.remove('open');
  burgerBtn.classList.remove('open');
  burgerBtn.setAttribute('aria-expanded', 'false');
  burgerMenu.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

burgerBtn.addEventListener('click', () => {
  const isOpen = burgerMenu.classList.contains('open');
  isOpen ? closeMenu() : openMenu();
});

burgerClose.addEventListener('click', closeMenu);
burgerOverlay.addEventListener('click', closeMenu);

/* Fechar com ESC */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && burgerMenu.classList.contains('open')) closeMenu();
});

/* Fechar ao clicar em link interno do menu */
document.querySelectorAll('.burger-nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

/* ── Link ativo no burger menu ───────────────────────── */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.burger-nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

/* ── Navbar: esconder ao rolar para baixo, mostrar ao subir ── */
let lastScrollY = window.scrollY;
let ticking = false;

function handleScroll() {
  const currentScrollY = window.scrollY;
  const scrollDelta = currentScrollY - lastScrollY;

  /* Mostrar / esconder navbar */
  if (currentScrollY > 100) {
    if (scrollDelta > 0) {
      navbar.classList.add('nav-hidden');
    } else {
      navbar.classList.remove('nav-hidden');
    }
  } else {
    navbar.classList.remove('nav-hidden');
  }

  /* Back to top */
  if (backToTop) {
    if (currentScrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  lastScrollY = currentScrollY;
  ticking = false;
}

window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(handleScroll);
    ticking = true;
  }
}, { passive: true });

/* ── Reveal on scroll ────────────────────────────────── */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));
