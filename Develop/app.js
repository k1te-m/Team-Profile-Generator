const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Initial inquirer prompt questions for the manager
const managerQ = [
  {
    type: "input",
    message: "What is your name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is your employee ID number?",
    name: "id",
  },
  {
    type: "input",
    message: "What is your email address?",
    name: "email",
  },
  {
    type: "input",
    message: "What is your current office number?",
    name: "num",
  },
];

//Prompt for selecting role of new team members
const whatRole = [
  {
    type: "list",
    message: "Please select employee role for your next team member.",
    choices: ["Engineer", "Intern"],
    name: "role",
  },
];

//Prompts for new engineer
const engineerQ = [
  {
    type: "input",
    message: "What is the engineer's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is their employee ID number?",
    name: "id",
  },
  {
    type: "input",
    message: "What is their email address?",
    name: "email",
  },
  {
    type: "input",
    message: "What is their GitHub username?",
    name: "gitHub",
  },
];

//Prompts for a new intern
const internQ = [
  {
    type: "input",
    message: "What is the intern's name?",
    name: "name",
  },
  {
    type: "input",
    message: "What is their employee ID number?",
    name: "id",
  },
  {
    type: "input",
    message: "What is their email address?",
    name: "email",
  },
  {
    type: "input",
    message: "What school are they affilated with?",
    name: "school",
  },
];

//Prompt for additional team members
const moreMembers = [
  {
    type: "confirm",
    message: "Would you like to add an additional team member?",
    name: "more",
  },
];

// Array to contain all employees
let team = [];

//async function that prompts user if they would like to add more members, if yes add member funciton is called and user is further prompted, if no the team array is passed through the render function which is then written to the team.html defined in outputPath
async function addMore(){
  const addToTeam = await inquirer.prompt(moreMembers);
  if (addToTeam.more === true){
    addMember();
  } else {
    fs.writeFile(outputPath, render(team), "utf8", function(error){
      if (error) throw error;
    });
  }
}

// Async function for adding an additional member to the team. Called when user selects yes in the previous addMore function. Prompts different questions based on the role of the new member. User inputs are then pushed to the team array and the add more function is called keeping the user in a loop of adding users until they select no
async function addMember() {
  const memberRole = await inquirer.prompt(whatRole);
    switch (memberRole.role) {
      case "Engineer":
        inquirer.prompt(engineerQ).then((engineerData) => {
          const engineer = new Engineer(
            engineerData.name,
            engineerData.id,
            engineerData.email,
            engineerData.gitHub
          );
          team.push(engineer);
          addMore();
        });
        break;
      case "Intern":
        inquirer.prompt(internQ).then((internData) => {
          const intern = new Intern(
            internData.name,
            internData.id,
            internData.email,
            internData.school
          );
          team.push(intern);
          addMore();
        });
        break;
    }
  };


//Async function that prompts the intial manager questions, answers are pushed to the team array and addMore function is called
async function beginProfile() {
  console.log("Welcome Manager! Please build out your team.");
  const managerData = await inquirer.prompt(managerQ);
  const manager = new Manager(
    managerData.name,
    managerData.id,
    managerData.email,
    managerData.num
  );
  team.push(manager);
  addMore();
}

//function to initialize the application
function init() {
  beginProfile();
}

init();






// Initial Code written without async/await

// console.log("Welcome Manager! Please build out your team.");
// inquirer.prompt(managerQ).then((managerData) => {
//   const manager = new Manager(
//     managerData.name,
//     managerData.id,
//     managerData.email,
//     managerData.num
//   );
//   team.push(manager);
//   console.log("Please enter Engineer details.");
//   inquirer.prompt(engineerQ).then((engineerData) => {
//     const engineer = new Engineer(
//       engineerData.name,
//       engineerData.id,
//       engineerData.email,
//       engineerData.gitHub
//     );
//     team.push(engineer);
//     console.log(team);
//     inquirer.prompt(moreMembers).then((yn) => {
//       if (yn.more === "Yes") {
//         inquirer.prompt(whatRole).then((response) => {
//           switch (response.role) {
//             case "Engineer":
//               inquirer.prompt(engineerQ).then((engineerData) => {
//                 const engineer = new Engineer(
//                   engineerData.name,
//                   engineerData.id,
//                   engineerData.email,
//                   engineerData.gitHub
//                 );
//                 team.push(engineer);
//                 console.log(team);
//                 render(team);
//               });
//               break;
//             case "Intern":
//               inquirer.prompt(internQ).then((internData) => {
//                 const intern = new Intern(
//                   internData.name,
//                   internData.id,
//                   internData.email,
//                   internData.school
//                 );
//                 team.push(intern);
//                 console.log(team);
//                 render(team);
//               });
//               break;
//           }
//         });
//       } else {
//         addMoreMembers = false;
//         console.log(addMoreMembers);
//         render(team);
//       }
//     });
//   });
// });
