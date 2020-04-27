const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const path = require("path");
const fs = require("fs");
const inquirer = require("inquirer");
const render = require("./lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// create questions for inquirer prompt
const questions = [
  {
    type: "input",
    name: "name",
    message: "What is your name?",
  },
  {
    type: "input",
    name: "id",
    message: "What is your id?",
  },
  {
    type: "input",
    name: "email",
    message: "What is your email?",
  },
  {
    type: "list",
    name: "role",
    message: "What is your role?",
    choices: ["Manager", "Engineer", "Intern"],
  },
  {
    // ask when Manager is chosen for the role
    type: "input",
    name: "officeNumber",
    message: "What is your office number?",
    when: function (answers) {
      return answers.role === "Manager";
    },
  },
  {
    // ask when Engineer is chosen for the role
    type: "input",
    name: "github",
    message: "What is your GitHub username?",
    when: function (answers) {
      return answers.role === "Engineer";
    },
  },
  {
    // ask when Intern is chosen for the role
    type: "input",
    name: "school",
    message: "Where do you go to school?",
    when: function (answers) {
      return answers.role === "Intern";
    },
  },
  {
    // ask if user wants to input more employees
    type: "confirm",
    name: "again",
    message: "Add more Employee?",
    default: true,
  },
];

// helper function to recursively prompt the user to add more employees.
async function createEmployees(employeesInput = []) {
  try {
    const { again, ...answers } = await inquirer.prompt(questions);
    // newEmployee that takes in the employeesInput array called in the function and the answers from the prompt
    const newEmployee = [...employeesInput, answers];
    // if user wants to add more employees, call createEmployees function. if not, return newEmployee
    return again ? createEmployees(newEmployee) : newEmployee;
  } catch (err) {
    throw err;
  }
}

async function init() {
  try {
    const employees = [];
    const employeesData = await createEmployees();

    // map through the employees data and create an object based on the role
    employeesData.map((employee) => {
      const { name, id, email, role, officeNumber, github, school } = employee;

      if (role === "Manager") {
        const newManager = new Manager(name, id, email, officeNumber);
        // push newManager object to employees array
        employees.push(newManager);
      } else if (role === "Engineer") {
        const newEngineer = new Engineer(name, id, email, github);
        // push newEngineer object to employees array
        employees.push(newEngineer);
      } else {
        const newIntern = new Intern(name, id, email, school);
        // push newIntern object to employees array
        employees.push(newIntern);
      }
    });

    // call render function to take in employees array as a parameter
    const renderEmployee = render(employees);
    // write the renderedEmployee data to the path "./output/team.html"
    fs.writeFile(outputPath, renderEmployee, () => console.log("SUCCESS!"));
  } catch (err) {
    // catch the errors
    throw new Error(err);
  }
}

init();
