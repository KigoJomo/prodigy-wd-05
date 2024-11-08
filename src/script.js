const url = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

$(document).ready(function () {
  // Attempt to get the user's current location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      weatherFnByCoords(latitude, longitude); // Use coordinates to fetch weather data
    }, function () {
      alert("Geolocation is not supported or permission denied. Please enter a city name.");
    });
  } else {
    alert("Geolocation is not supported by this browser. Please enter a city name.");
  }

  // Event listener for manual city search
  $('#city-input-btn').click(function () {
    const cityName = $('#city-input').val();
    if (cityName) {
      weatherFn(cityName);
    }
  });
});

// Fetch weather by city name
async function weatherFn(cName) {
  const temp = `${url}?q=${cName}&appid=${apiKey}&units=metric`;
  try {
    const res = await fetch(temp);
    const data = await res.json();
    if (res.ok) {
      weatherShowFn(data);
    } else {
      alert('City not found. Please try again.');
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Fetch weather by geolocation (latitude, longitude)
async function weatherFnByCoords(lat, lon) {
  const temp = `${url}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  try {
    const res = await fetch(temp);
    const data = await res.json();
    if (res.ok) {
      weatherShowFn(data);
    } else {
      alert('Unable to get weather data. Please try again.');
    }
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Show weather data on the page
function weatherShowFn(data) {
  console.log(data);
  $('#city-name').text(data.name);
  $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
  $('#temperature').html(`${data.main.temp}°C`);
  $('#description').text(data.weather[0].description);
  $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
  $('#weather-info').fadeIn();
}
