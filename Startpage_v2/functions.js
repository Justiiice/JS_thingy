// function to calculate Week number
function getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  // Return array of year and week number
  return [d.getUTCFullYear(), weekNo];
}

// make object with current date month day as string
function dateString() {
  var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var date = new Date();
  return {
    day: days[date.getDay()],
    month: months[date.getMonth()],
    dayNum: date.getDate()
  }
};

// function to improve readability of numbers
function checkTime(i) {
  if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
  return i;
}

//update the clock every .5s lol
function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('clock').innerHTML =
    h + ":" + m + ":" + s;
  setTimeout(startTime, 500);
}
startTime();


function fetchWeatherData() {

  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + input.value + "&units=metric&APPID=8bc33b55474e0525d2c28707ca934965&lang=en";

  var request = new XMLHttpRequest();
  request.open('GET', url, true);
  request.onload = function () {

    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      console.log(data)
    } else {
      return `Hmm, something went wrong with API`;
    }
  }
  request.send();
}


function fetchRain() {
  // could change location but mnjeh
  var url = "https://api.openweathermap.org/data/2.5/weather?q=gjovik&units=metric&APPID=8bc33b55474e0525d2c28707ca934965&lang=en";
  fetch(url)
    .then(function (data) {
      return data.json();
    })
    .then(function (weather) {
      console.log(weather);
      document.getElementById('weather').innerHTML = `<h2>${weather.name}</h2> <p>Temp: ${weather.main.temp}<br> Feels like: ${weather.main.feels_like}</p>`
    });
}

fetchRain();
var week = getWeekNumber(new Date());
var date = dateString();

document.getElementById('week').innerHTML = `Week ${week[1]} - ${date.month} ${date.dayNum}`;

