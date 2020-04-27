// import Employee class
const Employee = require("./Employee");

// class Intern that extends the Employee class
class Intern extends Employee {
  // constructer with name, id, email and school as a parameter
  constructor(name, id, email, school) {
    // call super class with the parameters
    super(name, id, email);
    this.school = school;
  }

  // getSchool function that returns the school name
  getSchool() {
    return this.school;
  }

  // getRole function that returns string Intern
  getRole() {
    return "Intern";
  }
}

module.exports = Intern;
