const debug = true;
let creepFunctions = require("creep.functions");

var roleScout = {
  body: [1, 0, 0, 0, 0, 0, 0, 5, 200],
  run: (creepName) => {
    const creep = Game.creeps[creepName];

    if(creep.spawning) {
      creep.memory.state = "scouting";
      return;
    }

    // Check if the state needs to be changed
    switch (creep.memory.state) {
      case "scouting":
        break;
      default:
      console.log("Scouting state error")
    }

    switch (creep.memory.state) {
      case "scouting":
        creepFunctions.scouting(creep);
        break;
      default:
        console.log("Attacker State Error");
    }

    return 0;
  }
};

module.exports = roleScout;
