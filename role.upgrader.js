const debug = true;
let creepFunctions = require("creep.functions");

var roleUpgrader = {

  /** @param {Creep} creep **/
  run: (creepName) => {
    const creep = Game.creeps[creepName];

    if (creep.spawning) {
      return;
    }

    // Check if the state needs to be changed
    switch (creep.memory.state) {
      case "upgrading":
        if (
          creep.store[RESOURCE_ENERGY] == 0
        ) {
          creep.memory.state = "harvesting";
          creep.say('harvest');
        } else if (
          creep.ticksToLive < 150
        ) {
          creep.memory.state = "renewing";
          creep.say("renew");
        }
        break;
      case "harvesting":
        if (
          creep.store.getFreeCapacity() == 0
        ) {
          creep.memory.state = "upgrading";
          creep.say('upgrade');
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
        console.log("upgrader change state error")
    }

    // run state
    switch (creep.memory.state) {
      case "upgrading":
        creepFunctions.upgrading(creep);
        break;
      case "harvesting":
        creepFunctions.harvesting(creep);
        break;
      case "renewing":
        creepFunctions.renewing(creep);
        break;
      default:
        console.log("upgrader state error")
    }

    return 0;
  }
};

module.exports = roleUpgrader;
