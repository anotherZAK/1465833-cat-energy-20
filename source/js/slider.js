var sliderBtnBefore = document.querySelector(".slider-controls__btn--before");
var sliderBtnAfter = document.querySelector(".slider-controls__btn--after");
var slideBefore = document.querySelector(".example__slide--before");
var slideAfter = document.querySelector(".example__slide--after");
var sliderBar = document.querySelector(".slider-controls__bar");

sliderBtnBefore.addEventListener("click", function (evt) {
  if (!slideBefore.classList.contains("example__slide--current")) {
    slideBefore.classList.add("example__slide--current");
    slideAfter.classList.remove("example__slide--current");
    sliderBar.classList.remove("slider-controls__bar--after");
  }
});

sliderBtnAfter.addEventListener("click", function (evt) {
  if (!slideAfter.classList.contains("example__slide--current")) {
    slideAfter.classList.add("example__slide--current");
    slideBefore.classList.remove("example__slide--current");
    sliderBar.classList.add("slider-controls__bar--after");
  }
});
