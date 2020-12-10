const debug = true;
let creepFunctions = require("creep.functions");
let targetSelectors = require("functions.selectors");

var roleHarvester = {

  /** @param {Creep} creep **/
  run: (creepName) => {
    const creep = Game.creeps[creepName];

    if (creep.spawning) {
      return;
    }


    let numberOfRefuelingTargets = targetSelectors.refuelingTargets(creep).length;

    // Check if the state needs to be changed
    switch (creep.memory.state) {
      case "refueling":
        if (
          numberOfRefuelingTargets == 0 &&
          creep.store.getFreeCapacity() > 0 ||
          creep.store[RESOURCE_ENERGY] == 0
        ) {
          creep.memory.state = "harvesting";
          creep.say("harvest");
        } else if (
          numberOfRefuelingTargets == 0 &&
          creep.store.getFreeCapacity() == 0
        ) {
          creep.memory.state = "idling";
          creep.say("idle");
        }
        break;
      case "harvesting":
        if (
          creep.store.getFreeCapacity() == 0 &&
          numberOfRefuelingTargets == 0
        ) {
          creep.memory.state = "idling";
          creep.say("idle");
        } else if (creep.store.getFreeCapacity == 0 &&
          numberOfRefuelingTargets > 0
        ) {
          creep.memory.state = "refueling";
          creep.say("refuel");
        }
        break;
      case "idling":
        if (numberOfRefuelingTargets > 0) {
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
      case "idling":
        creepFunctions.idling(creep);
      default:
        console.log("Harvester State Error");
    }
  }
};

module.exports = roleHarvester;
