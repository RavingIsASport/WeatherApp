let city = document.getElementById("cityInput");
let locationForm = document.getElementById("locationForm");
let locationTitle = document.getElementById("locationTitle");
let temperature = document.getElementById("temperature");
let discription = document.getElementById("description");
let weatherIcon = document.getElementById("weatherIcon");
let latitude;
let longitude;
let apiKey = "2110a84465cff74a4b71fd103faeab7d";

// get current time
function updateClock() {
  const now = moment().format("dddd, MMMM Do YYYY, h:mm:ss A");
  document.getElementById("clock").textContent = now;
}

setInterval(updateClock, 1000);
updateClock();

// check if the browser supports geolocation and set user's location weather
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      console.log("Latitude:", latitude, "Longitude:", longitude);
      // Use these values in your weather API call
      getWeather(latitude, longitude);
    },
    (error) => {
      console.error("Error getting location:", error);
    }
  );
} else {
  console.error("Geolocation is not supported by this browser.");
}

// function to handle the search button click
locationForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the form from submitting and refreshing the page
  let cityName = city.value.trim();
  if (cityName) {
    searchWeather(cityName);
    city.value = ""; // Clear the input field after search
  } else {
    alert("Please enter a city name.");
  }
});

// set icon group based on weather ID
function getWeatherIcon(weatherId) {
  let iconGroup;
  if (weatherId >= 200 && weatherId < 300) {
    iconGroup = "wi wi-thunderstorm text-yellow-400";
  } else if (weatherId >= 300 && weatherId < 400) {
    iconGroup = "wi wi-sprinkle text-blue-400";
  } else if (weatherId >= 500 && weatherId < 600) {
    iconGroup = "wi wi-rain text-blue-400";
  } else if (weatherId >= 600 && weatherId < 700) {
    iconGroup = "wi wi-snow text-white";
  } else if (weatherId === 800) {
    iconGroup = "wi wi-day-sunny text-yellow-400";
  } else if (weatherId > 800) {
    iconGroup = "wi wi-cloudy text-gray-400";
  }
  weatherIcon.className = iconGroup + " text-8xl mt-4";
}

// function to update UI with city weather
function changeUI(weatherData) {
  locationTitle.innerText = `${weatherData.name}`;
  temperature.innerText = `${Math.round(weatherData.main.temp)}°F`;
  discription.innerText = `${weatherData.weather[0].description}`;
}

// Function to fetch weather data for a geolocation
async function getWeather(lat, long) {
  try {
    let geoWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`
    );
    // jsonify the response
    geoWeather = await geoWeather.json();
    console.log(geoWeather);

    // Update the UI with the fetched weather data
    changeUI(geoWeather);

    // Set the weather icon based on the fetched data
    let weatherId = geoWeather.weather[0].id;
    getWeatherIcon(weatherId);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Function to handle the search button click
async function searchWeather(cityName) {
  try {
    let cityWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`
    );
    // jsonify the response
    cityWeather = await cityWeather.json();
    console.log(cityWeather);

    // Update the UI with the fetched weather data
    changeUI(cityWeather);

    // Set the weather icon based on the fetched data
    let weatherId = cityWeather.weather[0].id;
    getWeatherIcon(weatherId);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
