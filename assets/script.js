let searchBar = $('#searchBar');
let searchBtn = $('#searchBtn');
let cityWeather = $('#cityWeather');

let currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${searchBar}&units=imperial&appid=b703162bc80e9c84c36e0978245d2023`;

function searchWeather(searchBar) {
    if (searchBtn.click(event)) {
        searchBar.event.value = fetch(currentWeather)
            .then(response =>
                response.json())
            .then(data =>
                console.log(data));
    }}


