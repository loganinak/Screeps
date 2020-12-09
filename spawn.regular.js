const debug = true;

var spawnRegular = {
  /** @param {string, number, number, number} name **/
  run: function(name, roles) {
    // Get reference to spawn
    const spawn = Game.spawns[name];

    // Count creeps of each type
    let count = {
      "harvester": 0,
      "upgrader": 0,
      "builder": 0,
      "scout": 0};

    Object.keys(roles).forEach((role) => {
      const creepsOfRole = _.filter(Game.creeps, (creep) => creep.memory.role == role);
      count[role] = creepsOfRole.length;
    });
    console.log("Creeps of each type: " + count);

    // Count construction
    const constructionCount = spawn.room.find(FIND_CONSTRUCTION_SITES).length;

    // Get energy values
    const energyAvailable = Game.spawns[name].room.energyAvailable;
    const energyCapacityAvailable = Game.spawns[name].room.energyCapacityAvailable

    // Decide which creep to spawn
    if (!spawn.spawning && count["harvester"] < Memory.harvesters && energyAvailable >= 300) {
      spawnCreep("harvester", spawn, roles["harvester"]);
    } else if (!spawn.spawning && count["upgrader"] < Memory.upgraders && energyAvailable == energyCapacityAvailable) {
      spawnCreep("upgrader", spawn, roles["upgrader"]);
    } else if (!spawn.spawning && constructionCount > 0 && count["builder"] < Memory.builder && energyAvailable == energyCapacityAvailable) {
      spawnCreep("builder", spawn, roles["builder"]);
    } else if (!spawn.spawning && count["scout"] < Memory.scout && energyAvailable > roles["scout"][8]) {
      spawnCreep("scout", spawn, roles["scout"]);
    }

    if (Game.spawns[name].spawning) {
      var spawningCreep = Game.creeps[Game.spawns[name].spawning.name];
      Game.spawns[name].room.visual.text(
        '🛠️' + spawningCreep.memory.role,
        Game.spawns[name].pos.x + 1,
        Game.spawns[name].pos.y, {
          align: 'left',
          opacity: 0.8
        });
    }
  }
}

function spawnCreep(role, spawn, bodyRatio) {
  // Make creep information
  const newName = role + Game.time;
  const bodyParts = optimizeCreepBody(bodyRatio, spawn);

  // Spawn creep
  const result = spawn.spawnCreep(bodyParts, newName, {
    memory: {
      state: role,
      idleTime: 0,
      timeAlive: 0
    }
  });

  // Record errors
  if (debug && result == OK) {
    console.log('Spawning new ' + role + ': ' + newName);
  } else {
    console.log('spawnCreep Error: ' + result);
  }
}

function optimizeCreepBody(roleRatios, spawn) {
  const partCost = {
    "move": 50,
    "work": 100,
    "carry": 50,
    "attack": 80,
    "ranged_attack": 150,
    "heal": 250,
    "claim": 600,
    "tough": 10
  };

  const ratios = {
    "move": roleRatios[0],
    "work": roleRatios[1],
    "carry": roleRatios[2],
    "attack": roleRatios[3],
    "ranged_attack": roleRatios[4],
    "heal": roleRatios[5],
    "claim": roleRatios[6],
    "tough": roleRatios[7]
  };

  // Set max energy to be used for creep
  const maxEnergy = roleRatios[8];

  // ratioCost is the energy it costs to add 1 set of the body parts based on the ratio
  let ratioCost = 0;
  let parts = [];
  const spawnEnergy = spawn.room.energyAvailable;
  let energyUsed = 0;
  // console.log("spawnEnergy: " + spawnEnergy);

  // figure out Total and cost
  Object.keys(partCost).forEach((partType) => {
    ratioCost += partCost[partType] * ratios[partType];
  });

  if (debug) {
    console.log("ratios.TOUGH: " + ratios["tough"] + ", spawnEnergy: " + spawnEnergy);
  }

  let energyLeft = spawnEnergy;
  // While it's still possible to fit more parts
  while (ratios["tough"] >= 1 && energyLeft >= 0 && energyLeft <= 10 || (ratios["tough"] == 0 && energyLeft >= 50)) {
    energyLeft = spawnEnergy - energyUsed;

    // If there is energy left and adding another ratio will not make it go over maxEnergy
    if (energyLeft >= ratioCost && ratioCost + energyUsed <= maxEnergy) {
      // Add the amount from the ratios array
      Object.keys(ratios).forEach((partType) => {
        if (ratios[partType] > 0) {
          for (i = 0; i < ratios[partType]; i++) {

            parts.push(partType);
          }
        }
      });

      // Keep track of energy
      energyUsed += ratioCost;

    } else {
      // Add what can fit
      Object.keys(ratios).forEach((partType) => {
        if (partCost[partType] <= spawnEnergy) {
          parts.push(partType);
          energyUsed = energyUsed + partCost[partType];
        }
      });
      // console.log("spawnEnergy: " + spawnEnergy);
    }
  }

  return parts
}

module.exports = spawnRegular;
