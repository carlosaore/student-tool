// List of students
const students = [
  "Tim",
  "Pierre",
  "Elli",
  "Jana",
  "Josh",
  "Francis",
  "Liana",
  "Gaunthier",
  "Elisa"
];


// Generates a whole integer between limits
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
};


// Calculate how many groups based on the number of students and how many people per group
function byPeople(peoplePerGroup) {
  const people = students;
  const numberOfGroups = Math.ceil(people.length / peoplePerGroup);
  return generate(people, numberOfGroups, peoplePerGroup);
};


// Calculate how many groups based on the number of students and how many people per group
function byGroups(numberOfGroups) {
  const people = students;
  console.log(people);
  const peoplePerGroup = Math.ceil(people.length / numberOfGroups);
  return generate(people, numberOfGroups, peoplePerGroup);
};


// Group making code
function generate(people, numberOfGroups, peoplePerGroup) {
  let result = [];
  

  // Loop through the number of groups
  for (let i = 0; i < numberOfGroups; i++) {
    let group = [];

    // Add each person to the group
    for (let x = 0; x < peoplePerGroup; x++) {

      // Randomize a person from the remaining list
      let selected = getRandomInt(0, people.length);

      // Push that person into the new group array, and remove them from people list
      group.push(people[selected]);
      people.splice(selected, 1);

      // If there are no people left to assign, stop looping
      if (people.length === 0) {
        break;
      }
    }
    result.push(group);

  }
  return result;
};




console.log(byGroups(3));
console.log(byGroups(3));
console.log(byGroups(3));




// Add code for button
const studentList = document.querySelector("ul");

// When the user clicks on the button
form.onsubmit = function (event) {

  // prevent default page reloading
  event.preventDefault();

  // remove any previous list items
  removeAllChildNodes(studentList);

  // How many groups does the user want? call the function
  const number = document.querySelector("#number");
  const temp = byGroups(number.value);

  // Loop through and create an LI tag for each group
  for (i=0; i<temp.length; i++) {
    let myElement = document.createElement("li");

    // Join the arrays together with a space between and add to list
    myElement.innerText = temp[i].join(" ");
    studentList.appendChild(myElement);
  }
};




// Used to remove existing nodes
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
};


