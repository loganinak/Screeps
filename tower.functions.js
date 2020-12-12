let selectors = require("functions.selectors");

const towerFunctions = {
  "idling": (tower) => {
    const repairTarget = tower.pos.findClosestByRange(selectors.repairTargets(tower.room));
    const repairResult = tower.repair(repairTarget);

    if (repairResult != OK && repairTarget) {
      console.log("Tower idling repair error: " + repairResult);
    }
  }
}
module.exports = towerFunctions;
