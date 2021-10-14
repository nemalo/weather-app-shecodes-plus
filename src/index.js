// ------------------------------------------- day and time

let now = new Date();

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let nowDay = days[now.getDay()];
  let nowMinutes = now.getMinutes();
  let nowHours = now.getHours();

  if (nowHours < 10) {
    hours = "0" + hours;
  }

  if (nowMinutes < 10) {
    minutes = "0" + minutes;
  }

  let formattedDate = document.querySelector(".day-time");
  formattedDate.innerHTML = `${nowDay}, ${nowHours}:${nowMinutes}`;
  return formattedDate;
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weekly-weather-forecast");

  let forecastHTML = `<div class="row">`;
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      ` <div class="col weekday">
          <img
            src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png"
            class="day-weather"
            id="monday-weather-icon"
          />
          <p class="day-name">${forecastDay.dt}</p>
          <p class="high-temp">${forecastDay.temp.max}°C</p>
          <p class="low-temp">${forecastDay.temp.min}°C</p>
        </div>`;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

console.log(formatDate(now));

/*

 * PREVIOUS WEEKS *

// ------------------------------------------- search bar & city name

function searchCity(event) {
  event.preventDefault();

  let inputCity = document.querySelector("#weather-search-bar");
  let currentCity = document.querySelector("#current-city-id");
  currentCity.innerHTML = inputCity.value;
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

let submitButton = document.querySelector("#submit-search");
submitButton.addEventListener("click", searchCity);

// ------------------------------------------- bonus feature - celsius in fahrenheit in celsius

function switchToFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector(".temp-now");
  let fahrenheitNumber = fahrenheit.innerHTML;
  fahrenheit.innerHTML = Math.round((fahrenheitNumber * 9) / 5 + 32);
}
let fahrenheitChange = document.querySelector(".temp-fahrenheit");
fahrenheitChange.addEventListener("click", switchToFahrenheit);

function switchToCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector(".temp-now");
  celsius.innerHTML = 25;
}
let celsiusChange = document.querySelector(".temp-celsius");
celsiusChange.addEventListener("click", switchToCelsius);


* END PREVIOUS WEEKS *

*/

// ------------------------------------------- tackling week 5
let apiKey = `57821c3b75b60c68ecd1a8d0dd1aa8d3`;

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `57821c3b75b60c68ecd1a8d0dd1aa8d3`;
  let apiUrlTwo = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlTwo).then(displayForecast);
}

function showLocation(response) {
  document.querySelector("#current-city-id").innerHTML = response.data.name;
  document.querySelector(".temp-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#wind_speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humidity_percent").innerHTML =
    response.data.main.humidity;
  document.querySelector(".current-weather-condition").innerHTML =
    `${response.data.weather[0].main}`.toLowerCase();

  celsiusTemp = response.data.main.temp;

  let iconElement = document.querySelector("#current-weather-icon-id");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);

  displayForecast(response);
}

/* search location*/

function searchLocation(city) {
  let apiKey = `57821c3b75b60c68ecd1a8d0dd1aa8d3`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showLocation);
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#weather-search-bar").value;
  searchLocation(city);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

let submitButton = document.querySelector("#submit-search");
submitButton.addEventListener("click", searchCity);

/* END search location*/

/* current location button*/

function currentLocation(position) {
  console.log(position);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let urlCoords = `https://api.openweathermap.org/data/2.5/weather?wind=&lat=${latitude}&lon=${longitude}&&appid=${apiKey}&units=metric`;
  axios.get(urlCoords).then(showLocation);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let button = document.querySelector(`#submit-current-location`);
button.addEventListener("click", getCurrentPosition);

/* END current location button*/

/* fahrenheit to celsius*/
/*
function switchToFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector(".temp-now");
  let fahrenheitNumber = fahrenheit.innerHTML;
  fahrenheit.innerHTML = Math.round((fahrenheitNumber * 9) / 5 + 32);
}
let fahrenheitChange = document.querySelector(".temp-fahrenheit");
fahrenheitChange.addEventListener("click", switchToFahrenheit);

function switchToCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector(".temp-now");
  let celsiusNumber = celsius.innerHTML;
  celsius.innerHTML = Math.round(((celsiusNumber - 32) * 5) / 9);
}
let celsiusChange = document.querySelector(".temp-celsius");
celsiusChange.addEventListener("click", switchToCelsius);
*/
/* END fahrenheit to celsius*/

// ------------------------------------------- tackling week 7

/* fahrenheit to celsius*/

function switchToFahrenheit(event) {
  event.preventDefault();
  let fahrenheit = document.querySelector(".temp-now");
  let fahrenheitNumber = celsiusTemp;
  fahrenheit.innerHTML = Math.round((fahrenheitNumber * 9) / 5 + 32);
}
let fahrenheitChange = document.querySelector(".temp-fahrenheit");
fahrenheitChange.addEventListener("click", switchToFahrenheit);

function switchToCelsius(event) {
  event.preventDefault();
  let celsius = document.querySelector(".temp-now");
  celsius.innerHTML = Math.round(celsiusTemp);
}
let celsiusChange = document.querySelector(".temp-celsius");
celsiusChange.addEventListener("click", switchToCelsius);

let celsiusTemp = null;

/* END fahrenheit to celsius*/

searchLocation("Opatija");
