const debug = true;
let creepFunctions = require("creep.functions");
let targetSelectors = require("functions.selectors");

var roleHarvester = {
  body: [1, 1, 1, 0, 0, 0, 0, 0, 10000],
  run: (creepName) => {
    const creep = Game.creeps[creepName];

    if (creep.spawning) {
      creep.memory.state = "harvesting";
      return;
    }


    const numberOfRepairTargets = targetSelectors.repairTargets(creep.room, 0.7).length;
    const numberOfRefuelingTargets = targetSelectors.refuelingTargets(creep.room).length;
    const freeCapacity = creep.store.getFreeCapacity();
    const energyStored = creep.store[RESOURCE_ENERGY];

    // Check if the state needs to be changed
    switch (creep.memory.state) {
      case "refueling":
        if (
          numberOfRefuelingTargets == 0 &&
          freeCapacity > 0 ||
          energyStored == 0
        ) {
          creep.memory.state = "harvesting";
          creep.say("harvest");
        } else if (
          numberOfRefuelingTargets == 0 &&
          freeCapacity == 0
        ) {
          creep.memory.state = "idling";
          creep.say("idle");
        } else if (
          creep.ticksToLive < 150
        ) {
          creep.memory.state = "renewing";
          creep.say("renew");
        }
        break;
      case "harvesting":
        if (
          freeCapacity == 0 &&
          numberOfRefuelingTargets == 0
        ) {
          creep.memory.state = "idling";
          creep.say("idle");
        } else if (freeCapacity == 0 &&
          numberOfRefuelingTargets > 0
        ) {
          creep.memory.state = "refueling";
          creep.say("refuel");
        } else if (
          creep.ticksToLive < 150
        ) {
          creep.memory.state = "renewing";
          creep.say("renew");
        }
        break;
      case "idling":
        if (numberOfRefuelingTargets > 0) {
          creep.memory.state = "refueling";
          creep.say("refuel");
        } else if (
          creep.ticksToLive < 150
        ) {
          creep.memory.state = "renewing";
          creep.say("renew");
        } else if (
          freeCapacity > 0 &&
          numberOfRepairTargets == 0
        ) {
          creep.memory.state = "harvesting";
          creep.say("harvest");
        } else {
          creep.memory.state = "renewing";
          creep.say("renew");
        }
        break;
      case "renewing":
        if (
          creep.ticksToLive > 1300 &&
          numberOfRefuelingTargets > 0
        ) {
          creep.memory.state = "harvesting";
          creep.say("harvest");
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
        break;
      case "renewing":
        creepFunctions.renewing(creep);
        break;
      default:
        console.log("Harvester State Error");
    }
  }
};

module.exports = roleHarvester;
