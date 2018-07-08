var inquirer = require("inquirer");
var axios = require("axios");

var questions = [
  {
    type: "input",
    name: "route",
    message: "Enter bus route number.",
    when: function(value) {
      if (value.length) {
        axios
          .get(
            "http://svc.metrotransit.org/NexTrip/Directions/" +
              value +
              "?format=json"
          )
          .then(function(direction) {
            const directionOne = direction.data[0].Text;
            const directionTwo = direction.data[1].Text;
            console.log(directionOne + " " + directionTwo);
          });
      }
    }
  },
  {
    type: "list",
    name: "direction",
    message: "Choose the bus direction.",
    choices: ["${directionOne}, ${directionTwo}]
  }
];

inquirer.prompt(questions, function(answers) {
  console.log(answers);
});

// .then(function(bus) {
//   axios
//     .get("http://svc.metrotransit.org/NexTrip/Directions/5?format=json")
//     .then(function(direction) {
//       const directionOne = direction.data[0].Text;
//       const directionTwo = direction.data[1].Text;
//       console.log(directionOne + " " + directionTwo);
//     });
// });
