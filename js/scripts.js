// js/scripts.js
document.addEventListener('DOMContentLoaded', () => {
  // ----- 1) Menu hamburger -----
  const nav = document.querySelector('.nav-bar');
  const btn = nav.querySelector('.hamburger');
  btn.addEventListener('click', () => {
    nav.classList.toggle('collapsed');
  });
  // démarrer fermé sur mobile
  if (window.innerWidth <= 768) nav.classList.add('collapsed');

  // ----- 2) Wrap & toggle des sections -----
  document.querySelectorAll('.card').forEach(card => {
    // 2.1. Crée le contenu caché
    const wrapper = document.createElement('div');
    wrapper.className = 'card-content';
    // déplace tous les <p> et éléments après le <h2> dedans
    [...card.children].forEach(el => {
      if (el.tagName.toLowerCase() === 'p') {
        wrapper.appendChild(el);
      }
    });
    card.appendChild(wrapper);

    // 2.2. Crée le bouton toggle
    const toggle = document.createElement('button');
    toggle.className = 'toggle-btn';
    toggle.textContent = 'Afficher le texte';
    card.insertBefore(toggle, wrapper);

    // 2.3. Au clic, on montre/masque
    toggle.addEventListener('click', () => {
      card.classList.toggle('collapsed');
      if (card.classList.contains('collapsed')) {
        toggle.textContent = 'Masquer le texte';
      } else {
        toggle.textContent = 'Afficher le texte';
      }
    });
  });
});

window.addEventListener('load', () => {
  document.querySelectorAll('.carousel').forEach(carousel => {
    const track    = carousel.querySelector('.carousel-track');
    const slides   = Array.from(track.children);
    const prevBtn  = carousel.querySelector('.carousel-button.prev');
    const nextBtn  = carousel.querySelector('.carousel-button.next');
    let   idx      = 0;
    let   slideW;

    function initCarousel() {
      // 1. Largeur exacte du carousel (entier)
      slideW = carousel.getBoundingClientRect().width | 0; 
      // 2. Fixe la largeur de la piste
      track.style.width = `${slideW * slides.length}px`;
      // 3. Fixe la largeur de chaque slide
      slides.forEach(slide => {
        slide.style.width = `${slideW}px`;
      });
      // 4. Place la slide courante
      moveTo(idx);
    }

    function moveTo(i) {
      track.style.transform = `translateX(-${i * slideW}px)`;
    }

    prevBtn.addEventListener('click', () => {
      idx = (idx - 1 + slides.length) % slides.length;
      moveTo(idx);
    });
    nextBtn.addEventListener('click', () => {
      idx = (idx + 1) % slides.length;
      moveTo(idx);
    });
    window.addEventListener('resize', initCarousel);

    initCarousel();
  });
});
// === Carousel vidéos ===
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.carousel.video-carousel');
  const viewport = carousel.querySelector('.carousel-viewport');
  const slides   = Array.from(viewport.children);
  const prevBtn  = carousel.querySelector('.carousel-button.prev');
  const nextBtn  = carousel.querySelector('.carousel-button.next');
  let   idx      = 0;

  function update() {
    const w = viewport.clientWidth;
    viewport.style.transform = `translateX(-${idx * w}px)`;
  }

  prevBtn.addEventListener('click', () => {
    idx = (idx - 1 + slides.length) % slides.length;
    update();
  });
  nextBtn.addEventListener('click', () => {
    idx = (idx + 1) % slides.length;
    update();
  });
  window.addEventListener('resize', update);

  update();
});


// 2) Lightbox minimaliste
document.addEventListener('DOMContentLoaded', () => {
  const overlay    = document.getElementById('lightbox-overlay');
  const lbImg      = document.getElementById('lightbox-img');
  const lbCaption  = document.getElementById('lightbox-caption');
  const lbClose    = document.getElementById('lightbox-close');
  const lbPrev     = document.getElementById('lightbox-prev');
  const lbNext     = document.getElementById('lightbox-next');
  const slides     = Array.from(document.querySelectorAll('.slide img'));
  let   currentIdx = 0;

  if (!overlay || !lbImg || !lbCaption) return;

  slides.forEach((img, idx) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => {
      currentIdx = idx;
      showImage(currentIdx);
      overlay.classList.add('active');
    });
  });

  function showImage(idx) {
    const img = slides[idx];
    lbImg.src = img.src;
    lbImg.alt = img.alt || '';
    // Récupère la légende depuis .slide-caption si elle existe,
    // sinon depuis l'attribut alt
    const captionEl = img.parentElement.querySelector('.slide-caption');
    lbCaption.textContent = captionEl
      ? captionEl.textContent
      : img.alt || '';
  }

  lbPrev.addEventListener('click', () => {
    currentIdx = (currentIdx - 1 + slides.length) % slides.length;
    showImage(currentIdx);
  });
  lbNext.addEventListener('click', () => {
    currentIdx = (currentIdx + 1) % slides.length;
    showImage(currentIdx);
  });

  overlay.addEventListener('click', e => {
    if (e.target === overlay || e.target === lbClose) {
      overlay.classList.remove('active');
      lbImg.src = '';
      lbCaption.textContent = '';
    }
  });

  document.addEventListener('keydown', e => {
    if (!overlay.classList.contains('active')) return;
    if (e.key === 'ArrowLeft')  lbPrev.click();
    if (e.key === 'ArrowRight') lbNext.click();
    if (e.key === 'Escape')      lbClose.click();
  });
});

AOS.init({
  duration: 800,
  once: true
});

