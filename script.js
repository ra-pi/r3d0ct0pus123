// script.js

// script.js

// Load header and footer dynamically
function loadIncludes() {
  // Load header
  fetch("includes/header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header").innerHTML = data;
      initHeaderFunctions(); // wait until it's inserted
    });

  // Load footer
  fetch("includes/footer.html")
    .then(res => res.text())
    .then(data => document.getElementById("footer").innerHTML = data);
}

document.addEventListener("DOMContentLoaded", loadIncludes);

// After header is loaded, reattach the burger + sidebar events
function initHeaderFunctions() {
  const sidebar = document.getElementById("sidebar");
  const burger = document.querySelector(".burger");

  // burger toggle
  if (burger && sidebar) {
    burger.addEventListener("click", () => {
      sidebar.classList.toggle("active");
    });

    // close sidebar when clicking a link
    sidebar.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => sidebar.classList.remove("active"));
    });
  }

  // ensure contact/about links always go to index.html
  document.querySelectorAll("#navLinks a").forEach(link => {
    link.addEventListener("click", e => {
      const href = link.getAttribute("href");
      if (href && href.includes("#home-")) {
        e.preventDefault();
        window.location.href = href; // force navigation to index.html#section
      }
    });
  });
}

// existing JavaScript functions (toggleMenu, showSection, slider, etc.)
    const sidebar = document.getElementById('sidebar');
    const header = document.getElementById('siteHeader');
    const sections = document.querySelectorAll('section');
    const navLinks = document.getElementById('navLinks');

    // Make images clickable: data-detail points to the unique detail section id
    function attachClickableImages() {
      const imgs = document.querySelectorAll('img.clickable[data-detail]');
      imgs.forEach(img => {
        img.setAttribute('tabindex', '0'); // keyboard focusable
        img.addEventListener('click', () => {
          const detailId = img.getAttribute('data-detail');
          if (detailId) showSection(detailId);
        });
        img.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            img.click();
          }
        });
      });
    }

    function toggleMenu() {
      sidebar.classList.toggle('active');
    }

    // Activate a section and update header/nav; scroll detail into view accounting for sticky header
    /*function showSection(id) {
      // ensure id is defined
      const target = document.getElementById(id) || document.getElementById('home');

      // deactivate all sections
      sections.forEach(s => s.classList.remove('active'));
      // activate target
      target.classList.add('active');

      // close sidebar
      sidebar.classList.remove('active');

      // update header nav: if home -> show About & Contact; else only Home
      if (!id || id.startsWith('home')) {
        navLinks.innerHTML = `
          <a href="#" onclick="showSection('home')">Home</a>
          <a href="#" onclick="showSection('home-about')">About</a>
          <a href="#" onclick="showSection('home-contact')">Contact</a>
        `;
      } else {
        navLinks.innerHTML = `
        <a href="#" onclick="showSection('home')">Home</a>
        <a href="#" onclick="showSection('home-contact')">Contact</a>
        `;
      }

      // Smooth scroll the target into view, adjusted for sticky header height
      // compute offsetTop minus header height (if header exists)
      const headerHeight = header ? header.offsetHeight : 0;
      const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerHeight - 8); // small gap
      window.scrollTo({ top, behavior: 'smooth' });
    }
      */

    document.addEventListener('DOMContentLoaded', () => {
    attachClickableImages();
    showSection('home');

    const contactTrigger = document.querySelector('.contact-trigger');
    const modal = document.getElementById('contact-modal');
    const closeBtn = document.querySelector('.close-btn');

    contactTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
      modal.classList.remove('hidden');
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      modal.classList.add('hidden');
    });

    window.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        modal.classList.add('hidden');
      }
    });
  });


  const images = [
  "images/dairysqaureimg1.jpg",
  "images/dairysqaureimg2.jpg",
  "images/dairysqaureimg3.jpg",
  "images/dairysqaureimg4.jpg",
  "images/dairysqaureimg5.jpg",
  "images/dairysqaureimg6.jpg",
  "images/dairysqaureimg7.jpg"
];

let current = 0;
const img = document.querySelector(".slide-img");
const leftBtn = document.querySelector(".slide-btn.left");
const rightBtn = document.querySelector(".slide-btn.right");

function updateImage() {
  img.style.opacity = 0;
  setTimeout(() => {
    img.src = images[current];
    img.style.opacity = 1;
  }, 250);
}

leftBtn.addEventListener("click", () => {
  current = (current - 1 + images.length) % images.length;
  updateImage();
});

rightBtn.addEventListener("click", () => {
  current = (current + 1) % images.length;
  updateImage();
});

// Swipe support for touch devices
let startX = 0;
img.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
}, { passive: true });

img.addEventListener("touchend", e => {
  const dx = e.changedTouches[0].clientX - startX;
  if (Math.abs(dx) > 50) {
    if (dx < 0) {
      current = (current + 1) % images.length;
    } else {
      current = (current - 1 + images.length) % images.length;
    }
    updateImage();
  }
});

// Keyboard navigation (desktop)
document.addEventListener("keydown", e => {
  if (e.key === "ArrowLeft") {
    current = (current - 1 + images.length) % images.length;
    updateImage();
  }
  if (e.key === "ArrowRight") {
    current = (current + 1) % images.length;
    updateImage();
  }
});