let searchBar = $('#searchBar').value;
let searchBtn = $('#searchBtn').click();
let cityWeather = $('#cityWeather');

let currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=imperial&appid=b703162bc80e9c84c36e0978245d2023`;

fetch(currentWeather)
    .then(response =>
        response.json())
    .then(data =>
        console.log(data));

function searchCity() {
    var city = $(searchBar);
    $(cityWeather).innerHtml = city;
}

    
 