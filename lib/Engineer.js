// import Employee class
const Employee = require("./Employee");

// class Engineer that extends the Employee class
class Engineer extends Employee {
  // constructor with name, id, email and github as parameters
  constructor(name, id, email, github) {
    // call super class with parameters from the class
    super(name, id, email);
    this.github = github;
  }

  // getRole function that returns string Engineer
  getRole() {
    return "Engineer";
  }

  // getGithub function that returns github username
  getGithub() {
    return this.github;
  }
}

module.exports = Engineer;
