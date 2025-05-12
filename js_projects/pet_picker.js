const input = require("prompt-sync")();
const name = input("what is your name? ");

const choice = input("Do you want to pick a pet? ").toLowerCase();

if (choice == "yes") {
	petPicker(name);
} else {
	console.log("Oopss, you don't like pets.");
}

function petPicker(name) {
	console.log("Pick a pet!");
	console.log("=========");
	const petCategory = input("Select a pet category (Examples; Dogs, Cats) -> ");

	console.log(`Dear ${name}, you have picked ${petCategory} category.`);
	const startGame = input(
		"Are you sure you want to proceed? (yes/no)->  "
	).toLowerCase();

	if (startGame == "yes") {
		console.log("Let the game begin!");
		return petCategory;
	} else {
		console.log("Changed your mind? \n Pick a different pet category.");
		petPicker(name);
	}
}
