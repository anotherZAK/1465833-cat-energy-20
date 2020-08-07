var burgerToggle = document.querySelector(".burger");

burgerToggle.addEventListener("click", function (evt) {
    burgerToggle.classList.toggle("burger--opened");
    burgerToggle.classList.toggle("burger--closed");
});
