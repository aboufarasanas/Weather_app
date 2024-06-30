const apiKey = "07fad0ac019b1212dc313624af3329ce";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather_icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".city").innerHTML = '--';
        document.querySelector(".temp").innerHTML = "--°C";
        document.querySelector(".humidity").innerHTML = "--%";
        document.querySelector(".wind").innerHTML = "--km/h";
        weatherIcon.src = "images/night/mist_night(1).png";
    } else {
        var data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

        const currentTime = data.dt;
        const sunrise = data.sys.sunrise;
        const sunset = data.sys.sunset;
        let timeOfDay = '';

        if (currentTime >= sunrise && currentTime < sunset) {
            timeOfDay = 'day';
        } else {
            timeOfDay = 'night';
        }

        let weatherCondition = data.weather[0].main.toLowerCase();

        let weatherIconSrc = '';

        if (timeOfDay === 'day') {
            if (weatherCondition === "clouds") {
                weatherIconSrc = "images/day/clouds_day.png";
            } else if (weatherCondition === "clear") {
                weatherIconSrc = "images/day/clear_day.png";
            } else if (weatherCondition === "rain") {
                weatherIconSrc = "images/day/rain_day.png";
            } else if (weatherCondition === "mist") {
                weatherIconSrc = "images/day/mist_day.png";
            } else if (weatherCondition === "drizzle") {
                weatherIconSrc = "images/day/drizzle_day.png";
            } else if (weatherCondition === "snow") {
                weatherIconSrc = "images/day/snow_day.png";
            }
        } else {
            if (weatherCondition === "clouds") {
                weatherIconSrc = "images/night/clouds_night.png";
            } else if (weatherCondition === "clear") {
                weatherIconSrc = "images/night/clear_night.png";
            } else if (weatherCondition === "rain") {
                weatherIconSrc = "images/night/rain_night.png";
            } else if (weatherCondition === "mist") {
                weatherIconSrc = "images/night/mist_night.png";
            } else if (weatherCondition === "drizzle") {
                weatherIconSrc = "images/night/drizzle_night.png";
            } else if (weatherCondition === "snow") {
                weatherIconSrc = "images/night/snow night.png";
            }
        }

        weatherIcon.src = weatherIconSrc;
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
