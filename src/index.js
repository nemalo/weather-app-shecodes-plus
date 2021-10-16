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
    nowHours = "0" + nowHours;
  }

  if (nowMinutes < 10) {
    nowMinutes = "0" + nowMinutes;
  }

  let formattedDate = document.querySelector(".day-time");
  formattedDate.innerHTML = `${nowDay}, ${nowHours}:${nowMinutes}`;
  return formattedDate;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
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
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col weekday">
          <img
            src="images/${forecastDay.weather[0].icon}.png"
            class="day-weather"
            id="monday-weather-icon"
          />
          <p class="day-name">${formatDay(forecastDay.dt)}</p>
          <p class="high-temp">${Math.round(forecastDay.temp.max)}°C</p>
          <p class="low-temp">${Math.round(forecastDay.temp.min)}°C</p>
        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// ------------------------------------------- tackling week 5
let apiKey = `57821c3b75b60c68ecd1a8d0dd1aa8d3`;

function getForecast(coordinates) {
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
  let iconId = response.data.weather[0].icon;
  iconElement.setAttribute("src", `images/${iconId}.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
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
