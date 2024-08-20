document.getElementById('weather-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const location = document.getElementById('location').value;
  const apiKey = 'YOUR_API_KEY';  // Replace with your OpenWeatherMap API key
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

  try {
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error('Location not found');
      }
      const data = await response.json();
      displayWeather(data);
  } catch (error) {
      document.getElementById('weather-info').innerText = error.message;
  }
});

function displayWeather(data) {
  const weatherInfo = document.getElementById('weather-info');
  const temp = data.main.temp;
  const description = data.weather[0].description;
  const city = data.name;

  weatherInfo.innerHTML = `
      <h2>Weather in ${city}</h2>
      <p>Temperature: ${temp}°C</p>
      <p>Conditions: ${description}</p>
  `;
}
