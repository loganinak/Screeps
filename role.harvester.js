const debug = true;

var roleHarvester = {

  /** @param {Creep} creep **/
  run: function(creepName) {
    const creep = Game.creeps[creepName];

    if(creep.spawning) {
      return;
    }

    // check state
    if (creep.memory.state == "refueling" && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.state = "harvesting";
      creep.say("harvest");
    }
    if (creep.memory.state == "harvesting" && creep.store.getFreeCapacity() == 0) {
      creep.memory.state = "refueling";
      creep.say("refuel");
    }

    switch (creep.memory.state) {
      case "refueling":
        refueling(creep);
        break;
      case "harvesting":
        harvesting(creep);
        break;
      default:
        console.log("Harvester State Error");
    }
  }
};

function refueling(creep) {
  // Get refueling targets
  const targets = creep.room.find(FIND_STRUCTURES, {
    filter: (structure) => {
      return (structure.structureType == STRUCTURE_EXTENSION ||
          structure.structureType == STRUCTURE_SPAWN ||
          structure.structureType == STRUCTURE_TOWER) &&
        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
    }
  });

  // Try to transfer to target
  const transferResult = creep.transfer(targets[0], RESOURCE_ENERGY)

  // Try to move to target if not in arnge
  if (transferResult == ERR_NOT_IN_RANGE) {
    const moveToResult = creep.moveTo(targets[0], {
      visualizePathStyle: {
        stroke: '#ffffff'
      }
    });

    if (debug && moveToResult != 0 && moveToResult != -11) {
      console.log("Harvester moveTo transfer error: " + moveToResult + ", target: " + targets[0]);
    }
  } else if (transferResult != OK && targets.length > 0) {
    console.log("Harvester transfer error: " + result + ", creep name: " + creep.name);
    creep.moveTo(18, 21, {
      visualizePathStyle: {
        stroke: '#0000ff'
      }
    });
    creep.memory.idleTime += 1;
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

  module.exports = roleHarvester;
