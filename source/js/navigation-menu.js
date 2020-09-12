var burgerToggle = document.querySelector(".main-nav");

burgerToggle.classList.remove("main-nav--nojs");

burgerToggle.addEventListener("click", function (evt) {
  burgerToggle.classList.toggle("main-nav--opened");
  burgerToggle.classList.toggle("main-nav--closed");
});
