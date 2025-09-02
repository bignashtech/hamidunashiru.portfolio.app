// Custom Side Navigation
const navToggle = document.getElementById("navToggle");
const sideNav = document.getElementById("sideNav");
const navOverlay = document.getElementById("navOverlay");
const hamburger = document.querySelector(".hamburger");
const sideNavLinks = document.querySelectorAll(".side-nav .nav-link");

// Toggle side navigation
navToggle.addEventListener("click", function () {
  sideNav.classList.toggle("active");
  navOverlay.classList.toggle("active");
  hamburger.classList.toggle("active");
  document.body.style.overflow = sideNav.classList.contains("active")
    ? "hidden"
    : "auto";
});

// Close side navigation when clicking overlay
navOverlay.addEventListener("click", function () {
  sideNav.classList.remove("active");
  navOverlay.classList.remove("active");
  hamburger.classList.remove("active");
  document.body.style.overflow = "auto";
});

// Close side navigation when clicking a link
sideNavLinks.forEach((link) => {
  link.addEventListener("click", function () {
    sideNav.classList.remove("active");
    navOverlay.classList.remove("active");
    hamburger.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});

// Close side navigation on escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && sideNav.classList.contains("active")) {
    sideNav.classList.remove("active");
    navOverlay.classList.remove("active");
    hamburger.classList.remove("active");
    document.body.style.overflow = "auto";
  }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all sections for animations
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "all 0.6s ease";
  observer.observe(section);
});

// Typing animation for hero section with blinking cursor
function typeWriter(element, text, speed = 150) {
  let i = 0;
  element.innerHTML = "";

  // Add cursor span
  const cursor = document.createElement("span");
  cursor.classList.add("typewriter-cursor");
  cursor.textContent = "|";

  function type() {
    if (i < text.length) {
      // Remove cursor temporarily
      if (element.contains(cursor)) {
        element.removeChild(cursor);
      }

      // Add next character
      element.innerHTML += text.charAt(i);

      // Add cursor back
      element.appendChild(cursor);

      i++;
      setTimeout(type, speed);
    } else {
      // Keep cursor blinking after typing is complete
      setTimeout(() => {
        if (element.contains(cursor)) {
          element.removeChild(cursor);
        }
      }, 2500); // Remove cursor after 2 seconds
    }
  }

  // Start with cursor
  element.appendChild(cursor);
  setTimeout(type, 600); // Delay before starting to type
}

// Initialize typing animation when page loads
window.addEventListener("load", function () {
  const heroTitle = document.querySelector(".hero h1");
  const originalText = heroTitle.textContent;
  typeWriter(heroTitle, originalText, 200);
});

// Add parallax effect to hero section
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  const floatingElements = document.querySelectorAll(".floating-element");

  hero.style.transform = `translateY(${scrolled * 0.01}px)`;

  floatingElements.forEach((element, index) => {
    const speed = (index + 1) * 0.08;
    element.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Mouse Light function
// (function () {
//   const light = document.getElementById("mouseLight");
//   let mouseX = window.innerWidth / 2;
//   let mouseY = window.innerHeight / 2;
//   let currentX = mouseX;
//   let currentY = mouseY;
//   const ease = 0.8;

//   const onMove = (x, y) => {
//     mouseX = x;
//     mouseY = y;
//     light.style.opacity = 0.5;
//   };

//   window.addEventListener("mousemove", (e) => onMove(e.clientX, e.clientY), {
//     passive: true,
//   });
//   window.addEventListener(
//     "touchmove",
//     (e) => {
//       if (e.touches && e.touches[0])
//         onMove(e.touches[0].clientX, e.touches[0].clientY);
//     },
//     { passive: true }
//   );

//   function raf() {
//     currentX += (mouseX - currentX) * ease;
//     currentY += (mouseY - currentY) * ease;

//     light.style.transform = `translate3d(${
//       currentX - light.offsetWidth / 2
//     }px, ${currentY - light.offsetHeight / 2}px, 0)`;

//     requestAnimationFrame(raf);
//   }
//   raf();

//   const buttons = document.querySelectorAll(".status-btn");
//   buttons.forEach((btn) => {
//     btn.addEventListener("mouseenter", () => {
//       light.style.width = "260px";
//       light.style.height = "260px";
//       light.style.filter = "blur(42px) saturate(160%)";
//     });
//     btn.addEventListener("mouseleave", () => {
//       light.style.width = "420px";
//       light.style.height = "420px";
//       light.style.filter = "blur(60px) saturate(150%)";
//     });
//   });
// })();

// Scroll reveal animations using AOS
AOS.init({
  duration: 900,
  once: false,
  mirror: true,
  offset: 60,
  disable: false,
  startEvent: "DOMContentLoaded",
});

// Timeline Animation
const timelineItems = document.querySelectorAll(".timeline-item");
const timelineObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  },
  {
    threshold: 0.3,
    rootMargin: "0px 0px -100px 0px",
  }
);

timelineItems.forEach((item) => {
  timelineObserver.observe(item);
});

// Counter animation for footer stats
function animateCounters() {
  const counters = document.querySelectorAll(".footer-stat-number");
  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-count"));
    let current = 0;
    const increment = target / 20;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
}

// Trigger counter animation when footer is visible
const footerStats = document.querySelector(".footer-stats");
const statsObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

if (footerStats) {
  statsObserver.observe(footerStats);
}

// Enhanced Theme Toggle System
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Check for saved theme preference or default to dark mode
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  body.classList.add("light-mode");
  themeToggle.classList.add("active");
}

// Theme toggle functionality
themeToggle.addEventListener("click", () => {
  body.classList.toggle("light-mode");
  themeToggle.classList.toggle("active");

  // Add a subtle animation effect
  themeToggle.style.transform = "scale(0.9)";
  setTimeout(() => {
    themeToggle.style.transform = "scale(1)";
  }, 150);

  // Save preference to localStorage
  if (body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }

  // Dispatch custom event for theme change
  window.dispatchEvent(
    new CustomEvent("themeChanged", {
      detail: {
        theme: body.classList.contains("light-mode") ? "light" : "dark",
      },
    })
  );
});

// View more button functionality
document.getElementById("view-more").addEventListener("click", function () {
  window.open("https://github.com/bignashtech", "_blank");
});

// Add smooth theme transition on page load
document.addEventListener("DOMContentLoaded", function () {
  // Remove any transition delays on initial load
  setTimeout(() => {
    body.style.transition = "background-color 0.4s ease, color 0.4s ease";
  }, 100);
});
