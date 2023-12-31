const currencyEl_one = document.getElementById("currency-one");
const amountEl_one = document.getElementById("amount-one");
const currencyEl_two = document.getElementById("currency-two");
const amountEl_two = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

const calculate = () => {
  const currencyOne = currencyEl_one.value;
  const currencyTwo = currencyEl_two.value;

  fetch(
    `https://v6.exchangerate-api.com/v6/361c4c23b4bcfe06ada8145d/latest/${currencyOne}`
  )
    .then((res) => res.json())
    .then((data) => {
      const rate = data.conversion_rates[currencyTwo];
      rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
};

currencyEl_one.addEventListener("change", calculate);
amountEl_one.addEventListener("change", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_two.addEventListener("change", calculate);

swap.addEventListener("click", () => {
  const tmp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = tmp;
  calculate();
});
calculate();
