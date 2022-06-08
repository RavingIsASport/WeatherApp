let cityInput = document.querySelector(".searchInput");
let submitBtn = document.querySelector(".submitBtn");
let cityName = document.querySelector(".city");
let cityTemp = document.querySelector(".temp");
let weatherBox = document.querySelector(".weatherBox");
const style = document.createElement("style");

submitBtn.addEventListener("click", () => {
  let city = cityInput.value;
  cityName.innerText = city;
  let cityData =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=cf3316e2f45034e3bc3a7f8bd6e953de&units=imperial";
  fetch(cityData)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let temp = data.main.temp;
      cityTemp.innerText = temp + " °F";
    });
  style.innerHTML = `.weather{
      background:rgba(255,255,255, 0.5);
      border-radius: 5px;
      padding:5px

  }`;
  document.head.appendChild(style);
});
