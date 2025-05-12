// GUI pet picker logic, uses shared pet_picker_logic.js

import {
  getPetNames,
  isValidCategory,
  getColors,
  getAges,
  getPersonalities
} from "./pet_picker_logic.js";

let playerName = "";
let currentPet = null;
let pets = [];
let score = 0;

const welcomeScreen = document.getElementById("welcome-screen");
const categoryScreen = document.getElementById("category-screen");
const nameScreen = document.getElementById("name-screen");
const attributesScreen = document.getElementById("attributes-screen");
const careScreen = document.getElementById("care-screen");
const summaryScreen = document.getElementById("summary-screen");
const finalScoreScreen = document.getElementById("final-score-screen");

const categoriesDiv = document.getElementById("categories");
const namesDiv = document.getElementById("names");
const carePetName = document.getElementById("care-pet-name");
const happinessDisplay = document.getElementById("happiness-display");
const summaryText = document.getElementById("summary-text");
const finalScoreText = document.getElementById("final-score-text");

document.getElementById("start-btn").addEventListener("click", () => {
  const nameInput = document.getElementById("player-name").value.trim();
  if (nameInput) {
    playerName = nameInput;
    welcomeScreen.classList.add("hidden");
    showCategoryScreen();
  } else {
    alert("Please enter your name.");
  }
});

function showCategoryScreen() {
  categoryScreen.classList.remove("hidden");
  categoriesDiv.innerHTML = "";
  Object.keys(getPetNames("")).forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
    btn.className = "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
    btn.addEventListener("click", () => {
      currentPet = { category: cat };
      categoryScreen.classList.add("hidden");
      showNameScreen(cat);
    });
    categoriesDiv.appendChild(btn);
  });
}

function showNameScreen(category) {
  nameScreen.classList.remove("hidden");
  namesDiv.innerHTML = "";
  getPetNames(category).forEach(name => {
    const btn = document.createElement("button");
    btn.textContent = name;
    btn.className = "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded";
    btn.addEventListener("click", () => {
      currentPet.name = name;
      nameScreen.classList.add("hidden");
      showAttributesScreen();
    });
    namesDiv.appendChild(btn);
  });
}

document.getElementById("attributes-next-btn").addEventListener("click", () => {
  const color = document.getElementById("color-select").value;
  const age = document.getElementById("age-select").value;
  const personality = document.getElementById("personality-select").value;
  currentPet.attributes = { color, age, personality };
  attributesScreen.classList.add("hidden");
  showCareScreen();
});

function showAttributesScreen() {
  attributesScreen.classList.remove("hidden");
}

function showCareScreen() {
  careScreen.classList.remove("hidden");
  carePetName.textContent = `Take care of your pet: ${currentPet.name}`;
  happinessDisplay.textContent = `Happiness: 50`;
  currentPet.happiness = 50;
  enableCareButtons(true);
}

function enableCareButtons(enabled) {
  document.getElementById("feed-btn").disabled = !enabled;
  document.getElementById("play-btn").disabled = !enabled;
  document.getElementById("groom-btn").disabled = !enabled;
  document.getElementById("care-done-btn").disabled = enabled;
}

document.getElementById("feed-btn").addEventListener("click", () => {
  updateHappiness(10, "You fed your pet.");
});
document.getElementById("play-btn").addEventListener("click", () => {
  updateHappiness(10, "You played with your pet.");
});
document.getElementById("groom-btn").addEventListener("click", () => {
  updateHappiness(10, "You groomed your pet.");
});
document.getElementById("care-done-btn").addEventListener("click", () => {
  pets.push(currentPet);
  score += currentPet.happiness;
  careScreen.classList.add("hidden");
  showSummaryScreen();
});

function updateHappiness(amount, message) {
  currentPet.happiness += amount;
  if (currentPet.happiness > 100) currentPet.happiness = 100;
  happinessDisplay.textContent = `Happiness: ${currentPet.happiness}`;
  alert(message);
  enableCareButtons(false);
  document.getElementById("care-done-btn").disabled = false;
}

function showSummaryScreen() {
  summaryScreen.classList.remove("hidden");
  summaryText.textContent = `You have ${pets.length} pet(s) with a total happiness score of ${score}.`;
}

document.getElementById("add-pet-btn").addEventListener("click", () => {
  summaryScreen.classList.add("hidden");
  showCategoryScreen();
});

document.getElementById("end-game-btn").addEventListener("click", () => {
  summaryScreen.classList.add("hidden");
  showFinalScoreScreen();
});

function showFinalScoreScreen() {
  finalScoreScreen.classList.remove("hidden");
  finalScoreText.textContent = `Thanks for playing, ${playerName}! Your final score is ${score}.`;
}
