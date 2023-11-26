const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider-btn-left');
  const btnRight = document.querySelector('.slider-btn-right');
  const dotsContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Slider buttons
  // Creating the buttons
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots-dot" data-slide="${i}"></button>`
      );
    });
  };

  // Event delegation to buttons to show corresponding slide
  // and activate the buttons
  dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots-dot')) {
      const { slide } = e.target.dataset;
      curSlide = Number(slide);
      activateDot(slide);
      updateSlide();
    }
  });

  // Activation of the buttons with colour using data attribute
  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots-dot')
      .forEach((dot) => dot.classList.remove('dots-dot-active'));

    document
      .querySelector(`.dots-dot[data-slide="${slide}"]`)
      .classList.add('dots-dot-active');
  };

  // Function to update the visible slide
  function updateSlide() {
    if (window.innerWidth <= 468) {
      slides.forEach((slide, index) => {
        slide.style.display = index === curSlide ? 'block' : 'none';
      });
    }
  }

  // Next button
  btnRight.addEventListener('click', () => {
    // Loop back to first slide after the last one
    if (window.innerWidth <= 468) {
      if (curSlide === maxSlide - 1) {
        curSlide = 0;
      } else {
        curSlide++;
      }
      console.log(curSlide);

      updateSlide();
      activateDot(curSlide);
    }
  });

  // Previous button
  btnLeft.addEventListener('click', () => {
    // Loop back to last slide after the first one
    if (window.innerWidth <= 468) {
      if (curSlide === 0) {
        curSlide = maxSlide - 1;
      } else {
        curSlide--;
      }
      console.log(curSlide);

      updateSlide();
      activateDot(curSlide);
    }
  });

  const init = function () {
    createDots();
    activateDot(0);
    updateSlide();
  };
  init();
};
slider();

const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

const btn = document.getElementById('menu-btn');
const nav = document.getElementById('menu');

btn.addEventListener('click', () => {
  btn.classList.toggle('open');
  nav.classList.toggle('nav-open');
});
