function datas(res) {
let dataInTown = document.querySelector(".data-in-town");
let currentDate = new Date();
let day = currentDate.getDay();
let hours = currentDate.getHours();
let minutes = currentDate.getMinutes();
let dayOll = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
dataInTown.innerHTML = `${dayOll[day]}  ${hours}:${minutes}`;
}

function funcSubmit(value) {
  let searchInput = document.querySelector(".search");
  let nameTown = document.querySelector(".name-town");
  nameTown.innerHTML = searchInput.value;
}
let submitSearch = document.querySelector(".blue");
submitSearch.addEventListener("click", funcSubmit);

function curTemp(response) {
  celTemp = response.data.main.temp;
  let temperature = Math.round(celTemp);
  let tempVal = document.querySelector(".temp-value");
  tempVal.innerHTML = temperature;
  let wind = document.querySelector(".wind");
  let windVal = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${windVal}km/h`;
  let clear = document.querySelector(".clear");
  let clearVal = response.data.weather[0].description;
  clear.innerHTML = clearVal;
  let humidity = document.querySelector(".humidity");
  let humidityVal = response.data.main.humidity;
  humidity.innerHTML = `Humidity : ${humidityVal}%`;
  let tempSmile = document.querySelector(".temp-smile");
  let tempSmileValue = response.data.weather[0].icon;
  tempSmile.setAttribute("src", `https://openweathermap.org/img/wn/${tempSmileValue}@2x.png`);
  datas();
}
let btn = document.querySelector(".blue");
btn.addEventListener("click", aaa);

function aaa(position) {
  let apiKey = "c5101c55623cc05df4c2c27f2841f7f2";
  let search = document.querySelector(".search");
  let city = search.value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(curTemp);
}

function fuh (event) {
event.preventDefault();
let temValue = document.querySelector(".temp-value");
let convertFar = Math.round( (celTemp * 9) / 5 + 32);
temValue.innerHTML = convertFar;
celTemperature.classList.remove("temp-c");
fuhrenheit.classList.add("temp-f");
}
let fuhrenheit = document.querySelector(".temp-f");
fuhrenheit.addEventListener("click", fuh);
let celTemp = null;

function cel(event) {
event.preventDefault();
let temValue = document.querySelector(".temp-value");
temValue.innerHTML = Math.round(celTemp);
fuhrenheit.classList.remove("temp-f");
celTemperature.classList.add("temp-c");
}

let celTemperature = document.querySelector(".temp-c");
celTemperature.addEventListener("click", cel);
