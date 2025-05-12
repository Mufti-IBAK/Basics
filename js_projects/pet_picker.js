const input = require("prompt-sync")();

// Prompt user for their name
const name = input("What is your name? ");

// Ask if user wants to pick a pet
const choice = input("Do you want to pick a pet? ").toLowerCase();

if (choice == "yes") {
	petPicker(name);
} else {
	console.log("Oopss, you don't like pets.");
}

// Function to handle pet category selection and pet name selection
function petPicker(name) {
	console.log("Pick a pet!");
	console.log("=========");

	// Prompt user to select a pet category
	const petCategory = input("Select a pet category (Examples: Dogs, Cats) -> ").toLowerCase();

	console.log(`Dear ${name}, you have picked the ${petCategory} category.`);

	// Confirm if user wants to proceed with the chosen category
	const startGame = input("Are you sure you want to proceed? (yes/no) -> ").toLowerCase();

	if (startGame == "yes") {
		console.log("Let the game begin!");

		// Define arrays of pet names per category
		const petNamesByCategory = {
			dogs: ["Buddy", "Max", "Charlie", "Bella", "Lucy"],
			cats: ["Luna", "Oliver", "Leo", "Milo", "Chloe"],
			birds: ["Tweety", "Polly", "Kiwi", "Sunny", "Coco"],
			fish: ["Nemo", "Dory", "Bubbles", "Goldie", "Splash"]
		};

		// Check if the chosen category exists in the pet names object
		if (petCategory in petNamesByCategory) {
			const petNames = petNamesByCategory[petCategory];

			// Display pet names to choose from
			console.log("Select a pet name from the following options:");
			for (let i = 0; i < petNames.length; i++) {
				console.log(`${i + 1}. ${petNames[i]}`);
			}

			// Prompt user to select a pet name by number
			const nameChoice = input("Enter the number of your chosen pet name -> ");
			const nameIndex = parseInt(nameChoice) - 1;

			// Validate the selection and display the chosen pet name
			if (nameIndex >= 0 && nameIndex < petNames.length) {
				console.log(`Great choice! Your pet's name is ${petNames[nameIndex]}.`);
			} else {
				console.log("Invalid selection. Please try again.");
				// Restart pet name selection for the same category
				petPicker(name);
			}
		} else {
			console.log("Sorry, that pet category is not available. Please pick a different category.");
			// Restart pet category selection
			petPicker(name);
		}
	} else {
		console.log("Changed your mind? \nPick a different pet category.");
		// Restart pet category selection
		petPicker(name);
	}
}
