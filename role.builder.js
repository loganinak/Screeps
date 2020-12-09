const debug = true;
let creepFunctions = require("role.generic");

var roleBuilder = {

  /** @param {Creep} creep **/
  run: (creepName) => {
    const creep = Game.creeps[creepName];

    if (creep.spawning) {
      return;
    }

    // check state
    if (creep.memory.state == "building" && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.state = "harvesting";
      creep.say('🔄 harvest');
    }
    if (creep.memory.state == "harvesting" && creep.store.getFreeCapacity() == 0) {
      creep.memory.state = "building";
      creep.say('🚧 build');
    }

    // run state
    switch (creep.memory.state) {
      case "building":
        creepFunctions.building(creep);
        break;
      case "harvesting":
        creepFunctions.harvesting(creep);
        break;
      default:
        console.log("builder state error")
    }
  }
};

module.exports = roleBuilder;
