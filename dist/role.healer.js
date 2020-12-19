const debug = true;
let creepFunctions = require("creep.functions");
let targetSelectors = require("functions.selectors");

var roleHealer = {
  body: [2, 0, 0, 0, 0, 1, 0, 1, 10000],
  run: (creepName) => {
    const creep = Game.creeps[creepName];

    if (creep.spawning) {
      creep.memory.state = "healing";
      return;
    }

    // Check if the state needs to be changed
    switch (creep.memory.state) {
      case "healing":
        break;
      default:
      console.log("Healer state error")
    }

    switch (creep.memory.state) {
      case "healing":
        // creepFunctions.healing(creep);
        break;
      default:
        console.log("Healer state error");
    }
  }
};

module.exports = roleHealer;
