let cityInput = document.querySelector(".searchInput");
let submitBtn = document.querySelector(".submitBtn");
let cityName = document.querySelector(".city");
let cityTemp = document.querySelector(".temp");
let weatherBox = document.querySelector(".weatherBox");
const style = document.createElement("style");
const currentTime = document.querySelector(".currentTime");
const icon = document.querySelector(".icon");
const currentCond = document.querySelector(".condition");

let update = () => {
  currentTime.innerHTML = moment().format("LTS");
};

setInterval(update, 1000);

submitBtn.addEventListener("click", () => {
  let city = cityInput.value;
  let cityGio =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    city +
    "&appid=cf3316e2f45034e3bc3a7f8bd6e953de";

  fetch(cityGio)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let lat = data[0].lat;
      let lon = data[0].lon;
      let name = data[0].name;
      cityName.innerHTML = name;
      let cityData =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=cf3316e2f45034e3bc3a7f8bd6e953de&units=imperial";
      fetch(cityData)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          let temp = data.current.temp.toFixed();
          cityTemp.innerText = temp + "°F";
          icon.src =
            "http://openweathermap.org/img/wn/" +
            data.current.weather[0].icon +
            "@2x.png";
          let descript = data.current.weather[0].description;
          currentCond.innerHTML = descript;
        });
    });

  style.innerHTML = `.weather{
      background:rgba(0,0,0, 0.2);
      border-radius: 5px;
      padding:5px

  }`;
  document.head.appendChild(style);

  cityInput.value = "";
});
