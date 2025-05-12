//function declaration
// Hoisted, stored, and available thruout the scope

function greetUser(name) {
	return `Hello ${name}`;
}
greetUser();
console.log(greetUser("Mufti"));

//function expression (anon funcs)
//not hoisted, stored as variable and only callable upon init

const getUser = function (user1, user2) {
	return `this is ${user1} and that is ${user2}`;
};
console.log(getUser("Mufti", "Ray"));

//arrow funcs
//lexical scopes, no this bnding, cannot be hoisted, implicit and explicit return... single param and no param forms

const sendReq = (req1, req2) => `my ${req1} is accepted and my ${req2} is not`;
console.log(sendReq("first request", "second request"));

// IIFE concurrent with Closures
// Private scopes, OLO, Useful for init

const remark = (function (user1, user2) {
	let userOne = "Mufti";
	let userTwo = "Ray";
	return {
		remark: () => `this is ${userOne} and that is ${userTwo}`
	};
})();

console.log(remark.remark());

// HOF - takes a function as a parameter
// First Class Citizens... Functional programming

function serviceCustomer(user, service, remark) {
	return remark(user, service);
}
const goodRemark = (user, service) => `It was nice ${service} with ${user}`;
const badRemark = (user, service) => `It was bad ${service} with ${user}`;

// console.log(goodRemark("Mufti", "Banking", goodRemark));
// console.log(badRemark("Ray", "Reading", badRemark));

const userNames = ["Musa", "Ahmad", "Fatimah", "Mufti"];
const services = ["cooking", "banking", "coding", "reading"];

// const greet = userNames.map(
// 	(users, index) => `It was nice ${services[index]} with ${users}`
// );

// console.log(greet);

// CallBack Funtions
// async and customization

function processUserInfo(holder) {
	let userName = "Mufti";
	let age = 25;
	const level = (age) => age / 5;

	holder(userName, age, level(age));
}
processUserInfo((userName, age, level) => {
	console.log(
		`this user's name is ${userName}, with age ${age} and in ${level}`
	);
});

//curry functions
