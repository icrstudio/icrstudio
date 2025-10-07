// -----------------------------
// HAMBURGER LOGIKA
// -----------------------------
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

const carousel = document.querySelector('.carousel');
const slides = document.getElementById('slides');

if (carousel && slides) {
  let index = 0;
  const totalSlides = slides.children.length;
  let startX = 0;
  let currentTranslate = 0;
  let isDragging = false;

  function showSlide(i) {
    slides.style.transition = 'transform .5s ease';
    slides.style.transform = `translateX(${-i * 100}%)`;
  }

  // Automatski slide
  setInterval(() => {
    index = (index + 1) % totalSlides;
    showSlide(index);
  }, 5000);

  // START drag
  const startDrag = e => {
    e.preventDefault();
    startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    currentTranslate = -index * 100;
    isDragging = true;
    slides.style.transition = 'none';
  };

  // MOVE drag
  const drag = e => {
    if (!isDragging) return;
    const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const dx = ((currentX - startX) / carousel.offsetWidth) * 100;
    slides.style.transform = `translateX(${currentTranslate + dx}%)`;
  };

  // END drag
  const endDrag = e => {
    if (!isDragging) return;
    const endX = e.type.includes('touch') ? e.changedTouches[0].clientX : e.clientX;
    const dx = endX - startX;

    if (dx > 50) index = (index - 1 + totalSlides) % totalSlides;
    else if (dx < -50) index = (index + 1) % totalSlides;

    showSlide(index);
    isDragging = false;
  };

  // EVENT LISTENERS
  carousel.addEventListener('mousedown', startDrag);
  carousel.addEventListener('touchstart', startDrag, { passive: false });

  carousel.addEventListener('mousemove', drag);
  carousel.addEventListener('touchmove', drag, { passive: false });

  carousel.addEventListener('mouseup', endDrag);
  carousel.addEventListener('mouseleave', endDrag);
  carousel.addEventListener('touchend', endDrag);
}

const partnersContainer = document.querySelector('.partners');
const track = partnersContainer.querySelector('.partner-track');
const logos = Array.from(track.children);

if (partnersContainer && track && logos.length > 0) {
  let index = 0;
  const total = logos.length;

  function slide() {
    // Pomeri track
    const logoWidth = logos[0].offsetWidth + 24; // 24px gap
    track.style.transition = 'transform 0.5s ease';
    track.style.transform = `translateX(${-index * logoWidth}px)`;

    // Sledeći logo
    index++;
    if (index >= total) {
      // Reset nakon kratkog delay-a
      setTimeout(() => {
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        index = 0;
      }, 510); // malo više od trajanja transition-a
    }
  }

  // Pokreni automatski
  setInterval(slide, 3000);
}
