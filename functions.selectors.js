let functionsSelectors = {
  refuelingTargets: (structure) => {
    return (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER ||
            structure.structureType == STRUCTURE_CONTAINER ||
            structure.structureType == STRUCTURE_STORAGE
          ) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
  }
};

module.exports = functionsSelectors;
