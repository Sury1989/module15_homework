const btn = document.querySelector(".btn");

const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

btn.addEventListener("click", () => {
  alert(`Размер экрана: ширина-${screenWidth}px, высота-${screenHeight}px.`);
});