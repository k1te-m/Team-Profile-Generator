const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

// const whatRole = {
//   type: "list",
//   message: "Please select employee role.",
//   choices: ["Manager", "Engineer", "Intern"],
//   name: "role",
// };

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

const whatRole = [
  {
    type: "list",
    message: "Please select employee role for your next team member.",
    choices: ["Engineer", "Intern"],
    name: "role",
  },
];

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

const moreMembers = [
  {
    type: "confirm",
    message: "Would you like to add an additional team member?",
    name: "more",
  },
];

let team = [];
let moreTeam = false;

async function addMore(){
  const addToTeam = await inquirer.prompt(moreMembers);
  console.log(addToTeam.more);
  if (addToTeam.more === true){
    addMember();
  } else {
    fs.writeFile(outputPath, render(team), "utf8", function(error){
      if (error) throw error;
    });
  }
}

async function addMember() {
  const memberRole = await inquirer.prompt(whatRole);
  console.log(memberRole.role);
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
  // console.log("Please enter Engineer details.");
  // const engineerData = await inquirer.prompt(engineerQ);
  // const engineer = new Engineer(
  //   engineerData.name,
  //   engineerData.id,
  //   engineerData.email,
  //   engineerData.gitHub
  // );
  // team.push(engineer);
  addMore();
  

  
 
  
  // const addMoreMembers = await inquirer.prompt(moreMembers);
  // checkAddMembers(addMoreMembers);

  // const addMore = await inquirer.prompt(moreMembers);
  // if (addMore.more === true) {
  //   const newMember = await inquirer.prompt(whatRole);
  //   if (newMember.role === "Engineer") {
  //     const newEngineerData = await inquirer.prompt(engineerQ);
  //     const newEngineer = new Engineer(
  //       newEngineerData.name,
  //       newEngineerData.id,
  //       newEngineerData.email,
  //       newEngineerData.gitHub
  //     );
  //     team.push(newEngineer);
  //   } else {
  //     const newInternData = await inquirer.prompt(internQ);
  //     const newIntern = new Intern(
  //       newInternData.name,
  //       newInternData.id,
  //       newInternData.email,
  //       newInternData.school
  //     );
  //     team.push(newIntern);
  //   }
  // }

}

function init() {
  beginProfile();
}

init();






// Code written without async/await

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
