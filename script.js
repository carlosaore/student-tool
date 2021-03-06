let students = [];
/* Commented out because this variable is now assigned with the import list method.
let students = ["Tim",
	"Pierre",
	"Elli",
	"Jana",
	"Josh",
	"Francis",
	"Liana",
	"Gauthier",
	"Elisa",
];
*/

/**
 * Removes all the child nodes from a node
 *
 * @param {Element} parent is the parent...
 *
 * **/

function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

/**
 * Returns a random whole integer between the min and max value
 *
 * @param {int} min is the minimum value
 * @param {int} max is the maximum value
 *
 * **/

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

/**
 * generateByGroups() sorts people into a set number of groups
 *
 * @param {string[]} students is an array of names (strings) to be assigned
 * @param {string} numberOfGroups is the number of groups to sort into
 *
 * **/

function generateByGroups(students, numberOfGroups) {
	// Deep copy of the students array
	const people = students.map((student) => student);
	// Edge cases
	if (!people.length) {
		return { msg: "List of people is empty!" };
	}

	if (numberOfGroups <= 0 || numberOfGroups > people.length) {
		return { msg: "Number of groups must be in range" };
	}

	// Setup the groups as empty arrays
	let result = [];
	for (let i = 0; i < numberOfGroups; i++) {
		result.push([]);
	}

	// While there are still people to allocate
	while (people.length) {
		// Loop through each group and add once person at a time
		for (let i = 0; i < numberOfGroups; i++) {
			// No more people? Get out of here
			if (!people.length) {
				break;
			}

			// Select a random index, push it into the group and remove it from the list of people
			let selected = getRandomInt(0, people.length);
			result[i].push(people[selected]);
			people.splice(selected, 1);
		}
	}

	// return the array of groups
	return result;
}

/**
 * generateByGroupSize() creates as many as it can with a fixed number of users
 *
 * @param {string[]} students is an array of names (strings) to be assigned
 * @param {string} sizeOfGroup is the number of people in each group
 *
 * **/

function generateByGroupSize(students, sizeOfGroup) {
	// Deep copy of the students array
	const people = students.map((student) => student);
	// Edge cases
	if (!people.length) {
		return { msg: "List of people is empty!" };
	}

	if (sizeOfGroup <= 0 || sizeOfGroup > people.length) {
		return { msg: "Number of groups must be in range" };
	}

	// Setup
	let result = [];
	let count = 0;

	// While there are still people to allocate
	while (people.length) {
		// Create a new group array
		result.push([]);

		// Loop through each group and add once person at a time
		for (let i = 0; i < sizeOfGroup; i++) {
			// No more people? Get out of here
			if (!people.length) {
				break;
			}

			// Select a random index, push it into the group and remove it from the list of people
			let selected = getRandomInt(0, people.length);
			result[count].push(people[selected]);
			people.splice(selected, 1);
		}
		count++;
	}

	// return the array of groups
	return result;
}

/**
 * Populate the student select list
 * 
 * @param {string[]} studentList is an array of names (strings) to be assigned*
 * 
 */
function populateStudentList(studentList) {
	for(let i = 0; i < studentList.length; i++) {
		let newOption = new Option(studentList[i],studentList[i]);
		studentSelectBox.add(newOption);
	}
	return true;
}

// HTML DOM queries
const grpList = document.getElementById("grp-list");
const nbGrpForm = document.getElementById("nb-grp-form");
const grpSizeForm = document.getElementById("grp-size-form");
const alertMessage = document.getElementById("alert");
const studentSelectBox = document.getElementById("student-select");

/** Submit Button code for the number by group form */

nbGrpForm.onsubmit = function (event) {
	// List of students (Not sure why but it needs to be here!)

	// Prevent default page reloading
	event.preventDefault();

	// Remove any previous list items on the DOM
	removeAllChildNodes(grpList);

	// How many groups does the user want? then call the function
	const nbGrpLabel = document.getElementById("nb-grp-label"); // number
	const temp = generateByGroups(students, nbGrpLabel.value);

	// If the generate function generated an error, give it to the user, otherwise reset
	if (temp.msg) {
		alertMessage.innerText = temp.msg;
		return;
	}

	alertMessage.innerText = "";

	// Loop through and create an LI tag for each group
	for (let i = 0; i < temp.length; i++) {
		let myElement = document.createElement("li");

		// Join the arrays together with a space between and add to list
		myElement.innerText = temp[i].join(" ");
		grpList.appendChild(myElement);
	}
};

/** Submit Button code for the group size form */
grpSizeForm.onsubmit = function (event) {
	// Prevent default page reloading
	event.preventDefault();

	// Remove any previous list items on the DOM
	removeAllChildNodes(grpList);

	// How many groups does the user want? then call the function
	const grpSizeLabel = document.getElementById("grp-size-label"); // number
	const temp = generateByGroupSize(students, grpSizeLabel.value);

	// If the generate function generated an error, give it to the user, otherwise reset
	if (temp.msg) {
		alertMessage.innerText = temp.msg;
		return;
	}

	alertMessage.innerText = "";

	// Loop through and create an LI tag for each group
	for (let i = 0; i < temp.length; i++) {
		let myElement = document.createElement("li");

		// Join the arrays together with a space between and add to list
		myElement.innerText = temp[i].join(" ");
		grpList.appendChild(myElement);
	}
};

/* Submit button code to import the list of student from a comma separated string */
let importButton = document.getElementById("import-button");

 importButton.addEventListener("click", function (event) {
	// Prevent default page reloading
	event.preventDefault();

	const importList = document.getElementById("import-list").value;
	students = importList.split(",");
	// Refresh the number of student:
	document.getElementById("grp-size").innerHTML = students.length.toString();
	// Refresh the selectStudentList:
	console.log("populateStudentList: " + populateStudentList(students));

	/* Not sure it is useful
	if (confirm(`Please confirm that the list is correct: ${students}`)) {
		console.log("import ok");
	  } else {
		console:log("import failure");
	}
	*/

 });

// Remove the selected student:
let removeButton = document.getElementById("remove-button");

removeButton.addEventListener("click", function (event) {
	// Prevent default page reloading
	event.preventDefault();

	console.log(document.getElementById("student-select").value);

 });
