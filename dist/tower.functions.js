let selectors = require("functions.selectors");

const towerFunctions = {
  "idling": (tower) => {
    const repairTarget = tower.pos.findClosestByRange(selectors.repairTargets(tower.room, 1));
    const repairResult = tower.repair(repairTarget);

    if (repairResult != OK && repairTarget && repairResult != ERR_NOT_ENOUGH_ENERGY) {
      console.log("Tower idling repair error: " + repairResult);
    }
  }
}
module.exports = towerFunctions;
