// ── NAVBAR SHADOW ON SCROLL ───────────────────────────────────
(function () {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      nav.style.boxShadow = '0 6px 40px rgba(22,52,92,0.22)';
    } else {
      nav.style.boxShadow = '0 4px 30px rgba(22,52,92,0.14)';
    }
  }, { passive: true });
})();