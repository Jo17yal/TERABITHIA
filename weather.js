const weatherData = {
    "Kepler-186f": {
        name: "Kepler-186f",
        temperature: "-85°C",
        atmosphere: "Thin, mostly nitrogen and carbon dioxide",
        weather: "Extreme cold, occasional dust storms",
        skyColor: "Red-orange due to thin atmosphere"
    },
    "Proxima-b": {
        name: "Proxima-b",
        temperature: "30°C",
        atmosphere: "Nitrogen, Oxygen, traces of Carbon dioxide",
        weather: "Frequent radiation storms due to flares from Proxima Centauri",
        skyColor: "Blue-green with dark, stormy clouds"
    },
    "TRAPPIST-1d": {
        name: "TRAPPIST-1d",
        temperature: "-30°C",
        atmosphere: "Thin, mostly carbon dioxide with water vapor",
        weather: "Harsh winds, icy storms, potential for liquid water oceans",
        skyColor: "Grayish-white due to water vapor clouds"
    },
    "Gliese-581g": {
        name: "Gliese-581g",
        temperature: "10°C",
        atmosphere: "Dense, nitrogen and carbon dioxide-rich",
        weather: "Constant cloud cover, heavy winds, possibility of rain",
        skyColor: "Dark blue, often cloudy"
    }
};

// Function to update weather data based on selected exoplanet
function getWeather() {
    const planetSelect = document.getElementById('planet');
    const selectedPlanet = planetSelect.value;

    if (selectedPlanet && weatherData[selectedPlanet]) {
        const planetWeather = weatherData[selectedPlanet];
        document.getElementById('planet-name').innerText = planetWeather.name;
        document.getElementById('weather-info').innerHTML = `
            <p><strong>Temperature:</strong> ${planetWeather.temperature}</p>
            <p><strong>Atmosphere:</strong> ${planetWeather.atmosphere}</p>
            <p><strong>Weather:</strong> ${planetWeather.weather}</p>
            <p><strong>Sky Color:</strong> ${planetWeather.skyColor}</p>
        `;
    } else {
        document.getElementById('planet-name').innerText = "";
        document.getElementById('weather-info').innerText = "";
    }
}