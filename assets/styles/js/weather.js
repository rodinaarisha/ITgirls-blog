const API_KEY = '4d0acb5c587ea09e45d027229439b325';

const inputSearchCity = document.getElementById('inputSearchCity');
const searchWeatherButton = document.getElementById('searchWeatherButton')


inputSearchCity.addEventListener("change", () => {
    cityName = inputSearchCity.value
    console.log( cityName)
});




searchWeatherButton.addEventListener('click', getWeather)

let cityName;
let lat;
let lon;
let geo;
async function getGeo(name){
   await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${API_KEY}`)
    .then((response)=>{
        if (!response.ok) {
            throw new Error('Request failed');
        }
      return  response.json();
    })
    .then((data)=>{
        lat = data[0].lat;
        lon = data[0].lon; 
     return geo
    })
    
}

async function getWeather(){
    try {
        let geoData = await getGeo(cityName);

        const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
        if (!weatherResponse.ok) {
            throw new Error('Request failed');
        }
        
        const weatherData = await weatherResponse.json();
        console.log(weatherData);
        return weatherData;
        
    } catch(error) {
        console.log(error);
    }
}


