let degree_1 = document.getElementById("degree_1");
let city = document.getElementById("city");
let day_1 = document.getElementById("day_1");
let month_1 = document.getElementById("month_1");
let date_n = document.getElementById("date_n");
let statuss_1 = document.getElementById("status_1");
let icon_1 = document.getElementById("icon_1");
let dir_1 = document.getElementById("dir_1");
let rain_1 = document.getElementById("rain_1");
let wind_1 = document.getElementById("wind_1");
let humidity = document.getElementById("humidity");
let ForecastImg = document.querySelectorAll(".H1");
let ForecastDeg = document.querySelectorAll(".Hd1");
let minDeg = document.getElementById("minDeg");
let maxDeg = document.getElementById("maxDeg");
let Sunrise = document.getElementById("Sunrise");
let Sunset = document.getElementById("Sunset");
let Visibility = document.getElementById("Visibility");
let Pressure = document.getElementById("Pressure");
let cloud = document.getElementById("cloud");
let Fahrenheit = document.getElementById("Fahrenheit");
let Forecast_7_day = document.querySelectorAll("#Forecast_7_day");
let Forecast_7_img = document.querySelectorAll("#Forecast_7_img");
let Forecast_7_deg = document.querySelectorAll("#Forecast_7_deg");
let searchInput = document.getElementById("searchInput");
let mainData = document.getElementById("mainData");
let load = document.getElementsByClassName("load");
let data;
let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let month = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
function get7day(x) {
  if(x==""){
    mainData.classList.replace("d-block", "d-none");
  }
  else{
    let HTTP = new XMLHttpRequest();
    let d = new Date();
    HTTP.open(
      "GET",
      `https://api.weatherapi.com/v1/forecast.json?key=4e7f4b93553e48a98eb233214241306&q=${x}&days=7`
    );
    HTTP.send();
    HTTP.addEventListener("readystatechange", function () {
      if (HTTP.readyState == 4) {
        data = JSON.parse(HTTP.response);
        mainData.classList.replace("d-none", "d-block");
        degree_1.innerHTML = data.current.temp_c + " °C";
        statuss_1.innerHTML = data.current.condition.text;
        city.innerHTML = data.location.name;
        icon_1.setAttribute("src", "https:" + data.current.condition.icon);
        dir_1.innerHTML = data.current.wind_dir;
        rain_1.innerHTML = data.current.precip_mm + " mm";
        wind_1.innerHTML = data.current.wind_kph + " Km/h";
        humidity.innerHTML = data.current.humidity + " %";
        day_1.innerHTML = week[d.getDay()];
        month_1.innerHTML = month[d.getMonth()];
        date_n.innerHTML = d.getDate();
        maxDeg.innerHTML = data.forecast.forecastday[0].day.maxtemp_c + " °C";
        minDeg.innerHTML = data.forecast.forecastday[0].day.mintemp_c + " °C";
        Sunrise.innerHTML = data.forecast.forecastday[0].astro.sunrise;
        Sunset.innerHTML = data.forecast.forecastday[0].astro.sunset;

        Visibility.innerHTML = data.current.vis_km + " Km";
        Pressure.innerHTML = data.current.pressure_in + " in";
        cloud.innerHTML = data.current.cloud + " %";
        Fahrenheit.innerHTML = data.current.temp_f + " °f";

        for (let i = 1; i <= 6; i++) {
          Forecast_7_img[i - 1].setAttribute(
            "src",
            "https:" + data.forecast.forecastday[i].day.condition.icon
          );
          Forecast_7_deg[i - 1].innerHTML =
            data.forecast.forecastday[i].day.maxtemp_c + " °C";

          Forecast_7_day[i - 1].innerHTML = week[(d.getDay() + i) % 7];
        }

        let x = 1;
        for (let i = 0; i < 6; i++) {
          ForecastImg[i].setAttribute(
            "src",
            "https:" + data.forecast.forecastday[0].hour[x].condition.icon
          );
          ForecastDeg[i].innerHTML =
            data.forecast.forecastday[0].hour[x].temp_c + " °C";
          x += 4;
        }
      }
    });
  }
}
searchInput.addEventListener("input",function(e){
  let x = e.target.value;
  get7day(x);
})
