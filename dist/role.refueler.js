const debug = true;
let creepFunctions = require("creep.functions");
let targetSelectors = require("functions.selectors");

var roleRefueler = {
  body: [1, 0, 1, 0, 0, 0, 0, 0, 10000],
  run: (creepName) => {
    const creep = Game.creeps[creepName];

    if (creep.spawning) {
      creep.memory.state = "grabbing";
      return;
    }


    const numberOfRefuelingTargets = targetSelectors.refuelingTargets(creep.room).length;
    const freeCapacity = creep.store.getFreeCapacity();
    const energyStored = creep.store[RESOURCE_ENERGY];

    // Check if the state needs to be changed
    switch (creep.memory.state) {
      case "grabbing":
        if(
          freeCapacity == 0
        ) {
          creep.memory.state = "refueling";
          creep.say("refueling");
        }
        break;
      case "refueling":
        if(
          numberOfRefuelingTargets == 0 &&
          freeCapacity > 0 ||
          energyStored == 0
        ) {
          creep.memory.state = "grabbing";
          creep.say("grabbing");
        }
        break;
      default:
      console.log("Refueler state error")
    }

    switch (creep.memory.state) {
      case "grabbing":
        creepFunctions.grabbing(creep);
        break;
      case "refueling":
        creepFunctions.refueling(creep);
        break;
      default:
        console.log("Refueler state error");
    }
  }
};

module.exports = roleRefueler;
