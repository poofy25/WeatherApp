const Temperature = document.querySelector(".Temperature");
const UpdateDate = document.querySelector(".LastUpdate")
const DescriptionDOM = document.querySelector(".Description");
const LocationDOM = document.querySelector(".Location");
const IconIMG = document.querySelector(".Icon-IMG")
const H_L = document.querySelector(".H-L")
const FeelsLikeDOM = document.querySelector(".FeelsLikeTemp")
const WS = document.querySelector(".WindSpeed");
const WD = document.querySelector(".Wind-Direction")

const Summary_Container = document.querySelector(".Summary-Container")
//PRECIPTATION
const FirstRainChanceDOM = document.querySelector(".stRainChance");
        const FirstSnowChanceDOM = document.querySelector(".stSnowChance");
        const SecondRainChanceDOM = document.querySelector(".ndRainChance");
        const SecondSnowChanceDOM = document.querySelector(".ndSnowChance");
        const ThirdRainChanceDOM = document.querySelector(".rdRainChance");
        const ThirdSnowChanceDOM = document.querySelector(".rdSnowChance");

const PrecipitationDay1DOM = document.querySelector(".Precipitation-Day-NumberOne");
const PrecipitationDay2DOM = document.querySelector(".Precipitation-Day-NumberTwo");

window.addEventListener("load", () => {

let long;
let lat;

if (navigator.geolocation){

navigator.geolocation.getCurrentPosition(position =>{

    const long = position.coords.longitude;
    const lat = position.coords.latitude;

    console.log(long);
    console.log(lat);
    const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8f891280b8msh97f5e47be9aeedfp126f7bjsn545322e02f10',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};
    
fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${lat}%2C${long}&days=3`, options)
    
        .then(data => data.json())
        .then(data => {

        console.log(data) ;
        const {current , forecast , location} = data;
        //FORECAST
        const {forecastday} = forecast;
        const First_FC = forecastday[0].day
        const Second_FC = forecastday[1].day
        const Third_FC = forecastday[2].day
        let day1dateraw = forecastday[1].date 
        let day2dateraw = forecastday[2].date 
        const day1dateArray = day1dateraw.split("-");
        const day2dateArray = day2dateraw.split("-");
        
       
        const months = ["None" , "Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec"];
        const AM_PM_Time =
         [
          "12PM" , "1AM" , "2AM" , "3AM" , "4AM" , "5AM" , "6AM"
          , "7AM" , "8AM" , "9AM" , "10AM" , "11AM" , "12AM"
          , "1PM" , "2PM" , "3PM" , "4PM" , "5PM" , "6PM"
          , "7PM" , "8PM" , "9PM" , "10PM" , "11PM" , "12PM"
        ] 
        
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

        PrecipitationDay1DOM.textContent = day1dateArray[2] + " " + months[day1dateArray[1]] 
        PrecipitationDay2DOM.textContent = day2dateArray[2] + " " + months[day2dateArray[1]]
    


//Current Time Data
        const {temp_c , cloud , humidity , feelslike_c, condition, wind_kph ,wind_dir , last_updated , uv , vis_km , pressure_mb         } = current;
        const {text} = condition
        const {name} = location



        const last_updated_Array = last_updated.split(/[\s,:]+/);
        const last_updated_hour = Number(last_updated_Array[1])
//Today Forecast
        const { maxtemp_c , mintemp_c} = First_FC


        //Hourly Forecast
        const TotalHours = document.querySelectorAll(".Hourly-Time");
        const TotalTemps = document.querySelectorAll(".Hourly-Temp");
        const Hourly_Images = document.querySelectorAll(".Hourly-Image");
        let IL = 0;
        for (var i = 1 ; i < TotalHours.length ; i++){
                let hour = last_updated_hour + i;
                
                if (hour <= 24 ) {
                       
                        TotalHours[i].textContent = AM_PM_Time[hour];
                } else if (hour > 24) {
                    
                    IL = IL + 1 ;
                    hour = IL;
                    TotalHours[i].textContent = AM_PM_Time[hour];
                }
           
        }
        let ILL = 0;
        for (var i = 1 ; i < TotalTemps.length ; i++){
               
                let hour = last_updated_hour + i;
                
                if (hour < 24 ) {
                     
                        
                           TotalTemps[i].textContent = " " + Math.round(forecastday[0].hour[hour].temp_c) + "°"
                        
                } else if (hour === 24){
                      
                                TotalTemps[i].textContent= " " + Math.round(forecastday[0].hour[0].temp_c) + "°"
                        
                } else if (hour > 24) {
                    
                    ILL = ILL + 1 ;
                    hour = ILL;
                    TotalTemps[i].textContent = " " + Math.round(forecastday[1].hour[hour].temp_c) + "°"
                    
                }

        }
        TotalTemps[0].textContent = " " + temp_c + "°"
        let IconCounter = 0;
for (var i = 0 ; i < Hourly_Images.length ; i++) {



                let hour = last_updated_hour + i;
          
            if (hour < 24 ) {
                     
                        
                Hourly_Images[i].src = forecastday[0].hour[hour].condition.icon
             
     } else if (hour == 24){
     
        Hourly_Images[i].src = forecastday[1].hour[0].condition.icon
            
     } else if (hour > 24) {
         
        IconCounter = IconCounter + 1 ;
         hour = IconCounter;
         Hourly_Images[i].src = forecastday[1].hour[hour].condition.icon
         
     }

}

Hourly_Images[0].src = current.condition.icon




//FORECAST 

const Forecast_Dates = document.querySelectorAll(".Forecast-Date");
const Forecast_Images = document.querySelectorAll(".Forecast-Image");
const Forecast_Highest_Temp = document.querySelectorAll(".Forecast-Day-Highest-Temp");
const Forecast_Lowest_Temp = document.querySelectorAll(".Forecast-Day-Lowest-Temp");


Forecast_Dates[1].textContent = day1dateArray[2] + " " + months[day1dateArray[1]] 
Forecast_Dates[2].textContent = day2dateArray[2] + " " + months[day2dateArray[1]] 

for (let i = 0 ; i < Forecast_Images.length ; i++){

Forecast_Images[i].src = forecastday[i].day.condition.icon

}

for (let i = 0 ; i < 3 ; i++){
    Forecast_Highest_Temp[i].textContent = "H: " + Math.round(forecastday[i].day.maxtemp_c) + "°"
    Forecast_Lowest_Temp[i].textContent =  "L: " + Math.round(forecastday[i].day.mintemp_c) + "°"
}

         //CLOUDS
        const CloundsTextDOM = document.querySelector(".CloudsPer")
        const HumidityTextDOM = document.querySelector(".HumidityPer")
        const Humidity_DewPoint_DOM = document.querySelector(".Humidity-DewPoint")
         //UV-Index
        const UV_Index = document.querySelector(".UV");
        const UV_Desc = document.querySelector(".UV_Desc")    

        if (uv >= 3 && uv <=5) {
                UV_Desc.textContent = "Moderate"
        } else if (uv >= 6 && uv <=7){
                UV_Desc.textContent = "High" 
        } else if (uv >= 8 && uv <=10){
                UV_Desc.textContent = "Very High"
        } else if (uv >= 11){
                UV_Desc.textContent = "Extreme" 
        } else {
                UV_Desc.textContent = "Low"
        }

         //SUNSET OR SUNRISE 

        const SunHeaderDOM = document.querySelector(".Sun_Header")
        const SunHourDOM = document.querySelector(".SunHour")
        const SunDescDOM = document.querySelector(".Sun_Desc")
        const SunRiseHour = forecastday[0].astro.sunrise;
        const SunSetHour = forecastday[0].astro.sunset;
        let SunHourSet;
        let Set_or_Rise; 

         const test = Number(SunSetHour.match(/[a-zA-Z]+|[0-9]+/g)[0]) + SunSetHour.match(/[a-zA-Z]+|[0-9]+/g)[2]

       console.log(test)

        for (let i = 0 ; i < AM_PM_Time.length ; i++){
                if (AM_PM_Time[i] == test){
                        SunHourSet  = i;
                }
        }
        if (last_updated_hour > SunHourSet){
                console.log("The sun already sat")
                SunHeaderDOM.textContent = "Sunrise"
                SunHourDOM.textContent = SunRiseHour
                SunDescDOM.textContent = "Sunset: " + SunSetHour
        }else{
                console.log("The sun should set")
                SunHeaderDOM.textContent = "Sunset"
                SunHourDOM.textContent = SunSetHour
                SunDescDOM.textContent = "Sunrise: " + SunRiseHour
        }



        //VISIBILITY CONTAINER 

        const Visibility = document.querySelector(".VisibilityKM");

        Visibility.textContent = vis_km + " km"
        
        

        //Pressure Container 

        const Pressure = document.querySelector(".PressureNumber")
        const PressureDesc = document.querySelector(".PressureDesc")

        Pressure.textContent = pressure_mb + "mb"

        if (pressure_mb < 1005){
                PressureDesc.textContent = "Low"
        } else if (pressure_mb > 1005 && pressure_mb < 1015){
                PressureDesc.textContent = "Moderate"
        } else if (pressure_mb > 1015 && pressure_mb < 1030){
                PressureDesc.textContent = "High"
        } else if (pressure_mb > 1050){
                PressureDesc.textContent = "Very High"
        }
 



        console.log(pressure_mb)
        UV_Index.textContent = uv
        Humidity_DewPoint_DOM.textContent = "The dew point is "+ forecastday[0].hour[last_updated_hour].dewpoint_c +"° right now."
        HumidityTextDOM.textContent = humidity + "%"
        CloundsTextDOM.textContent = cloud + "%"
        UpdateDate.textContent = "Last updated: " + last_updated
        LocationDOM.textContent = name
        WS.textContent = wind_kph + ""
        WD.textContent = wind_dir
        FeelsLikeDOM.textContent = feelslike_c + "°"
        DescriptionDOM.textContent = text  
        H_L.textContent = "H:" + maxtemp_c +"°" + " L:" + mintemp_c + "°"
        Temperature.textContent = temp_c + "°C";
})
        .catch(err => console.error(err));
        
        
})
 
}

})

