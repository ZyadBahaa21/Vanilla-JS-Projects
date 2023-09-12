const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

//get double function

const getDouble = () => {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDom();
};

//  function getSort

const getSort = () => {
  data.sort((a, b) => a.money - b.money);
  updateDom();
};

// function getMillionairs

const getMillionairs = () => {
  data = data.filter((user) => user.money >= 1000000);
  updateDom();
};

// function getWealth
const getWealth = () => {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = ` <h3>Total Wealth</h3> <strong>${formatMoney(
    wealth
  )}</strong>`;
  main.appendChild(wealthEl);
};

// Function Add Data
const addData = (obj) => {
  data.push(obj);

  updateDom();
};

// immplementaiton updateDom

const updateDom = (providedData = data) => {
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong>  ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
};

// immplementation function formatMoney

const formatMoney = (number) => {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", getDouble);
sortBtn.addEventListener("click", getSort);
showMillionairBtn.addEventListener("click", getMillionairs);
calculateWealthBtn.addEventListener("click", getWealth);
