// import Employee class
const Employee = require("./Employee");

// class Manager that extends the Employee class
class Manager extends Employee {
  // constructor with name, id, email and officeNumber as parameters
  constructor(name, id, email, officeNumber) {
    // call super class with the parameters
    super(name, id, email);
    this.name = name;
    this.id = id;
    this.email = email;
    this.officeNumber = officeNumber;
  }

  // getOfficeNumber function that returns the office number
  getOfficeNumber() {
    return this.officeNumber;
  }

  // getRole function that returns string Manager
  getRole() {
    return "Manager";
  }
}

module.exports = Manager;
