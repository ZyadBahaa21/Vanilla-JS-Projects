const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");

const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

let ticketPrice = +movieSelect.value;

getFromLocalStorage();

// function that save selected movie index

setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem("selectMovieIndex", movieIndex);
  localStorage.setItem("selectMoviePrice", moviePrice);
};

updateSelectedSeatsCount = () => {
  selectedSeats = document.querySelectorAll(".row .seat.selected");

  // i want to return the that contains the indecies
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  // Store data in localStorge
  // .setItem(first parameter is the key for the data you store it,
  // second parameter is the data you want to store it )

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

// Here I get the data from localStorage

function getFromLocalStorage() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  const selectedMovieIndex = localStorage.getItem("selectMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedSeatsCount();
});
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedSeatsCount();
  }
});

updateSelectedSeatsCount();
