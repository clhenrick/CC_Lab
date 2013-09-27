/*
Madlib generator for CC Lab
Chris Henrick
Fall 2013, Parsons MFA DT
*/

// To do: make a button to change the values and put document.write inside a function!

// arrays for blanks
var mammals = ['dog', 'cat', 'platypus', 'dik dik', 'talingrade', 'sloth', 'wolverine', 'marmot'];
var dessert = ['carrot cake', 'filet minon', 'apple pie', 'bread pudding', 'cheese cake', 'pudding'];
var celebrity = ['Snoop Dawg', 'Axel Rose', 'Rihanna', 'Joe Biden', 'Alicia Keys', 'Jay Z'];
var dance = ['twerk', 'square dance', 'electric slide', 'harlem shake', 'vogue', 'break dance', 'robot']
var number = Math.floor(Math.random() * 101);

// write some stuff to the page
document.write(
	"<h1> The " + "<i>" + mammals[Math.floor(Math.random() * mammals.length)] + "</i>" + 
	" ate the " + "<i>" + dessert[Math.floor(Math.random() * dessert.length)] + "</i>" +
	" while " + "<i>" + celebrity[Math.floor(Math.random() * celebrity.length)] + "</i>" +
	" did the " + "<i>" + dance[Math.floor(Math.random() * dance.length)] + " </i>" +
	"<i>" + number + "</i>" + " times!" + "</h1>"
	);

function reLoad(){
	location.reload()
}