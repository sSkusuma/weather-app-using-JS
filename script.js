const apiKey = "a4e05eed33b26a2a5f5fd5d168e84d26"; // Replace with your actual OpenWeatherMap API key
const searchBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("SearchBtn");
const weatherBody = document.querySelector(".Weather-body");
const citySuggestions = document.querySelector(".suggestions");

// 🌍 Fetch Weather Data
const fetchWeather = async (city) => {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("City Not Found!");
        }

        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        weatherBody.innerHTML = `
            <img src="/images/404.png" alt="City Not Found" style="width: 200px; height: auto;">
            <h2>City Not Found!</h2>
        `;
        console.error("Error fetching weather:", error);
    }
};

// 🔄 Update UI with Weather Data
const updateWeatherUI = (data) => {
    const { name, main, weather, wind } = data;
    weatherBody.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather Icon">
        <h2>${name}</h2>
        <p class="temperature">${Math.round(main.temp)}°C</p>
        <p class="description">${weather[0].description}</p>
        <div class="Weather-details">
            <div class="humidity">
                <i class="fas fa-tint"></i>
                <span>${main.humidity}% Humidity</span>
            </div>
            <div class="wind">
                <i class="fas fa-wind"></i>
                <span>${wind.speed} km/hr Wind Speed</span>
            </div>
        </div>
    `;
};

// 🎯 Search Button Click
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        fetchWeather(city);
    }
});

// 🎯 Enter Key Search
searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        const city = searchBox.value.trim();
        if (city) {
            fetchWeather(city);
        }
    }
});

// 📍 City Suggestions (Static List)
const cityList = [
    "Mumbai", "Bengaluru", "Delhi", "Chennai", "Hyderabad", "Kolkata", "Pune", 
    "Thiruvananthapuram", "Ahmedabad", "Jaipur", "Lucknow", "Kanpur", "Nagpur", 
    "Visakhapatnam", "Bhopal", "Patna", "Vadodara", "Ludhiana", "Agra", "Nashik", 
    "Ranchi", "Guwahati", "Chandigarh", "Coimbatore", "Mysuru", "Kochi", "Indore", 
    "Jodhpur", "Varanasi", "Madurai", "Raipur", "Vijayawada", "Gwalior", "Thane", 
    "Hubballi", "Tiruchirappalli", "Dehradun", "Amritsar", "Udaipur"
];
searchBox.addEventListener("input", () => {
    const inputText = searchBox.value.toLowerCase();
    citySuggestions.innerHTML = "";

    if (inputText.length > 0) {
        const filteredCities = cityList.filter((city) =>
            city.toLowerCase().startsWith(inputText)
        );

        filteredCities.forEach((city) => {
            const suggestionItem = document.createElement("li");
            suggestionItem.textContent = city;
            suggestionItem.addEventListener("click", () => {
                searchBox.value = city;
                fetchWeather(city);
                citySuggestions.innerHTML = "";
            });
            citySuggestions.appendChild(suggestionItem);
        });
    }
});
