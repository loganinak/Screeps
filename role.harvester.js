const debug = true;
let creepFunctions = require("role.generic");

var roleHarvester = {

  /** @param {Creep} creep **/
  run: (creepName) => {
    const creep = Game.creeps[creepName];

    if (creep.spawning) {
      return;
    }

    // check state
    if (creep.memory.state == "refueling" && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.state = "harvesting";
      creep.say("harvest");
    }
    if (creep.memory.state == "harvesting" && creep.store.getFreeCapacity() == 0) {
      creep.memory.state = "refueling";
      creep.say("refuel");
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
