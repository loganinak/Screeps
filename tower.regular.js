const debug = true;

let towerFunctions = require("tower.functions");

var roleUpgrader = {

  /** @param {structure} structure **/
  run: (tower) => {

    if(!Memory[tower.id]) {
      Memory[tower.id] = "idling";
    }

    // Check if the state needs to be changed
    switch (Memory[tower.id]) {
      case "idling":
        break;
      default:
        console.log("tower change state error")
    }

    // run state
    switch (Memory[tower.id]) {
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
