const apiKey="777fb1dc6be61b5d9cdcabe605d29494";
const form = document.querySelector("#form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");

const getWeather = async (city) => {
    weather.innerHTML = `<h2>Loading...</h2>`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.cod === "404") {
        weather.innerHTML = `<h2>City Not Found</h2>`;
    } else {
        displayWeather(data);
    }
};

const displayWeather = (data) => {
    weather.innerHTML = `
        <div class="weather-info">
            <h2>${data.name}, ${data.sys.country}</h2>
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
            <h3>${data.main.temp}°C</h3>
            <p>${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p> Wind Speed: ${data.wind.speed} m/s</p>
        </div>
    `;
};

form.addEventListener("submit", (event) => {
    event.preventDefault();
    getWeather(search.value);
});
