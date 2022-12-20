let apiKey = "f08a6a7fd3e944f30od1c4cc4b5b3tf6";
let apiEndpoint = "https://api.shecodes.io/weather/v1/";
let units = "metric";
let apiUrl = `${apiEndpoint}current?query=Houston&key=${apiKey}&units=${units}`;
apiUrl = apiUrl.replace(" ", "+");

function showCurrent(response) {
  console.log(response.data);

  let cityName = document.querySelector("#city");
  cityName.innerHTML = response.data.city;

  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = Math.round(response.data.temperature.current);

  let conditionDescription = document.querySelector("#condition");
  conditionDescription.innerHTML = response.data.condition.description;

  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.temperature.humidity;
}

axios.get(apiUrl).then(showCurrent);
