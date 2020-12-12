const debug = true;

let towerFunctions = require("tower.functions");

var roleUpgrader = {

  /** @param {structure} structure **/
  run: (structureName) => {
    const tower = Game.structures[structureName];

    if(!Memory[structureName]) {
      Memory[structureName].state = "idling";
    }

    // Check if the state needs to be changed
    switch (Memory[structureName].state) {
      case "idling":
        break;
      default:
        console.log("tower change state error")
    }

    // run state
    switch (creep.memory.state) {
      case "idling":
        towerFunctions.idling(tower);
        break;
      default:
        console.log("tower state error")
    }

    return 0;
  }
};

module.exports = roleUpgrader;
