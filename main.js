var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleScout = require('role.scout');
var roleMiner = require('role.miner');
var roleRefueler = require('role.refueler');
var roleAttacker = require('role.attacker');
var roleHealer = require('role.healer');
var spawnRegular = require('spawn.regular');
var lastRestort = require('room.failsafe');
var towerRegular = require('tower.regular');

module.exports.loop = () => {
  let initialized = true;

  // Initialize creep targets if there are none
  if (!Memory.harvesters) {
    initialized = false;
    Memory.harvesters = 1;
  }
  if (!Memory.builders) {
    initialized = false;
    Memory.builders = 1;
  }
  if (!Memory.upgraders) {
    initialized = false;
    Memory.upgraders = 1;
  }
  if (!Memory.scouts) {
    initialized = false;
    Memory.scouts = 0;
  }
  if (!Memory.miners) {
    initialized = false;
    Memory.miners = 0;
  }
  if (!Memory.attackers) {
    initialized = false;
    Memory.attackers = 0;
  }
  if (!Memory.healers) {
    initialized = false;
    Memory.healers = 0;
  }
  if (!Memory.refuelers) {
    initialized = false;
    Memory.refuelers = 0;
  }

  if (!initialized) {
    Memory.roles = {
      "harvester": [1, 1, 1, 0, 0, 0, 0, 0, 10000],
      "upgrader": [1, 1, 1, 0, 0, 0, 0, 0, 10000],
      "builder": [1, 1, 1, 0, 0, 0, 0, 0, 10000],
      "scout": [1, 0, 0, 0, 0, 0, 0, 5, 200],
      "miner": [1, 1, 0, 0, 0, 0, 0, 0, 10000],
      "attacker": [2, 0, 0, 1, 0, 0, 0, 1, 10000],
      "healer": [2, 0, 0, 0, 0, 1, 0, 1, 10000],
      "refueler": [1, 0, 1, 0, 0, 0, 0, 0, 10000]
    }
  }

  // Set out roles and max energy usage (TODO)
  let creeps = Object.keys(Memory.creeps);
  const spawns = Object.keys(Game.spawns);
  let towers = Object.values(Game.structures).filter((structure) => {
    return structure.structureType == STRUCTURE_TOWER
  });

  // Cleanup memory
  creeps.map(creepName => {
    if (!Game.creeps[creepName]) {
      delete Memory.creeps[creepName];
      console.log('Clearing non-existing creep memory:', creepName);
    }
  });

  creeps = Object.keys(Memory.creeps);

  // For now assume there is only one room
  let roomName = Game.spawns[spawns[0]].room.name;

  // Run script to turn safeMode on if hostiles are in the room
  lastRestort.saveMyRoom(roomName);

  // Process spawners
  spawns.map(spawnName => {
    spawnRegular.run(spawnName, Memory.roles);
  });

  // Process towers
  towers.map(towerName => {
    towerRegular.run(towerName);
  });

  // Process creeps
  creeps.map(creepName => {
    // Get creep role
    const role = Game.creeps[creepName].memory.role;

    // Run code based on role
    switch (role) {
      case "harvester":
        roleHarvester.run(creepName);
        break;
      case "upgrader":
        roleUpgrader.run(creepName);
        break;
      case "builder":
        roleBuilder.run(creepName);
        break;
      case "scout":
        roleScout.run(creepName);
        break;
      case "miner":
        roleMiner.run(creepName);
        break;
      case "attacker":
        roleAttacker.run(creepName);
        break;
      case "healer":
        roleHealer.run(creepName);
        break;
      case "refueler":
        roleRefueler.run(creepName);
        break;
      default:
        console.log("Error in creep processor");
    }
  });
}
