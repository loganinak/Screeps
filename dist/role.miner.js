const debug = true;
let creepFunctions = require("creep.functions");
let targetSelectors = require("functions.selectors");

var roleMiner = {
  body: [1, 1, 0, 0, 0, 0, 0, 0, 10000],
  run: (creepName) => {
    const creep = Game.creeps[creepName];

    if (creep.spawning) {
      creep.memory.state = "mining";
      return;
    }

    // Check if the state needs to be changed
    switch (creep.memory.state) {
      case "mining":
        if (creep.ticksToLive < 150) {
          creep.memory.state = "renewing";
          creep.say("renewing");
        }
        break;
      case "renewing":
        if (creep.ticksToLive >= 1400) {
          creep.memory.state = "mining";
          creep.say("mining");
        }
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

module.exports = roleMiner;
