const input = require("prompt-sync")();
const fs = require("fs");
const {
  getPetNames,
  isValidCategory,
  getColors,
  getAges,
  getPersonalities
} = require("./pet_picker_logic");

// Main function to start the pet picker game
function startGame() {
  // Load saved game data if available
  let savedData = loadGame();

  // If saved data exists, ask user if they want to continue or start new
  if (savedData) {
    const continueGame = input("Saved game found. Do you want to continue? (yes/no) ").toLowerCase();
    if (continueGame === "yes") {
      playGame(savedData);
      return;
    }
  }

  // Start a new game
  const name = input("What is your name? ");
  playGame({ name, pets: [], score: 0 });
}

// Function to play the game with user data
function playGame(userData) {
  console.log(`Welcome back, ${userData.name}!`);
  let playing = true;

  while (playing) {
    // Select pet category
    const petCategory = selectPetCategory(userData.name);
    if (!petCategory) break;

    // Select pet name based on category
    const petName = selectPetName(petCategory);
    if (!petName) break;

    // Select pet attributes
    const petAttributes = selectPetAttributes();

    // Create pet object
    const pet = {
      category: petCategory,
      name: petName,
      attributes: petAttributes,
      happiness: 50 // initial happiness score
    };

    // Add pet to user's pets
    userData.pets.push(pet);

    // Pet care tasks
    petCareTasks(pet);

    // Update score based on pet happiness
    userData.score += pet.happiness;

    // Ask if user wants to add another pet
    const addAnother = input("Do you want to add another pet? (yes/no) ").toLowerCase();
    if (addAnother !== "yes") {
      playing = false;
    }
  }

  // Save game data
  saveGame(userData);

  // Show final score
  console.log(`Thanks for playing, ${userData.name}! Your total score is ${userData.score}.`);
}

// Function to select pet category
function selectPetCategory(name) {
  console.log("Pick a pet category!");
  const categories = Object.keys(getPetNames(""));
  console.log(`Available categories: ${categories.join(", ")}`);
  const category = input(`Dear ${name}, select a pet category -> `).toLowerCase();

  if (isValidCategory(category)) {
    const confirm = input(`You picked ${category}. Proceed? (yes/no) `).toLowerCase();
    if (confirm === "yes") {
      return category;
    } else {
      console.log("Let's pick again.");
      return selectPetCategory(name);
    }
  } else {
    console.log("Invalid category. Please try again.");
    return selectPetCategory(name);
  }
}

// Function to select pet name based on category
function selectPetName(category) {
  const petNames = getPetNames(category);
  console.log("Select a pet name from the following options:");
  for (let i = 0; i < petNames.length; i++) {
    console.log(`${i + 1}. ${petNames[i]}`);
  }

  const choice = input("Enter the number of your chosen pet name -> ");
  const index = parseInt(choice) - 1;

  if (index >= 0 && index < petNames.length) {
    return petNames[index];
  } else {
    console.log("Invalid selection. Please try again.");
    return selectPetName(category);
  }
}

// Function to select pet attributes
function selectPetAttributes() {
  const colors = getColors();
  const ages = getAges();
  const personalities = getPersonalities();

  console.log("Select pet color:");
  for (let i = 0; i < colors.length; i++) {
    console.log(`${i + 1}. ${colors[i]}`);
  }
  const colorChoice = parseInt(input("Enter the number of your chosen color -> ")) - 1;

  console.log("Select pet age:");
  for (let i = 0; i < ages.length; i++) {
    console.log(`${i + 1}. ${ages[i]}`);
  }
  const ageChoice = parseInt(input("Enter the number of your chosen age -> ")) - 1;

  console.log("Select pet personality:");
  for (let i = 0; i < personalities.length; i++) {
    console.log(`${i + 1}. ${personalities[i]}`);
  }
  const personalityChoice = parseInt(input("Enter the number of your chosen personality -> ")) - 1;

  return {
    color: colors[colorChoice] || "unknown",
    age: ages[ageChoice] || "unknown",
    personality: personalities[personalityChoice] || "unknown"
  };
}

// Function for pet care tasks
function petCareTasks(pet) {
  console.log(`Time to take care of your pet ${pet.name}!`);

  const tasks = ["feed", "play", "groom"];
  for (const task of tasks) {
    const response = input(`Do you want to ${task} your pet? (yes/no) `).toLowerCase();
    if (response === "yes") {
      console.log(`You ${task}ed your pet.`);
      pet.happiness += 10;
    } else {
      console.log(`You skipped ${task}.`);
      pet.happiness -= 5;
    }
  }

  // Random event that can affect pet happiness
  randomEvent(pet);
}

// Function for random events affecting pet happiness
function randomEvent(pet) {
  const events = [
    { message: "Your pet found a new toy!", effect: 10 },
    { message: "Your pet is feeling sick.", effect: -15 },
    { message: "Your pet made a new friend!", effect: 5 },
    { message: "Your pet is scared by a loud noise.", effect: -10 }
  ];

  const event = events[Math.floor(Math.random() * events.length)];
  console.log(`Random event: ${event.message}`);
  pet.happiness += event.effect;

  // Clamp happiness between 0 and 100
  if (pet.happiness > 100) pet.happiness = 100;
  if (pet.happiness < 0) pet.happiness = 0;
}

// Function to save game data to a file
function saveGame(data) {
  const fs = require("fs");
  try {
    fs.writeFileSync("pet_game_save.json", JSON.stringify(data, null, 2));
    console.log("Game saved successfully.");
  } catch (error) {
    console.log("Error saving game:", error);
  }
}

// Function to load game data from a file
function loadGame() {
  const fs = require("fs");
  try {
    if (fs.existsSync("pet_game_save.json")) {
      const data = fs.readFileSync("pet_game_save.json", "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    console.log("Error loading saved game:", error);
  }
  return null;
}

// Start the game if run as CLI
if (require.main === module) {
  startGame();
}

module.exports = {
  startGame,
  playGame,
  selectPetCategory,
  selectPetName,
  selectPetAttributes,
  petCareTasks,
  randomEvent,
  saveGame,
  loadGame
};
