const apiKey = "YOUR_API_KEY"; // put your API key here
const btn = document.getElementById("searchBtn");
const input = document.getElementById("cityInput");
const result = document.getElementById("weatherResult");
const historyList = document.getElementById("historyList");

// Load history on page load
window.onload = loadHistory;

btn.addEventListener("click", () => {
  const city = input.value.trim();
  if (city) {
    getWeather(city);
  }
});

// Async function
async function getWeather(city) {

  console.log("Before fetch");

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    console.log("After fetch");

    displayWeather(data);
    saveToHistory(city);

  } catch (error) {
    result.innerHTML = `<p style="color:red;">${error.message}</p>`;
  }
}

// Display weather
function displayWeather(data) {
  result.innerHTML = `
    <h2>${data.name}</h2>
    <p>🌡 Temperature: ${data.main.temp}°C</p>
    <p>☁ Condition: ${data.weather[0].main}</p>
  `;
}

// Save to Local Storage
function saveToHistory(city) {
  let history = JSON.parse(localStorage.getItem("history")) || [];

  if (!history.includes(city)) {
    history.push(city);
    localStorage.setItem("history", JSON.stringify(history));
  }

  loadHistory();
}

// Load history
function loadHistory() {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  historyList.innerHTML = "";

  history.forEach(city => {
    const li = document.createElement("li");
    li.textContent = city;

    li.addEventListener("click", () => {
      getWeather(city);
    });

    historyList.appendChild(li);
  });
}