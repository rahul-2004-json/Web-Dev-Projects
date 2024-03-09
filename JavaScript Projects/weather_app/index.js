/*
Asynchronous code allows the program to be executed immediately whereas the synchronous code will block further execution of the remaining code until it finishes the current one.

You, the chef, have a list of dishes to prepare (async function). For each dish, you might need different ingredients and cooking techniques. Instead of doing everything sequentially, you call your assistants (await) to help you with various tasks asynchronously. While they work on their assigned tasks, you can attend to other matters. Once each task is completed (promise resolved), you can continue with the next step.

For instance, you might ask your assistant to fetch fresh vegetables (await fetchVegetables()), and while they're doing that, you start marinating the meat. When the vegetables arrive, you can continue with the recipe.

In summary, async/await allows you to manage multiple tasks concurrently, just like how a chef delegates cooking tasks to assistants, making the entire process more efficient and manageable.


*/

const apikey = "26dd7733d25689d1102b3d25f7db3c5c";
const apiurl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");
const weathericon = document.querySelector(".weather-status");

async function checkWeather(city) {
  const response = await fetch(apiurl + city + `&appid=${apikey}`);

  //checking if city exists
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weathericon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weathericon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weathericon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weathericon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weathericon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

//calling the function when button is clicked
searchbtn.addEventListener("click", () => {
  checkWeather(searchbox.value);
});
