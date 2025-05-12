// Task: Create an object representing a book and demonstrate your understanding of objects
// Create a book object with the following properties:// - title (string)
// - author (string)// - yearPublished (number)
// - genres (array of strings)
// - isAvailable (boolean)// - numberOfPages (number)
// Then, perform the following operations:// 1. Add a new property called "rating" with a value between 1 and 5
// 2. Create a method called "toggleAvailability" that changes the isAvailable property// 3. Create a method called "addGenre" that adds a new genre to the genres array
// 4. Print out all the properties and their values using a for...in loop// 5. Create an array of three book objects with different properties
// Your code here:
const book = {
	title: "The guide to osteology",
	author: "Mufti_Ibn_Al_Khattab",
	yearPublished: 2025,
	genres: ["medicine", "anatomy"],
	isAvailable: false,
	numberOfPages: 30,

	toggleAvailability: function () {
		this.isAvailable = !this.isAvailable;
	},

	addGenre: function (genre) {
		this.genres.push(genre);
	}
};

// Add a new property called "rating" with a value between 1 and 5
book.rating = 4;

book.addGenre("science");
console.log(book.genres);

// Print out all the properties and their values using a for...in loop
for (let key in book) {
	console.log(`${key}: ${book[key]}`);
}

// Create an array of three book objects with different properties
// const booksArray = [
// 	{
// 		title: "The guide to osteology",
// 		author: "Mufti_Ibn_Al_Khattab",
// 		yearPublished: 2025,
// 		genres: ["medicine", "anatomy"],
// 		isAvailable: false,
// 		numberOfPages: 30,
// 		rating: 4,
// 		toggleAvailability: function () {
// 			this.isAvailable = !this.isAvailable;
// 		}
// 	},
// 	{
// 		title: "Understanding Biology",
// 		author: "Jane Doe",
// 		yearPublished: 2020,
// 		genres: ["biology", "science"],
// 		isAvailable: true,
// 		numberOfPages: 250,
// 		rating: 5,
// 		toggleAvailability: function () {
// 			this.isAvailable = !this.isAvailable;
// 		}
// 	},
// 	{
// 		title: "Advanced Chemistry",
// 		author: "John Smith",
// 		yearPublished: 2018,
// 		genres: ["chemistry", "science"],
// 		isAvailable: true,
// 		numberOfPages: 300,
// 		rating: 3,
// 		toggleAvailability: function () {
// 			this.isAvailable = !this.isAvailable;
// 		}
// 	}
// ];
