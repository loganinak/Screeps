
const debug = true;

var roleUpgrader = {

  /** @param {Creep} creep **/
  run: (creepName) => {
    const creep = Game.creeps[creepName];

    if(creep.spawning) {
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
    return 0;
  }
};
