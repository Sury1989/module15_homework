const button = document.querySelector(".button");
const btn = document.querySelectorAll(".btn");

button.addEventListener("click", () => {
  btn.forEach((btn) => {
    btn.classList.toggle("active");
  });
});