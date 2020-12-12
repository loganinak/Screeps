const debug = true;
let selectors = require("functions.selectors");

let creepFunctions = {
  harvesting: (creep) => {
    // Find sources
    const sources = creep.room.find(FIND_SOURCES);

    // Choose Source
    const source = getRandTarget(creep, sources);

    // Try to harvest source
    const harvestResult = creep.harvest(source);

    // Move towards source if not in range
    if (harvestResult == ERR_NOT_IN_RANGE || ERR_NOT_ENOUGH_RESOURCES) {
      const moveToResult = creep.moveTo(source, {
        visualizePathStyle: {
          stroke: '#ffaa00'
        }
      });
      // Record Errors
      if (debug && moveToResult != OK && moveToResult != ERR_TIRED && moveToResult != ERR_NO_PATH) {
        console.log("harvesting moveTo Error: " + moveToResult);
      }
    } else if (debug && harvestResult != OK) {
      console.log("harvesting Error: " + harvestResult);
    }
  },
  mining: (creep) => {
    // Find Containers
    const containers = creep.room.find(FIND_STRUCTURES).filter((structure) => {
      return structure.structureType == STRUCTURE_CONTAINER;
    });

    // Choose one randomly
    const container = containers[creep.memory.randomFactor % containers.length];

    // Check if miner is on container
    if (container.pos.isEqualTo(creep.pos)) {
      // Find sources
      const sources = creep.room.find(FIND_SOURCES);

      // Choose Source
      const source = creep.pos.findClosestByPath(sources);

      // Try to harvest source
      const harvestResult = creep.harvest(source);

      // Record errors
      if (debug && harvestResult != OK) {
        console.log("Mining harvest error: " + harvestResult);
      }
    } else {
      const moveToResult = creep.moveTo(container, {
        visualizePathStyle: {
          stroke: '#ffaa00'
        }
      });
      // Record Errors
      if (debug && moveToResult != OK && moveToResult != ERR_TIRED && moveToResult != ERR_NO_PATH) {
        console.log("Mining moveTo error: " + moveToResult);
      }
    }
  },
  building: (creep) => {
    // Get possible build targets
    const targets = creep.room.find(FIND_CONSTRUCTION_SITES);

    const closestTarget = creep.pos.findClosestByPath(targets);

    // Check for valid build target
    if (targets.length > 0) {
      // Try to build
      const buildResult = creep.build(closestTarget);

      //  Try to move towards target if not in range
      if (buildResult == ERR_NOT_IN_RANGE) {
        const moveToResult = creep.moveTo(closestTarget, {
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
    const targets = selectors.refuelingTargets(creep.room);

    // Find the closest
    const closestTarget = creep.pos.findClosestByPath(targets);
    // Try to transfer to target
    const transferResult = creep.transfer(closestTarget, RESOURCE_ENERGY)

    // Try to move to target if not in arnge
    if (transferResult == ERR_NOT_IN_RANGE) {
      const moveToResult = creep.moveTo(closestTarget, {
        visualizePathStyle: {
          stroke: '#ffffff'
        }
      });

      if (debug && moveToResult != OK && moveToResult != ERR_TIRED) {
        console.log("Refueling moveTo error: " + moveToResult);
      }
    }
  },
  idling: (creep) => {
    const repairTarget = creep.pos.findClosestByPath(selectors.repairTargets(creep.room, 0.7));
    const repairResult = creep.repair(repairTarget);

    if (repairResult == ERR_NOT_IN_RANGE) {
      creep.moveTo(repairTarget.pos, {
        visualizePathStyle: {
          stroke: '#ff9515'
        }
      });
    }
  },
  renewing: (creep) => {
    const spawns = creep.room.find(FIND_MY_SPAWNS);
    const spawn = getRandTarget(creep, spawns);

    const renewCreepResult = spawn.renewCreep(creep);
    if (renewCreepResult == ERR_NOT_IN_RANGE) {
      const moveToResult = creep.moveTo(spawn, {
        visualizePathStyle: {
          stroke: '#0000ff'
        }
      });
    }
  },
  scouting: (creep) => {
    if (!creep.memory.xTarget) {
      creep.memory.xTarget = 25;
      creep.memory.yTarget = 25;
      creep.memory.roomTarget = creep.room;
    }

    const pos = new RoomPosition(creep.memory.xTarget, creep.memory.yTarget, creep.memory.roomTarget);
    const moveToResult = creep.moveTo(pos, {
      visualizePathStyle: {
        stroke: '#0000ff'
      }
    });
  }
};

// Choose a random target from a list based on name
function getRandTarget(creep, possibleTargets) {
  return possibleTargets[creep.name.charAt(creep.name.length - 1) % possibleTargets.length];
}

module.exports = creepFunctions;
