const debug = true;
let roleGeneric = require("role.generic");

var roleUpgrader = {

  /** @param {Creep} creep **/
  run: (creepName) => {
    const creep = Game.creeps[creepName];

    if (creep.spawning) {
      return;
    }

    // check state
    if (creep.memory.state == "upgrading" && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.state = "harvesting";
      creep.say('harvest');
    }
    if (creep.memory.state == "harvesting" && creep.store.getFreeCapacity() == 0) {
      creep.memory.state = "upgrading";
      creep.say('upgrade');
    }

    // run state
    switch (creep.memory.state) {
      case "upgrading":
        creepFunctions.upgrading(creep);
        break;
      case "harvesting":
        creepFunctions.harvesting(creep);
        break;
      default:
        console.log("upgrader state error")
    }

    return 0;
  }
};

module.exports = roleUpgrader;
