let functionsSelectors = {
  refuelingTargets: (room) => {
    return room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return (structure.structureType == STRUCTURE_EXTENSION ||
            structure.structureType == STRUCTURE_SPAWN ||
            structure.structureType == STRUCTURE_TOWER
          ) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
      }
    });
  },
  repairTargets: (room, percentDamaged) => {
    return room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return structure.structureType == STRUCTURE_ROAD && structure.hits / structure.hitsMax <= percentDamaged;
      }
    });
  },
  pickupTargets: (room) => {
    return room.find(FIND_STRUCTURES, {
      filter: (structure) => {
        return structure.structureType == STRUCTURE_CONTAINER &&
        structure.store[RESOURCE_ENERGY] > 0;
      }
    });
  }
}

module.exports = functionsSelectors;
