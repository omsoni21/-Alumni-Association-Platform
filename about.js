// Read More Button
const moreInfoBtn = document.getElementById('more-info-btn');
const extraInfo = document.getElementById('extra-info');

moreInfoBtn.addEventListener('click', () => {
  extraInfo.classList.toggle('show');
  moreInfoBtn.innerHTML = extraInfo.classList.contains('show') 
    ? 'Read Less <i class="fas fa-chevron-up"></i>' 
    : 'Read More <i class="fas fa-chevron-down"></i>';
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-text, .about-image, .mission, .vision, .value-item, .stat').forEach(el => {
  observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const heroSection = document.querySelector('.hero-section');
  const scrollPosition = window.pageYOffset;
  heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
});

// Image gallery hover effect
document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('mouseenter', () => {
    img.style.transform = 'scale(1.05)';
  });
  
  img.addEventListener('mouseleave', () => {
    img.style.transform = 'scale(1)';
  });
});

// Animation on Scroll
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.about-content, .mission-vision, .values-section, .achievements');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
};

window.addEventListener('scroll', animateOnScroll);

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
  animateOnScroll();
  
  // Add active class to current page in navigation
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('nav a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});