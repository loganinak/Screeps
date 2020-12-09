const debug = true;

var roleGeneric = {
  harvesting: (creep) => {
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
        console.log("harvesting moveTo Error: " + moveToResult);
      }
    } else if (debug && harvestResult != OK) {
      console.log("harvesting Error: " + harvestResult);
    }
  },
  building: (creep) => {
    // Get possible build targets
    const targets = creep.room.find(FIND_CONSTRUCTION_SITES);

    // Check for valid build target
    if (targets.length > 0 && targets[0].my) {
      // Try to build
      const buildResult = creep.build(targets[0]);

      //  Try to move towards target if not in range
      if (buildResult == ERR_NOT_IN_RANGE) {
        const moveToResult = creep.moveTo(targets[0], {
          visualizePathStyle: {
            stroke: '#ffffff'
          }
        });
        // Record Errors
        if (debug && moveToResult != OK && moveToResult != ERR_TIRED) {
          console.log("Building moveTo Error: " + moveToResult);
        }
      } else if (debug && buildResult != OK) {
        console.log("Building error: " + buildResult);
      }
    } else {
      creep.moveTo(18, 21, {
        visualizePathStyle: {
          stroke: '#0000ff'
        }
      });
      creep.memory.idleTime += 1;
    }
  },
  upgrading: (creep) => {
    if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
      creep.moveTo(creep.room.controller, {
        visualizePathStyle: {
          stroke: '#ffffff'
        }
      });
    }
  },
  refueling: (creep) => {
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
        console.log("Refueling moveTo error: " + moveToResult);
      }
    } else if (transferResult != OK && targets.length > 0) {
      console.log("Refueling transfer error: " + result);
      creep.moveTo(18, 21, {
        visualizePathStyle: {
          stroke: '#0000ff'
        }
      });
      creep.memory.idleTime += 1;
    }
  }
};

module.exports = roleGeneric;
