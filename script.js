(() => {
  const cards = document.querySelectorAll('[data-tilt]');

  cards.forEach((card) => {
    const base = card.getAttribute('data-base') || '';
    const sheen = card.querySelector('[data-sheen]');

    const move = (e) => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const ry = (px - 0.5) * 26;
      const rx = (0.5 - py) * 22;

      card.style.animation = 'none';
      card.style.transition = 'transform .08s linear';
      card.style.transform = `${base} translateY(-18px) scale(1.06) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;

      if (sheen) {
        sheen.style.opacity = '1';
        sheen.style.background = `radial-gradient(240px circle at ${(px * 100).toFixed(1)}% ${(py * 100).toFixed(1)}%, rgba(255,255,255,.5), rgba(255,255,255,.08) 45%, transparent 72%)`;
      }
    };

    const leave = () => {
      card.style.transition = 'transform .5s cubic-bezier(.2,.8,.2,1)';
      card.style.transform = base;
      setTimeout(() => { card.style.animation = ''; }, 500);
      if (sheen) sheen.style.opacity = '0';
    };

    card.addEventListener('pointermove', move);
    card.addEventListener('pointerleave', leave);
  });
})();
