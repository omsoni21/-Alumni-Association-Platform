let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll('.carousel-item');
  if (index >= slides.length) {
    currentSlide = 0;
  } else if (index < 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide = index;
  }

  const carouselContainer = document.querySelector('.carousel-container');
  carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentSlide);
  });
}

function moveSlide(direction) {
  showSlide(currentSlide + direction);
}

// Initialize the first slide
showSlide(currentSlide);