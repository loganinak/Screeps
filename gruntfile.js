module.exports = function(grunt) {

  var config = require('./.screeps.json');
  var branch = grunt.option('branch') || config.branch;

  grunt.loadNpmTasks('grunt-screeps');

  grunt.initConfig({
    screeps: {
      options: {
        email: config.email,
        token: config.token,
        branch: branch,
        // server: 'season'
      },
      dist: {
        files: [{
          src: ['dist/*.js'],
        }]
      }
    }
  });
}
