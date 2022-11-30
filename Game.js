const Temperature = document.querySelector(".Temperature");
const DescriptionDOM = document.querySelector(".Description");
const Location = document.querySelector(".Location");
const WS = document.querySelector(".WindSpeed");
const IconIMG = document.querySelector(".Icon-IMG")
const H_L = document.querySelector(".H-L")
const FeelsLikeDOM = document.querySelector(".FeelsLikeTemp")
window.addEventListener("load", () => {

let long;
let lat;

if (navigator.geolocation){

navigator.geolocation.getCurrentPosition(position =>{

    const long = position.coords.longitude;
    const lat = position.coords.latitude;

    console.log(long);
    console.log(lat);
    const api = `http://api.weatherapi.com/v1/forecast.json?key=bbf338ba66b347e6972174240222911&q=${lat} ${long}&days=3&aqi=yes&alerts=no`;
    fetch(api)
    
        .then(data => data.json())
        .then(data => {

        console.log(data) ;
        const {current , forecast} = data;
        const {forecastday} = forecast;
        const {temp_c , humidity , feelslike_c, condition} = current;
        const {text} = condition
        const {day} = forecastday[0]
        const {maxtemp_c} = day
        const {mintemp_c} = day
        FeelsLikeDOM.textContent = feelslike_c + "°"
        DescriptionDOM.textContent = text  
        H_L.textContent = "H:" + maxtemp_c +"°" + " L:" + mintemp_c + "°"
        Temperature.textContent = temp_c + "°C";
})
        .catch(err => console.error(err));
        
        
})
 
}

})