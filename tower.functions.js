
let selectors = require("functions.selectors");
const towerFunctions = {
  "idling": (tower) => {
    const repairTarget = tower.pos.findClosestByRange(selectors.repairTargets(creep));
    const repairResult = tower.repair(repairTarget);

    if (repairResult != OK) {
      console.log("Tower idling repari error: " + repairResult);
    }
  }
}
module.exports = towerFunctions;
