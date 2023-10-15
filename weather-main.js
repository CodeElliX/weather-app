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

function formatDay(timeStamp) {
let date = new Date(timeStamp * 1000);
let day = date.getDay();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sut"]
return days[day];
}

function forecastDisplay2(response) {
  console.log(response.data.daily);
  let daysForecast = response.data.daily;
  let forecastHTML = `<div class = "row">`;
  let mainDiv = document.querySelector(".weath-col-main");
  daysForecast.forEach(function(days, index){
    if(index < 5) {
    forecastHTML = forecastHTML +
    `<div class="weath-col1">
  <span class="day col1">${formatDay(days.time)}</span>
  <br />
  <img class="smile-col1" src="${days.condition.icon_url}" >
  <br />
  <div class="forecast-temp">
  <span class="temp col1 max">${Math.round(days.temperature.maximum)}°</span>
  <span class="temp col1 min">${Math.round(days.temperature.minimum)}°</span>
</div>
</div>`;
forecastHTML = forecastHTML + `</div>`;
mainDiv.innerHTML = forecastHTML;
}
  });
}

function getForecast(coordinates){
let apiKey = "42ef8abb71b19440308b0oaf8b08ecbt"; 
let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
axios.get(apiUrl).then(forecastDisplay2);
}

function funcSubmit(value) {
  let searchInput = document.querySelector(".search");
  let nameTown = document.querySelector(".name-town");
  nameTown.innerHTML = searchInput.value;
}
let submitSearch = document.querySelector(".blue");
submitSearch.addEventListener("click", funcSubmit);

function curTemp(response) {
  celTemp = response.data.temperature.current;
  let temperature = Math.round(celTemp);
  let tempVal = document.querySelector(".temp-value");
  tempVal.innerHTML = temperature;
  let wind = document.querySelector(".wind");
  let windVal = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${windVal}km/h`;
  let clear = document.querySelector(".clear");
  let clearVal = response.data.condition.description;
  clear.innerHTML = clearVal;
  let humidity = document.querySelector(".humidity");
  let humidityVal = response.data.temperature.humidity;
  humidity.innerHTML = `Humidity : ${humidityVal}%`;
  let tempSmile = document.querySelector(".temp-smile");
  let tempSmileValue = response.data.condition.icon_url;
  tempSmile.setAttribute("src", `${tempSmileValue}`);
  datas();
  getForecast(response.data.coordinates);
}
let btn = document.querySelector(".blue");
btn.addEventListener("click", aaa);

function aaa(position) {
  let apiKey = "42ef8abb71b19440308b0oaf8b08ecbt";
  let search = document.querySelector(".search");
  let city = search.value;
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
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

// function to call when a key is pressed
function handleSubmit(event) {
  event.preventDefault();
}
let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
