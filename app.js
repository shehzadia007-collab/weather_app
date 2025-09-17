function getWeather() {
  const city = document.getElementById("city").value;
  const result = document.getElementById("result");
  result.innerHTML = "Loading...";

  if (!city) {
    result.innerHTML = "Please enter a city name.";
    return;
  }

  // Step 1: city → lat/lon
  const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;

  fetch(geoUrl)
    .then(response => response.json())
    .then(geoData => {
      if (!geoData.results) {
        result.innerHTML = "City not found.";
        return;
      }

      const place = geoData.results[0];
      const lat = place.latitude;
      const lon = place.longitude;

      // Step 2: lat/lon → current weather
      const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

      return fetch(weatherUrl)
        .then(res => res.json())
        .then(weatherData => {
          const w = weatherData.current_weather;
          result.innerHTML = `
            <h2>${place.name}, ${place.country}</h2>
            <p>🌡️ Temperature: ${w.temperature} °C</p>
            <p>🌬️ Wind: ${w.windspeed} km/h</p>
          `;
        });
    })
    .catch(err => {
      result.innerHTML = "Error: " + err.message;
    });
}
