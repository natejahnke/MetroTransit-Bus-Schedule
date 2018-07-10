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
      choices: ["1", "South", new inquirer.Separator(), "East", "West"]
    },
    {
      type: "input",
      message: "stop",
      name: "stop",
      message: "Enter your stop ID on route."
    }
  ])
  .then(function(bus) {
    console.log(bus.route);
    axios.get(
      "http://svc.metrotransit.org/NexTrip/" +
        bus.route +
        "/" +
        bus.direction +
        "/" +
        bus.stop +
        "?format=json"
    );
  });
