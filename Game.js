const Temperature = document.querySelector(".Temperature");
const DescriptionDOM = document.querySelector(".Description");
const CityName = document.querySelector(".Location-Name");
const WS = document.querySelector(".WindSpeed");
const IconIMG = document.querySelector(".Icon-IMG")
const Time = document.querySelector(".Time")
window.addEventListener("load", () => {

let long;
let lat;

if (navigator.geolocation){

navigator.geolocation.getCurrentPosition(position =>{

    const long = position.coords.longitude;
    const lat = position.coords.latitude;

    console.log(long);
    console.log(lat);
    const api = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=5f4e6265aafe44b8a7bf0bc239944a37&include=hourly`;
    fetch(api)
    
        .then(data => data.json())
        .then(data => {

        console.log(data) 
        const { timezone , temp, weather , city_name, wind_spd , ob_time} = data.data[0]
        console.log(weather.description)
        console.log(temp)
        WS.textContent = "Wind speed: "+ wind_spd + "km/h"
        CityName.textContent = city_name 
        DescriptionDOM.textContent = weather.description
        Temperature.textContent = temp + " C"
        IconIMG.src = `https://www.weatherbit.io/static/img/icons/${weather.icon}.png`
        Time.textContent = "Time: " + ob_time
})
        .catch(err => console.error(err));
        
        
})
 
}

})