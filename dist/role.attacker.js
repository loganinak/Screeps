const debug = true;
let creepFunctions = require("creep.functions");
let targetSelectors = require("functions.selectors");

var roleAttacker = {
  body: [2, 0, 0, 1, 0, 0, 0, 1, 10000],
  run: (creepName) => {
    const creep = Game.creeps[creepName];

    if (creep.spawning) {
      creep.memory.state = "attacking";
      return;
    }

    // Check if the state needs to be changed
    switch (creep.memory.state) {
      case "attacking":
        break;
      default:
      console.log("Attacker state error")
    }

    switch (creep.memory.state) {
      case "attacking":
        creepFunctions.attacking(creep);
        break;
      default:
        console.log("Attacker State Error");
    }
  }
};

module.exports = roleAttacker;
