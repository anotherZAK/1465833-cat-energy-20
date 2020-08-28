var burgerToggle = document.querySelector(".main-nav");

burgerToggle.addEventListener("click", function (evt) {
  burgerToggle.classList.toggle("main-nav--opened");
  burgerToggle.classList.toggle("main-nav--closed");
});
