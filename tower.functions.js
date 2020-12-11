const towerFunctions = {
  "idling": (tower) => {
    const repairTarget = tower.pos.findClosestByPath(selectors.repairTargets(creep));
    const repairResult = tower.repair(repairTarget);

    if (repairResult != OK) {
      console.log("Tower idling repari error: " + repairResult);
    }
  }
}
module.exports = towerFunctions;
