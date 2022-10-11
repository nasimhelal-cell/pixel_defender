"use strict";

/////////////////////////////////////////////////////////////
// Elements
/////////////////////////////////////////////////////////////

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnCloseModal = document.querySelector(".btn--close-modal");
const nav = document.querySelector(".nav");
const navLinks = document.querySelector(".nav__links");
const header = document.querySelector(".header");
const toggleBtn = document.querySelector(".nav__toggle");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const allSections = document.querySelectorAll(".section");
const section1 = document.querySelector("#section--1");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContent = document.querySelectorAll(".operations__content");
const cookieBody = document.querySelector(".cookie");
const cookieCloseBtn = document.querySelector(".cookie__close");
const imgTargets = document.querySelectorAll("img[data-src]");

//cookies
cookieCloseBtn.addEventListener("click", () => {
  cookieBody.classList.add("hidden");
  cookieBody.style.bottom = "-12rem";
});

//sticky navbar making
const navHeight = nav.getBoundingClientRect().height;

function stickyNavbar(entries) {
  const entry = entries[0];
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else nav.classList.remove("sticky");
}
const headerObserver = new IntersectionObserver(stickyNavbar, {
  root: null, //viewport
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

//section's reveling creation
function sectionRevealing(entries, observer) {
  const [entry] = entries;

  if (entry.isIntersecting) {
    entry.target.classList.remove("section--hidden");
  } else return;
  observer.unobserve(entry.target);
}
const sectionObserver = new IntersectionObserver(sectionRevealing, {
  root: null,
  threshold: 0.2,
});

allSections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

//modal window making
function openModal(e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}
function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// modal close by Esc button
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// smooth scroll behaviour
navLinks.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const attr = e.target.getAttribute("href");
    document.querySelector(attr).scrollIntoView({ behavior: "smooth" });
  }
});

// nav toggle activation
toggleBtn.addEventListener("click", function () {
  if (navLinks.classList.contains("nav__open")) {
    navLinks.classList.remove("nav__open");
    document.querySelector("html").style.overflow = "visible";
  } else {
    navLinks.classList.add("nav__open");
    document.querySelector("html").style.overflow = "hidden";
  }
});
navLinks.addEventListener("click", () => {
  navLinks.classList.contains("nav__open") &&
    navLinks.classList.remove("nav__open");
  document.querySelector("html").style.overflow = "visible";
});

//btn Scroll to a specific section
btnScrollTo.addEventListener("click", () => {
  section1.scrollIntoView({ behavior: "smooth" });
});
//lazy loading
function loadImg(entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });
}
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "250px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

// slider making with js

// slider making variables
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

// slider state for the next and previous slide
let currentSlide = 0;
const maxSlide = slides.length - 1;
//creating dots
function creatingDots() {
  slides.forEach((_, index) => {
    const dot = `<button class="dots__dot" data-slide="${index}"></button>`;
    dotContainer.insertAdjacentHTML("beforeend", dot);
  });
}
creatingDots();
//active dot

function activateDot(slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
}

activateDot(0);
// // dot event handelar
dotContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("dots__dot")) {
    activateDot(e.target.dataset.slide);
    updateSlide(e.target.dataset.slide);
  }
});

//updating slide one by one

function updateSlide(currentSlide) {
  slides.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`)
  );
}
updateSlide(0);
//slider
function previousSlide() {
  console.log("pre");
  if (currentSlide === 0) {
    currentSlide = maxSlide;
  } else currentSlide--;
  updateSlide(currentSlide);
}
function nextSlide() {
  console.log("next");
  if (currentSlide === maxSlide) {
    currentSlide = 0;
  } else currentSlide++;
  updateSlide(currentSlide);
}

// left and right btn event handelars
btnLeft.addEventListener("click", previousSlide);
btnRight.addEventListener("click", nextSlide);

////tabs
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach((tab) => tab.classList.remove("operations__tab--active"));
  tabsContent.forEach((tabContent) =>
    tabContent.classList.remove("operations__content--active")
  );

  // Activate tab
  clicked.classList.add("operations__tab--active");

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});
