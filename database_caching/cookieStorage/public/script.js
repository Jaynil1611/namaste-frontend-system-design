// Function to read cookies from HTTP response
function getCookie(name) {
  const cookieName = name + "=";
  const cookies = document.cookie.split(";");
  let cookieValue = "";
  cookies.forEach((cookie) => {
    cookie = cookie.trim();
    console.log(cookie, cookieName);
    if (cookie.indexOf(cookieName) === 0) {
      cookieValue = cookie.split("=")[1];
      console.log(cookieValue);
      return;
    }
  });
  return cookieValue;
}

function setCookie(name, value, hours) {
  let expires = "";
  if (hours) {
    const date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    expires = `; expires=${date.toUTCString()}`;
  }
  document.cookie = `${name}=${value}${expires}; path=/`;
}

function eraseCookie(name) {
  document.cookie = `${name}=; Max-Age=-99999999`;
}

function setPreferences() {
  const preferences = document.getElementById("preferences").value;
  setCookie("userPreferences", preferences, 1); // Cookie expires in 1 hour

  // Display personalized recommendations based on preferences
  displayRecommendations(preferences);

  // Hide preferences form and show recommendations container
  document.getElementById("preferences-container").style.display = "none";
  document.getElementById("recommendations-container").style.display = "block";
}

// Function to read the user preferences cookie and display recommendations on load
function displayRecommendationsOnLoad() {
  const preferences = getCookie("userPreferences");
  if (preferences) {
    // Display personalized recommendations based on stored preferences
    displayRecommendations(preferences);

    // Hide preferences form and show recommendations container
    document.getElementById("preferences-container").style.display = "none";
    document.getElementById("recommendations-container").style.display =
      "block";
  }
}

// Function to display personalized recommendations based on user preferences
function displayRecommendations(preferences) {
  const recommendations = getRecommendations(preferences);
  document.getElementById("recommendations").innerText = recommendations;
}

// Function to log out a user
async function logoutUser() {
  // Clear user preferences cookie
  eraseCookie("userPreferences");

  await fetch("/logout");

  // Show preferences form and hide recommendations container
  document.getElementById("preferences-container").style.display = "block";
  document.getElementById("recommendations-container").style.display = "none";
}

// Function to get personalized recommendations based on user preferences
function getRecommendations(preferences) {
  switch (preferences) {
    case "movies":
      return "Check out the latest movies in theaters!";
    case "books":
      return "Explore these must-read books!";
    case "music":
      return "Listen to these trending music albums!";
    default:
      return "No recommendations available.";
  }
}

// Display recommendations on page load
window.onload = displayRecommendationsOnLoad;
