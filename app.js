var inquirer = require("inquirer");
var axios = require("axios");

var preguntas = [
  {
    type: "input",
    name: "route",
    message: "Enter bus route number."
  },
  {
    when: function(response) {
      axios
        .get(
          "http://svc.metrotransit.org/NexTrip/Directions/" +
            response.route +
            "?format=json"
        )
        .then(function(direction) {
          const directionOne = direction.data[0].Text;
          const directionTwo = direction.data[1].Text;
          console.log(directionOne + " " + directionTwo);
        });
    }
  },
  {
    type: "list",
    name: "direction",
    message: "Choose a direction.",
    choices: ["North", "South", new inquirer.Separator(), "East", "West"]
  },
  {
    type: "input",
    message: "stop",
    name: "stop",
    message: "Enter your stop ID on route."
  }
];
inquirer.prompt(preguntas, function(respuestas) {
  console.log(respuestas);
});
