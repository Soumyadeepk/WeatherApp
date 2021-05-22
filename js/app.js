var baseUrl = "http://api.openweathermap.org/data/2.5/weather";
var apiKey = "1a600fe885c29a42a430e719da39e65d";
var cityFetchApi = [
  `${baseUrl}?q=bengaluru&appid=${apiKey}&units=metric`,
  `${baseUrl}?q=delhi&appid=${apiKey}&units=metric`,
  `${baseUrl}?q=mumbai&appid=${apiKey}&units=metric`,
  `${baseUrl}?q=kolkata&appid=${apiKey}&units=metric`,
];

var headerCards = document.querySelector(".header-cards");

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var d = new Date();
var dayName = days[d.getDay()];
var timeDay = new Date(1621578600 * 1000);
console.log(timeDay);

//header-cards data using fetch API
function fetchCity1() {
  cityFetchApi.map((api) => {
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        var cardData = document.createElement("div");
        var cardTemp = document.createElement("div");
        var cardCity = document.createElement("div");
        var cardDay = document.createElement("div");
        var cardWeatherDetails = document.createElement("div");

        var CardTemperature = document.createTextNode(
          Math.floor(data.main.temp) + " °C"
        );
        cardTemp.appendChild(CardTemperature);

        var cardCityData = document.createTextNode(data.name);
        cardCity.appendChild(cardCityData);

        var cardDayData = document.createTextNode(dayName);
        cardDay.appendChild(cardDayData);

        var cardWeatherDetailsData = document.createTextNode(
          data.weather[0].description.charAt(0).toUpperCase() +
            data.weather[0].description.slice(1)
        );
        cardWeatherDetails.appendChild(cardWeatherDetailsData);

        cardData.classList.add("card-data");
        cardTemp.classList.add("card-temp");
        cardCity.classList.add("card-city");
        cardDay.classList.add("card-day");
        cardWeatherDetails.classList.add("card-weather-details");

        cardData.appendChild(cardTemp);
        cardData.appendChild(cardCity);
        cardData.appendChild(cardDay);
        cardData.appendChild(cardWeatherDetails);

        headerCards.appendChild(cardData);
      });
  });
}

fetchCity1();

//one city details

var cityName = document.querySelector(".city-name");
var cityDay = document.querySelector(".city-day");
var cityWeath = document.querySelector(".city-weath");
var cityTemp = document.querySelector(".city-temp");
var minTemp = document.querySelector(".min-temp");
var maxTemp = document.querySelector(".max-temp");
var cityDataRect = document.querySelector(".city-data-rectangle");

var cityHumd = document.querySelector(".city-humidity");
var cityWind = document.querySelector(".city-wind");

//one city data fetch
var submitBtn = document.querySelector(".form-submit");
submitBtn.addEventListener("click", fetchData);

function fetchData(e) {
  e.preventDefault();
  console.log("hey");
  var cityInput = document.querySelector(".form-city").value;
  if (cityInput) {
    fetch(`${baseUrl}?q=${cityInput}&appid=${apiKey}&units=metric`)
      .then((res) => res.json())
      .then((data) => {
        cityName.innerHTML = data.name;
        cityDay.innerHTML = dayName;
        cityWeath.innerHTML =
          data.weather[0].description.charAt(0).toUpperCase() +
          data.weather[0].description.slice(1);
        cityTemp.innerHTML = Math.floor(data.main.temp) + " °C";
        minTemp.innerHTML = "Min Temp: " + data.main.temp_min + " °C";
        maxTemp.innerHTML = "Max Temp: " + data.main.temp_max + " °C";
        cityHumd.innerHTML = "Humidity: " + data.main.humidity + "%";
        cityWind.innerHTML = "Wind: " + data.wind.speed + "km/hr";
        cityDataRect.style.display = "block";
      });
  }
}

// //fetch four day data
// var fourDay = document.querySelector(".four-day");
// var fourMinTemp = document.querySelector(".four-min-temp");
// var fourMaxTemp = document.querySelector(".four-max-temp");

// //four days Base api
// var fourBaseApi = "https://api.openweathermap.org/data/2.5/onecall";

// //four api function

// // function fetchFour(){
// //   fetch(`${fourBaseApi}?`)
// // }

// console.log(Geolocation.getCurrentPosition());

var tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".header-cards",
    start: "top center",
  },
});
tl.from("nav", {
  opacity: 0,
  y: -30,
  duration: 0.5,
});
tl.from(".header-cards", {
  opacity: 0,
  y: 50,
  duration: 0.5,
});

tl.from(".form-search", {
  opacity: 0,
  y: 50,
  duration: 0.5,
});

tl.from(".line", {
  opacity: 0,
  y: 50,
  duration: 0.5,
});
