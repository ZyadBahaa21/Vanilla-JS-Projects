const toggle = document.getElementById("toggle");
const closed = document.getElementById("close");
const opened = document.getElementById("open");
const modal = document.getElementById("modal");

// Toggle
toggle.addEventListener("click", () => {
  document.body.classList.toggle("show-nav");
});

// Show Modal

opened.addEventListener("click", () => {
  modal.classList.add("show-modal");
});

// Hide Modal
closed.addEventListener("click", () => {
  modal.classList.remove("show-modal");
});

//  Hide Modal On Click Out side

window.addEventListener("click", (e) => {
  e.target == modal ? modal.classList.remove("show-modal") : false;
});
