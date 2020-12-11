const debug = true;
let creepFunctions = require("creep.functions");

var roleBuilder = {

  /** @param {Creep} creep **/
  run: (creepName) => {
    const creep = Game.creeps[creepName];

    if (creep.spawning) {
      return;
    }

    // check if state needs to be changed
    switch (creep.memory.state) {
      case "building":
        if (creep.store[RESOURCE_ENERGY] == 0) {
          creep.memory.state = "harvesting";
          creep.say('🔄 harvest');
        } else if (
          creep.ticksToLive < 150
        ) {
          creep.memory.state = "renewing";
          creep.say("renew");
        }
        break;
      case "harvesting":
        if (creep.store.getFreeCapacity() == 0) {
          creep.memory.state = "building";
          creep.say('🚧 build');
        } else if (
          creep.ticksToLive < 150
        ) {
          creep.memory.state = "renewing";
          creep.say("renew");
        }
        break;
      case "renewing":
        if (
          creep.ticksToLive > 1300
        ) {
          creep.memory.state = "harvesting";
          creep.say("harvest");
        }
        break;
      default:
        system.log("Builder change state error")
    }

    // run state
    switch (creep.memory.state) {
      case "building":
        creepFunctions.building(creep);
        break;
      case "harvesting":
        creepFunctions.harvesting(creep);
        break;
      case "renewing":
        creepFunctions.renewing(creep);
        break;
      default:
        console.log("builder state error")
    }
  }
};

module.exports = roleBuilder;
