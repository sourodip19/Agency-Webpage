// === Toast Notification Utility ===
function showToast(message) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerHTML = `<i class="fas fa-quote-left"></i> ${message}`;

  container.appendChild(toast);

  // Remove after animation completes (~4s)
  setTimeout(() => {
    toast.remove();
  }, 4000);
}

const mobileMenu = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenu.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Header Scroll Effect
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (window.scrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Scroll Animations
// Scroll Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};
// 📜 Smooth scroll when clicking "View Our Work"
document.querySelectorAll('a[href="#portfolio"]').forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector("#portfolio").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";

      if (entry.target.classList.contains("about-text")) {
        const children = entry.target.children;
        for (let i = 0; i < children.length; i++) {
          children[i].style.transitionDelay = `${i * 0.2}s`;
          children[i].style.opacity = "1";
          children[i].style.transform = "translateX(0)";
        }
      }

      if (entry.target.classList.contains("about-image")) {
        entry.target.style.transitionDelay = "0.4s";
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateX(0)";
      }

      if (
        entry.target.classList.contains("portfolio-item") ||
        entry.target.classList.contains("service-card") ||
        entry.target.classList.contains("stat-item")
      ) {
        const items = document.querySelectorAll("." + entry.target.className);
        items.forEach((item, index) => {
          item.style.transitionDelay = `${index * 0.1}s`;
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        });
      }

      // MODIFIED: Animate stats counting from 500 to 0 for startup company
      if (entry.target.classList.contains("stat-item")) {
        const statNumbers = document.querySelectorAll(".stat-number");
        statNumbers.forEach((stat) => {
          const target = parseInt(stat.getAttribute("data-count")); // This should be 0
          const duration = 5000; // 3 seconds (slower for dramatic effect)
          const step = 500 / (duration / 16); // Start from 500
          let current = 500; // Always start from 500

          const timer = setInterval(() => {
            current -= step;
            if (current <= target) {
              clearInterval(timer);
              stat.textContent = target;
            } else {
              stat.textContent = Math.floor(current);
            }
          }, 16);
        });
      }
    }
  });
}, observerOptions);
// Observe elements for animation
document
  .querySelectorAll(
    ".about-text, .about-image, .portfolio-item, .service-card, .stat-item"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Testimonial Slider
const track = document.querySelector(".testimonial-track");
const slides = document.querySelectorAll(".testimonial-slide");
const dots = document.querySelectorAll(".slider-dot");
let currentSlide = 0;

function goToSlide(index) {
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
  currentSlide = index;
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    goToSlide(index);
  });
});

// Auto-advance testimonials
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  goToSlide(currentSlide);
}, 5000);

// Form Submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  alert("Thank you for your message! We will get back to you soon.");
  this.reset();
});

// Add hover effect to service cards
const serviceCards = document.querySelectorAll(".service-card");
serviceCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px)";
  });
  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});

// Form Submission with Mailto
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const business = document.getElementById("business").value;
  const message = document.getElementById("message").value;

  // Create mailto link
  const subject = `Website Inquiry from ${name} - ${business}`;
  const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0ABusiness Type: ${business}%0D%0A%0D%0AMessage:%0D%0A${message}`;

  const mailtoLink = `mailto:stdg0916@gmail.com?subject=${encodeURIComponent(
    subject
  )}&body=${body}`;

  // Open email client
  window.location.href = mailtoLink;

  // Optional: Show confirmation message
  setTimeout(() => {
    alert(
      "Thank you for your message! Your email client should open with a pre-filled message. Please send it to complete your inquiry."
    );
    this.reset();
  }, 1000);
});

// 🌟 Show motivational toast when clicking "Get a Quote"
document.querySelectorAll('a[href="#quote"]').forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    const quotes = [
      "💡 Great things never come from comfort zones.",
      "🚀 Small steps every day lead to big results.",
      "🌞 Believe you can, and you're halfway there.",
      "🔥 Dreams don’t work unless you do.",
      "🌈 Keep going — you’re doing amazing.",
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    showToast(randomQuote); // Show toast instead of alert
  });
});

// Initialize EmailJS
emailjs.init("YOUR_PUBLIC_KEY");

// Handle Contact Form
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  emailjs
    .send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
      from_name: document.getElementById("name").value,
      from_email: document.getElementById("email").value,
      business: document.getElementById("business").value,
      message: document.getElementById("message").value,
    })
    .then(
      function () {
        alert("✅ Thank you! Your message has been sent successfully.");
        e.target.reset();
      },
      function (error) {
        alert("❌ Failed to send message. Please try again later.");
        console.error(error);
      }
    );
});
