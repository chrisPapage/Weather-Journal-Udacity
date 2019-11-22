/* Global Variables */
/*
http://api.openweathermap.org/data/2.5/weather?zip=33101&APPID=f2ab89d6ef183deb5efe9945e297fe43
*/
const apiKey = "f2ab89d6ef183deb5efe9945e297fe43";
const baseUrl = "http://api.openweathermap.org/data/2.5/weather?zip=";

// Input values
const zipCode = document.getElementById("zip");
const keyInput = document.getElementById("key");
const feelingsInput = document.getElementById("feelings");
console.log(feelingsInput.textContent);
//Latest weather values
const userContent = document.getElementById("content");
const dateHolder = document.getElementById("date");
const tempHolder = document.getElementById("temp");

const postURL = "http://localhost:3000";
const getURL = "http://localhost:3000/all";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
console.log(newDate);
const getWeather = async (url, zip, api) => {
  const data = await fetch(url + `${zip}&units=metric&APPID=` + api);
  const response = await data.json();
  return response;
};

const postData = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  return await response;
};

const updateUI = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  userContent.innerHTML = `Message: ${data.content}`;
  dateHolder.innerHTML = `Date: ${data.date}`;
  tempHolder.innerHTML = `Temperature: ${data.temp}`;
};

const buttonClick = async () => {
  const weatherData = await getWeather(baseUrl, zipCode.value, apiKey);
  const data = {
    temp: weatherData.main.temp,
    date: newDate,
    content: feelingsInput.value
  };
  await postData(postURL, data);
  updateUI();
};

const element = document.getElementById("generate");
element.addEventListener("click", () => {
  if (!zipCode.value) {
    zipCode.value = 33101;
  }
  console.log("Button Clicked");
  getWeather(baseUrl, zipCode.value, apiKey).then(data => {
    console.log(`Temperature is ${data.main.temp}`);
    userContent.innerHTML = `Message: ${feelingsInput.value}`;
    dateHolder.innerHTML = `Date: ${newDate}`;
    tempHolder.innerHTML = `Temperature: ${data.main.temp}`;
  });
});
