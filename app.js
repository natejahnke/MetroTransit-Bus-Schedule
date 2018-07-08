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
    if (direction0ne || directionTwo === "NORTHBOUND" || "SOUTHBOUND") {
    choices: ["North", "South",] }
    else {["East", "West"]
  }
  }
  {
    type: "checkbox",
    message: "Servicios Publicos",
    name: "servicios",
    choices: [
      {
        name: "Agua",
        checked: true
      },
      {
        name: "Luz"
      },
      {
        name: "Internet"
      }
    ]
  }
];
inquirer.prompt(preguntas, function(respuestas) {
  console.log(respuestas);
});
