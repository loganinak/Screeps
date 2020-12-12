
const debug = true;
let creepFunctions = require("creep.functions");
let targetSelectors = require("functions.selectors");

var roleMiner = {

  /** @param {Creep} creep **/
  run: (creepName) => {
    const creep = Game.creeps[creepName];

    if (creep.spawning) {
      return;
    }


    const numberOfRepairTargets = targetSelectors.repairTargets(creep.room, 0.7).length;
    const numberOfRefuelingTargets = targetSelectors.refuelingTargets(creep.room).length;
    const freeCapacity = creep.store.getFreeCapacity();
    const energyStored = creep.store[RESOURCE_ENERGY];

    // Check if the state needs to be changed
    switch (creep.memory.state) {
      case "mining":
        if
        break;
      case "renewing":
        break;
      default:
      console.log("Miner state error")
    }

    switch (creep.memory.state) {
      case "mining":
        creepFunctions.mining(creep);
        break;
      case "renewing":
        creepFunctions.renewing(creep);
        break;
      default:
        console.log("Miner State Error");
    }
  }
};

module.exports = roleMIner;
