var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleScout = require('role.scout');
var spawnRegular = require('spawn.regular');
var lastRestort = require('room.failsafe');

module.exports.loop = function() {
  // Initialize creep targets if there are none
  if (!Memory.harvesters) {
    Memory.harvesters = 1;
    Memory.builders = 1;
    Memory.upgraders = 1;
    Memory.scouts = 0;
    console.log("Initialized creep targets in memory");
  }

  // Set out roles and max energy usage (TODO)
  const roles = {
    "harvester": [2, 1, 1, 0, 0, 0, 0, 0, 10000],
    "upgrader": [2, 1, 1, 0, 0, 0, 0, 0, 10000],
    "builder": [2, 1, 1, 0, 0, 0, 0, 0, 10000],
    "scout": [1, 0, 0, 0, 0, 0, 0, 0, 50]
  };

  const creeps = Object.keys(Memory.creeps);
  const spawns = Object.keys(Game.spawns);

  // Cleanup memory
  creeps.map(creepName => {
    if (!Game.creeps[creepName]) {
      delete Memory.creeps[creepName];
      console.log('Clearing non-existing creep memory:', name);
    }
  });

  // For now assume there is only one room
  let roomName = Game.spawns[spawns[0]].room.name;

  // Run script to turn safeMode on if hostiles are in the room
  lastRestort.saveMyRoom(roomName);

  // Process spawners
  spawns.map(spawnName => {
    spawnRegular.run(spawnName, roles);
  });

  // Process creeps
  creeps.map(creepName => {
    // Get creep role
    const role = Game.creeps[creepName].memory.role;

    // Run code based on role
    switch (role) {
      case "harvester":
        // Memory.harvesters += roleHarvester.run(creep);
        roleHarvester.run(creepName);
        if (Memory.harvesters < 3) {
          Memory.harvesters = 3;
        }
        break;
      case "upgrader":
        // Memory.upgraders += roleUpgrader.run(creep);
        roleUpgrader.run(creepName);
        if (Memory.upgraders < 1) {
          Memory.upgraders = 1;
        }
        break;
      case "builder":
        // Memory.builders += roleBuilder.run(creep);
        roleBuilder.run(creepName);
        if (Memory.builders < 1) {
          Memory.builders = 1;
        }
        break;
      case "scout":
        // Memory.scouts += roleScout.run(creep);
        roleScout.run(creepName);
        break;
      default:
        console.log("Error in creep processor");
    }
  });
}
