const apiKey = '7d5b865ca184439bad0162808240710';
const defaultCity = 'cairo';

function fetchWeather(city) {
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7&aqi=no`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            document.getElementById("temp").innerHTML = `${data.current.temp_c}°C`;
            document.getElementById("weather").innerHTML = data.current.condition.text;

            const icon2 = data.current.condition.icon;
            document.getElementById("stat").src = icon2;

            // Display temperature and condition for each day
            data.forecast.forecastday.forEach((day, index) => {
                document.getElementById(`temp${index + 1}`).innerHTML = `${day.day.avgtemp_c}°C`;
                document.getElementById(`stat${index + 1}`).src = day.day.condition.icon;
            });
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
        });

    const date = new Date();
    let nextDay = new Date(date);
    for (let i = 1; i <= 6; i++) {
        nextDay.setDate(date.getDate() + i);
        const dayName = nextDay.toLocaleDateString('en-US', { weekday: 'long' });
        document.getElementById(`date${i}`).innerHTML = dayName;
    }
}

document.getElementById('cityInput').addEventListener('input', function() {
    const city = this.value;
    fetchWeather(city);
});

document.addEventListener('DOMContentLoaded', function() {
    fetchWeather(defaultCity);
});
