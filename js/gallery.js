// Gallery Data
const galleryData = {
  'gvc-schools': {
    folder: './public/Images/schools-gvc/',
    count: 19,
    prefix: 'photo_',
    suffix: '_2026-01-18_21-12-05.jpg'
  },
  'pui-schools': {
    folder: './public/Images/schools-pui/',
    count: 49,
    prefix: 'photo_',
    suffix: '_2026-01-18_21-11-28.jpg',
    suffix2: '_2026-01-18_21-11-29.jpg'
  },
  'sif-schools': {
    folder: './public/Images/schools-sif/',
    count: 28,
    prefix: 'photo_',
    suffix: '_2026-01-18_21-35-22.jpg'
  },
  'drc-water': {
    folder: './public/Images/water-tank-drc/',
    count: 13,
    prefix: 'photo_',
    suffix: '_2026-01-18_21-23-55.jpg'
  },
  'adra-sanitation': {
    folder: './public/Images/sanitation-adra/',
    count: 16,
    prefix: 'photo_',
    suffix: '_2026-01-18_20-59-53.jpg'
  }
};

// Load Gallery Images
function loadGallery() {
  Object.keys(galleryData).forEach(key => {
    const container = document.getElementById(key);
    const data = galleryData[key];
    
    for (let i = 1; i <= data.count; i++) {
      let imagePath;
      
      // Handle PUI schools with two different suffixes
      if (key === 'pui-schools') {
        imagePath = i <= 10 
          ? `${data.folder}${data.prefix}${i}${data.suffix}`
          : `${data.folder}${data.prefix}${i}${data.suffix2}`;
      } else {
        imagePath = `${data.folder}${data.prefix}${i}${data.suffix}`;
      }
      
      const col = document.createElement('div');
      col.className = 'col-md-6 col-lg-4';
      
      col.innerHTML = `
        <div class="gallery-card" onclick="openModal('${imagePath}')">
          <div class="gallery-image">
            <img src="${imagePath}" alt="صورة ${i}" loading="lazy">
            <div class="image-counter">${i}/${data.count}</div>
            <div class="gallery-overlay">
              <i class="bi bi-zoom-in"></i>
            </div>
          </div>
        </div>
      `;
      
      container.appendChild(col);
    }
  });
}

// Open Modal
function openModal(imageSrc) {
  const modal = new bootstrap.Modal(document.getElementById('imageModal'));
  document.getElementById('modalImage').src = imageSrc;
  modal.show();
}

// Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
  loadGallery();
  
  const filterButtons = document.querySelectorAll('.filter-btn');
  const categories = document.querySelectorAll('.gallery-category');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter categories
      categories.forEach(category => {
        if (filter === 'all') {
          category.classList.remove('hidden');
          category.style.display = 'block';
        } else {
          const categoryType = category.getAttribute('data-category');
          if (categoryType === filter) {
            category.classList.remove('hidden');
            category.style.display = 'block';
          } else {
            category.classList.add('hidden');
            category.style.display = 'none';
          }
        }
      });
      
      // Smooth scroll to top of gallery
      window.scrollTo({
        top: document.querySelector('.filter-buttons').offsetTop - 100,
        behavior: 'smooth'
      });
    });
  });
  
  // Lazy loading animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe gallery items
  setTimeout(() => {
    document.querySelectorAll('.gallery-card').forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(20px)';
      item.style.transition = 'all 0.6s ease';
      observer.observe(item);
    });
  }, 100);
});

// Keyboard navigation for modal
document.addEventListener('keydown', function(e) {
  const modal = document.getElementById('imageModal');
  if (modal.classList.contains('show') && e.key === 'Escape') {
    bootstrap.Modal.getInstance(modal).hide();
  }
});

// Back to Top Button
window.addEventListener('scroll', function() {
  const backToTopBtn = document.getElementById('backToTop');
  if (window.pageYOffset > 300) {
    backToTopBtn.style.display = 'block';
  } else {
    backToTopBtn.style.display = 'none';
  }
});

document.getElementById('backToTop').addEventListener('click', function() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});
