const debug = true;

var roleBuilder = {

  /** @param {Creep} creep **/
  run: function(creepName) {
    const creep = Game.creeps[creepName];

    if(creep.spawning) {
      return;
    }

    // check state
    if (creep.memory.state == "building" && creep.store[RESOURCE_ENERGY] == 0) {
      creep.memory.state = "harvesting";
      creep.say('🔄 harvest');
    }
    if (creep.memory.state == "harvesting" && creep.store.getFreeCapacity() == 0) {
      creep.memory.state = "building";
      creep.say('🚧 build');
    }

    // run state
    switch (creep.memory.state) {
      case "building":
        building(creep);
        break;
      case "harvesting":
        harvesting(creep);
        break;
      default:
        console.log("builder state error")
    }
  }
};

function building(creep) {
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
      console.log("Building build error: " + buildResult);
    }
  } else {
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

  module.exports = roleBuilder;
