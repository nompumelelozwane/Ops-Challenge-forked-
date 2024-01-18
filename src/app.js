function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windSpeedElement = document.querySelector("#wind-speed");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");
  
    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
  }
  
  function formatDate(date) {
    let minutes = date.getMinutes();
    let hours = date.getHours();
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
  
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    return `${day} ${hours}:${minutes}`;
  }
  
  function searchCity(city) {
    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
    axios.get(apiUrl).then(refreshWeather);

    console.log()
  }
  
  function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-input");
  
    console.log(searchCity(searchInput.value));
    console.log(getForecastData(searchInput.value));
  }
  
  let searchFormElement = document.querySelector("#search-form");
  searchFormElement.addEventListener("submit", handleSearchSubmit);
  
  searchCity("Paris");
  getForecastData("Paris");

  function getForecastData(city) {
    let apiKey = "b2a5adcct04b33178913oc335f405433";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  
    fetch(apiUrl)
      .then((response) => {
        console.log("Hi");
        return response.json();
      })
      .then((data) => {
        displayForecast(data.daily);
      }); 
      console.log(data.daily);
  }
  

  function displayForecast(forecastData) {
    const forecastContainer = document.getElementById("forecast");
    forecastContainer.innerHTML = "";
  
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
    for (let i = 0; i < 7; i++) {
      const day = forecastData[i];
  
      const forecastCard = document.createElement("div");
      forecastCard.classList.add("day");
  
      const date = new Date(day.time * 1000); 
      const dayOfWeek = daysOfWeek[date.getDay()]; 
  
      const iconUrl = day.condition.icon_url;
      const description = day.condition.description;
  
      const minTemp = Math.round(day.temperature.minimum);
      const maxTemp = Math.round(day.temperature.maximum);
  
      const forecastContent = `
        <h6 class="day-name">${dayOfWeek}</h6>
        <img src="${iconUrl}">
        <h6 class="day-weather">${description}</h6>
        <h6 class="day-temp">${minTemp}° / <strong>${maxTemp}°</stronng></h6>
        `;
  
      forecastCard.innerHTML = forecastContent;
      forecastContainer.appendChild(forecastCard);
    }
  }

  function displayWeather(data) {
    let city = data.city;
    let country = data.country;
    let temp = Math.round(data.temperature.current);
    let description = data.condition.description;
    let iconUrl = data.condition.icon_url;
  
    let location = document.querySelector(".location");
    location.innerHTML = `${city}, ${country}`;
  
    let weatherTemp = document.querySelector("#temp-display");
    weatherTemp.innerHTML = `${temp}°`;
  
    let weatherType = document.querySelector(".weather-type");
    weatherType.innerHTML = `${description}`;
  
    let weatherIcon = document.querySelector(".weather-icon");
    weatherIcon.innerHTML = `<img src="${iconUrl}" alt="weather icon">`;
    
    getForecastData(data.city);
  
  }

  