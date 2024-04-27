// Weather App

const weatherform = document.querySelector(".weatherform");
const placeinput = document.querySelector(".placeinput");
const box = document.querySelector(".box");
const apikey = "";  // Enter Weather Api

weatherform.addEventListener("submit", async event => {

    event.preventDefault();

    const city = placeinput.value;

    if(city){
        try{
            const weatherData = await getWeatherdata(city);
            displayInfo(weatherData);
        }catch(error){
            console.error(error);
            displayError(error);
        }
    }else{
        displayError("Please enter correct city");
    }

});

async function getWeatherdata(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error("couldn't fetch weather data");
    }
    return await response.json();
}

function displayInfo(data){
    const {name: city, 
            main: {temp, humidity},
            weather: [{description, id}]} = data;

            box.textContent = "";
            box.style.display = "flex";

            const displayCity = document.createElement("h1");
            const displayTemp = document.createElement("p");
            const displayHumidity = document.createElement("p");
            const displayDesc = document.createElement("p");
            const Emoji = document.createElement("p");

            displayCity.textContent = city;
            displayTemp.textContent = `${((temp - 273.15) * 9/5 + 32).toFixed(1)}°F`;
            displayHumidity.textContent = `Humidity: ${humidity}%`;
            displayDesc.textContent = description;
            Emoji.textContent = getEmoji(id);

            displayCity.classList.add("displayCity");
            displayTemp.classList.add("displayTemp");
            displayHumidity.classList.add("displayHumidity");
            displayDesc.classList.add("displayDesc");
            Emoji.classList.add("Emoji");

            box.appendChild(displayCity);
            box.appendChild(displayTemp);
            box.appendChild(displayHumidity);
            box.appendChild(displayDesc);
            box.appendChild(Emoji);
}

function getEmoji(Weatherid){

    switch(true){
        case (Weatherid >= 200 && Weatherid < 300):
            return "⛈";
        case (Weatherid >= 300 && Weatherid < 400):
            return "🌧";
        case (Weatherid >= 500 && Weatherid < 600):
            return "🌧";
        case (Weatherid >= 600 && Weatherid < 700):
            return "❄";
        case (Weatherid >= 700 && Weatherid < 800):
            return "🌫";
        case (Weatherid === 800):
            return "🌞";
        case (Weatherid >= 801 && Weatherid < 810):
            return "☁";
        default:
            return "❓";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("displayErr");

    box.textContent = "";
    box.style.display = "flex";
    box.appendChild(errorDisplay);

}
