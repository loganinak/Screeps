const debug = true;

var roleScout = {

  /** @param {Creep} creep **/
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
