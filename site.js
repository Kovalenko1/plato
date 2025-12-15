const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches ?? false;

function onReady(callback) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback, { once: true });
  } else {
    callback();
  }
}

onReady(() => {
  document.documentElement.classList.add('js');

  const revealSelectors = [
    '.hero__text > *',
    '.hero-card',
    'section .section-head',
    'section .card',
    '.footer',
  ];

  const revealSet = new Set();
  for (const selector of revealSelectors) {
    for (const el of document.querySelectorAll(selector)) {
      revealSet.add(el);
    }
  }

  const revealElements = Array.from(revealSet);
  revealElements.forEach((el, index) => {
    el.classList.add('reveal');
    el.style.setProperty('--d', `${Math.min(index * 60, 600)}ms`);
  });

  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      },
      { threshold: 0.14, rootMargin: '0px 0px -10% 0px' },
    );
    revealElements.forEach((el) => io.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-in'));
  }

  const canHover = window.matchMedia?.('(hover: hover)')?.matches ?? true;
  if (!prefersReducedMotion && canHover) {
    const heroCard = document.querySelector('.hero-card');
    if (heroCard) {
      const maxTilt = 10;
      heroCard.addEventListener('pointermove', (e) => {
        const rect = heroCard.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const ry = (px - 0.5) * maxTilt;
        const rx = -(py - 0.5) * maxTilt;
        heroCard.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
        heroCard.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
      });
      heroCard.addEventListener('pointerleave', () => {
        heroCard.style.setProperty('--rx', '0deg');
        heroCard.style.setProperty('--ry', '0deg');
      });
    }

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let raf = 0;
    let visible = false;

    function tick() {
      currentX += (targetX - currentX) * 0.14;
      currentY += (targetY - currentY) * 0.14;
      glow.style.left = `${currentX}px`;
      glow.style.top = `${currentY}px`;
      raf = requestAnimationFrame(tick);
    }

    function show() {
      if (visible) return;
      visible = true;
      glow.style.opacity = '1';
      if (!raf) raf = requestAnimationFrame(tick);
    }

    function hide() {
      visible = false;
      glow.style.opacity = '0';
    }

    window.addEventListener('pointermove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      show();
    });
    window.addEventListener('blur', hide);
    document.addEventListener('mouseleave', hide);
  }
});

