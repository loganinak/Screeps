module.exports = {
  saveMyRoom: function(myRoomName) {
    var hostiles = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS);
    if (hostiles.length > 0) {
      Game.rooms[myRoomName].controller.activateSafeMode();
    }
  }
};
