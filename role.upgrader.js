const debug = true;

var roleUpgrader = {

  /** @param {Creep} creep **/
  run: function(creepName) {
    const creep = creepName;
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
        upgrading(creep);
        break;
      case "harvesting":
        harvesting(creep);
        break;
      default:
        console.log("upgrader state error")
    }

    return 0;
  }
};

function upgrading(creep) {
  if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
    creep.moveTo(creep.room.controller, {
      visualizePathStyle: {
        stroke: '#ffffff'
      }
    });
  }
}

function harvesting(creep) {
  // Find sources
  const sources = creep.room.find(FIND_SOURCES);

  // Choose Source
  const source = sources[creep.name.charAt(creep.name.length - 1) % sources.length];

  // Try to harvest source
  const harvestResult = creep.harvest(source);

  // Move towards source if not in range
  if (harvestResult == ERR_NOT_IN_RANGE) {
    const moveToResult = creep.moveTo(source, {
        visualizePathStyle: {
          stroke: '#ffaa00'
        }
      });
      // Record Errors
      if (debug && moveToResult != OK && moveToResult != ERR_TIRED) {
        console.log("Building moveTo Error: " + moveToResult);
      }
    }
    else if (debug && harvestResult != OK) {
      console.log("Builder harvesting Error: " + harvestResult);
    }
  }

  module.exports = roleUpgrader;
