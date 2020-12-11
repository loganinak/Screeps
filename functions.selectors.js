let functionsSelectors = {
  refuelingTargets: (creep) => {
    return creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER
          ) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
      }
    });
  },
  repairTargets: (creep) => {
    return creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return structure.structureType == STRUCTURE_ROAD && structure.hits / structure.hitsMax < 0.10;
      }
    });
  }
}

module.exports = functionsSelectors;
