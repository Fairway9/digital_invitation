const revealItems = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealItems.forEach((item) => observer.observe(item));

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));

    if (!target) {
      return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const designerSlides = Array.from(document.querySelectorAll(".designer-slide"));
const designerPrev = document.querySelector(".designer-prev");
const designerNext = document.querySelector(".designer-next");
const designerProgress = document.querySelector(".designer-progress span");
let designerIndex = 0;
let designerTimer;

function showDesigner(index) {
  if (!designerSlides.length) {
    return;
  }

  designerIndex = (index + designerSlides.length) % designerSlides.length;

  designerSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === designerIndex);
  });

  if (designerProgress) {
    const step = 100 / designerSlides.length;
    designerProgress.style.width = `${step}%`;
    designerProgress.style.transform = `translateX(${designerIndex * 100}%)`;
  }
}

function queueDesignerAutoplay() {
  window.clearInterval(designerTimer);
  designerTimer = window.setInterval(() => {
    showDesigner(designerIndex + 1);
  }, 5200);
}

designerPrev?.addEventListener("click", () => {
  showDesigner(designerIndex - 1);
  queueDesignerAutoplay();
});

designerNext?.addEventListener("click", () => {
  showDesigner(designerIndex + 1);
  queueDesignerAutoplay();
});

showDesigner(0);
queueDesignerAutoplay();
