function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function showForecast() {
  let forecast = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="row-6">
        <span class="weather-forecast-day">${day}</span>
        <img 
        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png" 
        alt=""
        class="forecast-icon">
        <span class="high-temp">10°</span> |
        <span class="low-temp">-3°</span>
      </div>`;

    forecastHTML = forecastHTML + `</div>`;

    forecast.innerHTML = forecastHTML;
  });
}

function getForecast(coordinates) {
  let apiKey = "f08a6a7fd3e944f30od1c4cc4b5b3tf6";
  let apiEndpoint = `https://api.shecodes.io/weather/v1/forecast?`;
  let lon = coordinates.longitude;
  let lat = coordinates.latitude;
  let units = "metric";
  let apiUrl = `${apiEndpoint}lon=${lon}&lat=${lat}&key=${apiKey}&units=${units}`;

  console.log(apiUrl);
  //axios.get(apiUrl).then(showForecast)
}

function showCurrent(response) {
  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.city;

  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.temperature.current);

  celsiusTemp = response.data.temperature.current;

  let conditionDescription = document.querySelector("#condition");
  conditionDescription.innerHTML = response.data.condition.description;

  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute("src", response.data.condition.icon_url);
  weatherIcon.setAttribute("alt", response.data.condition.description);

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;

  let date = document.querySelector("#date");
  date.innerHTML = formatDate(response.data.time * 1000);

  getForecast(response.data.coordinates);
}

function searchCity(city) {
  let apiKey = "f08a6a7fd3e944f30od1c4cc4b5b3tf6";
  let apiEndpoint = "https://api.shecodes.io/weather/v1/";
  let units = "metric";
  let apiUrl = `${apiEndpoint}current?query=${city}&key=${apiKey}&units=${units}`;
  apiUrl = apiUrl.replace(" ", "+");

  axios.get(apiUrl).then(showCurrent);
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  searchCity(city.value);
}

function showFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperature = document.querySelector("#current-temp");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemp);
}

function showCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#search");
form.addEventListener("submit", search);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

searchCity("Houston");
showForecast();
