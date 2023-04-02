const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[ data-searchweather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(
  ".grant-location-container"
);
const searchForm = document.querySelector("[data-searchForm]");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

// initially variables need ???

let oldTab = userTab;
const API_KEY = " 3bd7040b8d4c81dfc89da3f5961beac7";
oldTab.classList.add("current-tab");


//Switching the Tab

function switchTab(newTab) {
  if (newTab != oldTab) {
    oldTab.classList.remove("current-tab");
    oldTab = newTab;
    oldTab.classList.add("current-tab");

    if(!searchForm.classList.contains("active")){
        // kya search form wala container is invisible , if yes then make it visible
        userInfoContainer.classList.remove("active");
        grantAccessContainer.classList.remove("active");
        searchForm.classList.add("active");
    }
    else{
        // main pehle search wale tab pr tha, ab your weather tab visible karna he
        searchForm.classList.remove("active");
        userInfoContainer.classList.remove("active");
        //ab main your weather tab me aagya hu, toh weather bhi disply karn padega, so let's check local storage first
        // for coordinates, if we haved them ther.
        getfromSessionStorage();
    }
  }
}
userTab.addEventListener("click", () => {
  // pass clicked tab as input
  switchTab(userTab);
});
searchTab.addEventListener("click", () => {
  // pass clicked tab as input parameter
  switchTab(searchTab);
});

// check if cordinates are already present in session storage
function getfromSessionStorage(){
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(! localCoordinates){
        // agar local coordinates nahi mile
        grantAccessContainer.classList.add("active");
    }
    else{
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }
}

 async function fetchUserWeatherInfo(coordinates){
    const {lat, lon}= coordinates;
    // make grantcontainer invisible
    grantAccessContainer.classList.remove("active");
    // make loader visible
    loadingScreen.classList.add("active");

    // API call
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_key}`)
        const data =  await response.JSON();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeatherInfo(data);

    } catch (error) {
        loadingScreen.classList.remove("active");
        apiErrorContainer.classList.add("active");
        apiErrorImg.style.display = "none";
        apiErrorMessage.innerText = `Error: ${error?.message}`;
        apiErrorBtn.addEventListener("click", fetchUserWeatherInfo);
    }
} 

function renderWeatherInfo (weatherInfo){
   // firstly, we have to fetch the element

   const cityName = document.querySelector("[data-cityName]");
   const countryIcon =  document.querySelector("[data-countryIcon ]");
   const desc =  document.querySelector("[data-weatherDesc]");
   const weatherIcon =  document.querySelector("[data-weatherIcon]");
   const temp = document.querySelector("[data-temp");
   const windspeed = document.querySelector("[data-windspeed]")
   const humidity = document.querySelector("[data-humidity]")
   const cloudiness = document.querySelector("[data-cloudiness]");

   // fetch values from weatherInfo object and put it UI elements

    cityName.innerText = weatherInfo?.name;
    

   
}