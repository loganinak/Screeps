const debug = true;
let creepFunctions = require("creep.functions");

var roleHarvester = {

  /** @param {Creep} creep **/
  run: (creepName) => {
    const creep = Game.creeps[creepName];

    if (creep.spawning) {
      return;
    }

    // Check if the state needs to be changed
    switch (creep.memory.state) {
      case "refueling":
        if (creep.store[RESOURCE_ENERGY] == 0) {
          creep.memory.state = "harvesting";
          creep.say("harvest");
        }
        break;
      case "harvesting":
        if (creep.store.getFreeCapacity() == 0) {
          creep.memory.state = "refueling";
          creep.say("refuel");
        }
        break;
      default:
        console.log("Harvester change state error");
    }

    switch (creep.memory.state) {
      case "refueling":
        creepFunctions.refueling(creep);
        break;
      case "harvesting":
        creepFunctions.harvesting(creep);
        break;
      default:
        console.log("Harvester State Error");
    }
  }
};

module.exports = roleHarvester;
