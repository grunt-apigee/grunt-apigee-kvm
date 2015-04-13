/*
 * grunt-apigee-kvm
 * https://github.com/grunt-apigee/grunt-apigee-kvm
 *
 * Copyright (c) 2015 dzuluaga
 * Licensed under the Apache-2.0 license.
 */

 'use strict';

 module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
      'Gruntfile.js',
      'tasks/*.js',
      '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    apigee_kvm: {
        "testmyapi-test" : {
          options: {
            type: "env"
          },
          files: [{src: ['config/kvm/testmyapi/testmyapi-test/*.json']},
          ]
        },
        "testmyapi-prod" : {
          options: {
            type: "env"
          },
          files: [{src: ['config/kvm/testmyapi/testmyapi-prod/*.json']},
          ]
        },
        "testmyapi" : {
          options: {
            type: "org"
          },
          files: [{src: ['config/kvm/testmyapi/*.json']},
          ]
        }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });
  var env = grunt.option('env') || 'test';
  var org = grunt.option('org') || 'testmyapi';
  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('importKVMs', ['apigee_kvm:' + org + '-' + env, 'apigee_kvm:' + org]);
  grunt.registerTask('test', ['clean', 'importKVMs'/*, 'nodeunit'*/]);



  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
