const Temperature = document.querySelector(".Temperature");
const UpdateDate = document.querySelector(".LastUpdate")
const DescriptionDOM = document.querySelector(".Description");
const LocationDOM = document.querySelector(".Location");
const IconIMG = document.querySelector(".Icon-IMG")
const H_L = document.querySelector(".H-L")
const FeelsLikeDOM = document.querySelector(".FeelsLikeTemp")
const WS = document.querySelector(".WindSpeed");

const FirstRainChanceDOM = document.querySelector(".stRainChance")
        const FirstSnowChanceDOM = document.querySelector(".stSnowChance")
        const SecondRainChanceDOM = document.querySelector(".ndRainChance")
        const SecondSnowChanceDOM = document.querySelector(".ndSnowChance")
        const ThirdRainChanceDOM = document.querySelector(".rdRainChance")
        const ThirdSnowChanceDOM = document.querySelector(".rdSnowChance")


window.addEventListener("load", () => {

let long;
let lat;

if (navigator.geolocation){

navigator.geolocation.getCurrentPosition(position =>{

    const long = position.coords.longitude;
    const lat = position.coords.latitude;

    console.log(long);
    console.log(lat);
    const api = `https://api.weatherapi.com/v1/forecast.json?key=bbf338ba66b347e6972174240222911&q=${lat} ${long}&days=3&aqi=yes&alerts=no`;
    fetch(api)
    
        .then(data => data.json())
        .then(data => {

        console.log(data) ;
        const {current , forecast , location} = data;
        //FORECAST
        const {forecastday} = forecast;
        const First_FC = forecastday[0].day
        const Second_FC = forecastday[1].day
        const Third_FC = forecastday[2].day
        console.log(forecastday) 

        //Precipitation Forecast

        const FirstRainChance = First_FC.daily_chance_of_rain
        const FirstSnowChance = First_FC.daily_chance_of_snow 

        const SecondRainChance = Second_FC.daily_chance_of_rain
        const SecondSnowChance = Second_FC.daily_chance_of_snow 

        const ThirdRainChance = Third_FC.daily_chance_of_rain
        const ThirdSnowChance = Third_FC.daily_chance_of_snow 

       //DOMS
        

       
        FirstRainChanceDOM.textContent =":" + FirstRainChance + "%"
        FirstSnowChanceDOM.textContent =":" + FirstSnowChance + "%"
        SecondRainChanceDOM.textContent =":" + SecondRainChance + "%"
        SecondSnowChanceDOM.textContent =":" + SecondSnowChance + "%"
        ThirdRainChanceDOM.textContent =":" + ThirdRainChance + "%"
        ThirdSnowChanceDOM.textContent =":" + ThirdSnowChance + "%"
console.log(FirstSnowChanceDOM , FirstRainChance)


//Current Time Data
        const {temp_c , humidity , feelslike_c, condition, wind_kph ,wind_dir , last_updated} = current;
        const {text} = condition
        const {name} = location
//Today Forecast
        const { maxtemp_c , mintemp_c} = First_FC
        




        UpdateDate.textContent = "Last updated: " + last_updated
        LocationDOM.textContent = name
        WS.textContent = `${wind_kph}km/h \n ${wind_dir}`
        FeelsLikeDOM.textContent = feelslike_c + "°"
        DescriptionDOM.textContent = text  
        H_L.textContent = "H:" + maxtemp_c +"°" + " L:" + mintemp_c + "°"
        Temperature.textContent = temp_c + "°C";
})
        .catch(err => console.error(err));
        
        
})
 
}

})