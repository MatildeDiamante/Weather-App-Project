let weatherDate = new Date();
let dateElement = document.querySelector("#date");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[weatherDate.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "Dicember",
];
let month = months[weatherDate.getMonth()];
let date = weatherDate.getDate();
let year = weatherDate.getFullYear();
let hours = weatherDate.getHours();
let minutes = weatherDate.getMinutes();
if (hours < 10) {
  hours = `0${hours}`;
}
if (minutes < 10) {
  minutes = `0${minutes}`;
}
dateElement.innerHTML = `${day}, ${date} ${month} ${year}, ${hours}:${minutes}`;

function showCurrentTemperature(response) {
  let positionTemperature = document.querySelector("#temperature");
  let positionCity = document.querySelector("#city");
  let positionDescription = document.querySelector("#description");
  let positionHumidity = document.querySelector("#humidity");
  let positionWind = document.querySelector("#wind");
  let positionIcon = document.querySelector("#icon");

  celsiusTemperature = response.data.main.temp;

  positionTemperature.innerHTML = Math.round(response.data.main.temp);
  positionCity.innerHTML = response.data.name;
  positionDescription.innerHTML = response.data.weather[0].description;
  positionHumidity.innerHTML = response.data.main.humidity;
  positionWind.innerHTML = Math.round(response.data.wind.speed);
  positionIcon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.icon);
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "b95f179627c8dd37f41e1be6e3250e19";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showCurrentTemperature);
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(showLocation);
}

function showTemperature(response) {
  console.log(response);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.icon);
}

function search(city) {
  let apiKey = "4e22t034db35d40a22ab70aofd62244b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function controlSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#form-input");
  search(cityInputElement.value);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let button = document.querySelector("#current-location");
button.addEventListener("click", getCurrentLocation);

let form = document.querySelector("#search-form");
form.addEventListener("submit", controlSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("Udine");
