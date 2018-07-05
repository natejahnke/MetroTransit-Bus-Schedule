var inquirer = require("inquirer");
const axios = require("axios");

inquirer
  .prompt([
    {
      type: "input",
      name: "route",
      message: "Enter bus route number."
    }
  ])
  .then(function(bus) {
    axios
      .get("http://svc.metrotransit.org/NexTrip/Directions/5?format=json")
      .then(function(direction) {
        const directionOne = direction.data[0].Text;
        const directionTwo = direction.data[1].Text;
        console.log(directionOne + " " + directionTwo);
      });
  });
