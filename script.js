// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// https://openweathermap.org/img/wn/01n@2x.png




const weatherApi = {
    key:"bb36e8f55e54381a40587220521619c6",
    baseUrl:"https://api.openweathermap.org/data/2.5/weather?"
}



const searchInputBox = document.getElementById('input-box');
searchInputBox.addEventListener('keypress', (event) => {
    if(event.keyCode == 13){
    console.log(searchInputBox.value);
    getweatherReport(searchInputBox.value);
    document.querySelector('.weather-body').style.display = "block";
    }
});

//Getting the Weather Report

function getweatherReport(city)
{
    fetch(`${weatherApi.baseUrl}q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}



function showWeatherReport(weather)
{
    console.log(weather);

    let city = document.getElementById("city");
    city.innerHTML = `${weather.name}`;

    let temperature = document.getElementById("temp");
    temperature.innerHTML=`${Math.round(weather.main.temp)}&deg;C`;

    let minmaxtemp = document.getElementById("min-max");
    minmaxtemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (Min) / ${Math.ceil(weather.main.temp_max)}&deg;C (Max)`

    let weatherType = document.getElementById("weather");
    weatherType.innerHTML = `${weather.weather[0].main}` ;

    if(weatherType.textContent == 'Clear'){
        document.body.style.backgroundImage = 'url(./BG-DAY/clear.jpg)';
    }
    if(weatherType.textContent == 'Clouds'){
        document.body.style.backgroundImage = 'url(./BG-DAY/cloudy.jpg)';
    }
    if(weatherType.textContent == 'Haze'){
        document.body.style.backgroundImage = 'url(./BG-DAY/cloudy.jpg)';
    }
    if(weatherType.textContent == 'Rain'){
        document.body.style.backgroundImage = 'url(./BG-DAY/rainy.jpg)';
    }
    if(weatherType.textContent == 'Snow'){
        document.body.style.backgroundImage = 'url(./BG-DAY/snow.jpg)';
    }
    if(weatherType.textContent == 'Smoke'){
        document.body.style.backgroundImage = 'url(./BG-DAY/smoke.jpg)';
    }

    icons.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" alt="">
        </div>
    `
    setInterval(displayTime,1000);
    function displayTime()
    {
        let time = new Date();
        let hrs = time.getHours();
        let mins = time.getMinutes();
        let sec = time.getSeconds();
        let en = 'AM';

        if(hrs > 12){
            en = 'PM';
        }else{
            en = 'AM';
        }

        if(hrs > 12){
            hrs = hrs;
        }
        if(hrs == 0){
            hrs = 12;
        }
        if(hrs < 10){
            hrs = '0' + hrs;
        }
        if(mins < 10){
            mins = '0' + mins;
        }
        if(sec < 10){
            sec = '0' + sec;
        }
        document.getElementById("time").innerHTML = hrs + ':' + mins + ':' + sec + ' ' + en;
    }
}


//Date Update function
let d = document.getElementById("date");
let todayd = new Date();
d.innerHTML = manageDate(todayd); 
function manageDate(dateArg)
{
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}
