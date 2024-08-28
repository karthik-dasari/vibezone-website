'use strict';



/**
 * add event on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * MOBILE NAVBAR
 * navbar will show after clicking menu button
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const toggleNav = function () {
  navbar.classList.toggle("active");
  this.classList.toggle("active");
}

navToggler.addEventListener("click", toggleNav);

const navClose = () => {
  navbar.classList.remove("active");
  navToggler.classList.remove("active");
}

addEventOnElements(navLinks, "click", navClose);



/**
 * HEADER and BACK TOP BTN
 * header and back top btn will be active after scrolled down to 100px of screen
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeEl = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

window.addEventListener("scroll", activeEl);



/**
 * Button hover ripple effect
 */

const buttons = document.querySelectorAll("[data-btn]");

const buttonHoverRipple = function (event) {
  this.style.setProperty("--top", `${event.offsetY}px`);
  this.style.setProperty("--left", `${event.offsetX}px`);
}

addEventOnElements(buttons, "mousemove", buttonHoverRipple);



/**
 * Scroll reveal
 */

const revealElements = document.querySelectorAll("[data-reveal]");

const revealElementOnScroll = function () {
  for (let i = 0, len = revealElements.length; i < len; i++) {
    const isElementInsideWindow = revealElements[i].getBoundingClientRect().top < window.innerHeight / 1.1;

    if (isElementInsideWindow) {
      revealElements[i].classList.add("revealed");
    }
  }
}

window.addEventListener("scroll", revealElementOnScroll);

window.addEventListener("load", revealElementOnScroll);



/**
 * Custom cursor
 */

const cursor = document.querySelector("[data-cursor]");
const hoverElements = [...document.querySelectorAll("a"), ...document.querySelectorAll("button")];

const cursorMove = function (event) {
  cursor.style.top = `${event.clientY}px`;
  cursor.style.left = `${event.clientX}px`;
}

window.addEventListener("mousemove", cursorMove);

addEventOnElements(hoverElements, "mouseover", function () {
  cursor.classList.add("hovered");
});

addEventOnElements(hoverElements, "mouseout", function () {
  cursor.classList.remove("hovered");
});

new Splide( '#image-carousel', {
  perPage    : 3,
  breakpoints: {
    640: {
      perPage: 1,
    },
  },
  pagination: false,
  gap        : '4rem',
  focus      : 'center',
  // type       : 'loop',
  autoplay   : true,
  interval   : 3000,
  pauseOnHover: true,
  pauseOnFocus: true,
  arrows     : false,
} ).mount();

document.getElementById('submit').addEventListener('click', function (e) {
  e.preventDefault();
  const form = document.querySelector('form');
  const name = document.querySelector('input[name="your-name"]').value;
  const email = document.querySelector('input[name="your-email"]').value;
  const message = document.querySelector('textarea[name="your-message"]').value;
  const subject = document.querySelector('input[name="your-subject"]').value;
  var data = {
    'name': name,
    'email': email,
    'message': message,
    'subject': subject
  }
  
  
  fetch('https://script.google.com/macros/s/AKfycby6SI2LX3Qno6BPtKOv7Nu0QdhkUaT78Dse_NhMhhq52TT-_Uo7Ru9mMc9ZuKX_go_O/exec', {
    method: 'POST',
    data: data,
    dataType: 'json',
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      form.reset();
      alert('Thanks for your message!');
    } else {
      alert('Oops! There was a problem submitting your form');
    }
  });
}
);