// Shared pet picker logic for CLI and GUI

const petNamesByCategory = {
  dogs: ["Buddy", "Max", "Charlie", "Bella", "Lucy"],
  cats: ["Luna", "Oliver", "Leo", "Milo", "Chloe"],
  birds: ["Tweety", "Polly", "Kiwi", "Sunny", "Coco"],
  fish: ["Nemo", "Dory", "Bubbles", "Goldie", "Splash"]
};

const colors = ["brown", "black", "white", "golden", "spotted"];
const ages = ["baby", "young", "adult", "senior"];
const personalities = ["playful", "lazy", "friendly", "shy", "curious"];

// Function to get pet names by category
function getPetNames(category) {
  return petNamesByCategory[category] || [];
}

// Function to validate category
function isValidCategory(category) {
  return Object.keys(petNamesByCategory).includes(category);
}

// Function to get colors
function getColors() {
  return colors;
}

// Function to get ages
function getAges() {
  return ages;
}

// Function to get personalities
function getPersonalities() {
  return personalities;
}

if (typeof module !== "undefined") {
  module.exports = {
    getPetNames,
    isValidCategory,
    getColors,
    getAges,
    getPersonalities
  };
}
