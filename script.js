/* =====| NF BRASIL – script.js |===== */

/* ─── 1. NAVBAR HIDE / SHOW ON SCROLL ─── */
(function () {
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  let lastScrollY = 0;
  let ticking = false;

  function handleScroll() {
    const currentY = window.scrollY;

    if (currentY > 80) {
      if (currentY > lastScrollY) {
        // Scrolling DOWN → esconde navbar, mostra seta
        navbar.classList.add('nav-hidden');
        backToTop.classList.add('visible');
      } else {
        // Scrolling UP → mostra navbar, esconde seta
        navbar.classList.remove('nav-hidden');
        backToTop.classList.remove('visible');
      }
    } else {
      // No topo da página → sempre mostra navbar
      navbar.classList.remove('nav-hidden');
      backToTop.classList.remove('visible');
    }

    lastScrollY = currentY;
    ticking = false;
  }

  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });
})();

/* ─── 2. BOTÃO FLUTUANTE WHATSAPP – aparece após scroll ─── */
(function () {
  const floatBtn = document.getElementById('btn-float-whatsapp');
  if (!floatBtn) return;

  // Começa invisível
  floatBtn.style.opacity = '0';
  floatBtn.style.pointerEvents = 'none';
  floatBtn.style.transform = 'scale(0.8)';
  floatBtn.style.transition = 'opacity 0.45s ease, transform 0.45s ease';

  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      floatBtn.style.opacity = '1';
      floatBtn.style.pointerEvents = 'auto';
      floatBtn.style.transform = '';
    } else {
      floatBtn.style.opacity = '0';
      floatBtn.style.pointerEvents = 'none';
      floatBtn.style.transform = 'scale(0.8)';
    }
  }, { passive: true });
})();

/* ─── 3. REVEAL ON SCROLL (IntersectionObserver) ─── */
(function () {
  const revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -48px 0px' });

  revealEls.forEach(function (el) { observer.observe(el); });
})();

/* ─── 4. STAGGER ANIMATIONS para cards dentro de grids ─── */
(function () {
  const grids = document.querySelectorAll(
    '.treinamentos-grid, .inspecoes-grid, .diferenciais-grid, .paraquem-grid, .problema-grid, .projetos-list'
  );

  grids.forEach(function (grid) {
    const cards = grid.children;
    Array.from(cards).forEach(function (card, i) {
      card.style.transitionDelay = (i * 0.07) + 's';
    });
  });
})();
