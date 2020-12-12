const debug = true;
let creepFunctions = require("creep.functions");
let targetSelectors = require("functions.selectors");

var roleHealer = {

  /** @param {Creep} creep **/
  run: (creepName) => {
    const creep = Game.creeps[creepName];

    if (creep.spawning) {
      creep.memory.state = "healing";
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
        // creepFunctions.attacking(creep);
        break;
      default:
        console.log("Attacker State Error");
    }
  }
};

module.exports = roleMiner;
