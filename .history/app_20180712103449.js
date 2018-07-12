var inquirer = require("inquirer");
var axios = require("axios");

inquirer
  .prompt([
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
  ])
  .then(function(bus) {
    let busDirection = 0;
    if (bus.direction === "South") {
      busDirection = 1;
    } else if (bus.direction === "East") {
      busDirection = 2;
    } else if (bus.direction === "West") {
      busDirection = 3;
    } else if (bus.direction === "North") {
      busDirection = 4;
    }
    axios
      .get(
        "http://svc.metrotransit.org/NexTrip/" +
          bus.route +
          "/" +
          busDirection +
          "/" +
          bus.stop +
          "?format=json"
      )
      .then(function(nextBus) {
        console.log(
          "The next bus heading " +
            bus.direction +
            "bound departs stop " +
            bus.stop +
            " in " +
            nextBus.data[0].DepartureText +
            "utes."
        );
      });
  });
