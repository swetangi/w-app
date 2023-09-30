const api={
    key : "c50b8a1f872396174850793876295971",
    base:"https://api.openweathermap.org/data/2.5/",

}
const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress',setQuery);

function setQuery(event) {
    if (event.keyCode == 13) {
        getResults(searchBox.value);
        console.log(searchBox.value);
    }
}
function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`).then
    (weather=>{
        return weather.json();

    }).then(displayResults);
}

function displayResults(weather) {
    console.log(weather);
    let city =document.querySelector('.location .city')
    city.innerText = `${weather.name} , ${weather.sys.country}`;
    let now = new Date();
    let date=document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

  let temp=document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)} <span> *C </span>`;

     let weather_el=document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow=document.querySelector('.current .high-low');
    hilow.innerText =`${weather.main.temp_min}*c / ${weather.main.temp_max}*c` 
}

function dateBuilder(para) {
    let months =["January","February","march","april","may","June","July",
    "Augest","september","October","november","December"];
    let days =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

let day=days[para.getDay()];
let date=para.getDate();
let month = months[para.getMonth()];
let year = para.getFullYear();

return `${day} ${date} ${month} ${year}`
}