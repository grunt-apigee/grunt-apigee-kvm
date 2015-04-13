/*
 * grunt-apigee-kvm
 * https://github.com/grunt-apigee/grunt-apigee-kvm
 *
 * Copyright (c) 2015 dzuluaga
 * Licensed under the Apache-2.0 license.
 */

'use strict';
var request = require('request');
var async = require('async');
var curl = require('curl-cmd');
var apigeeSdk = require('apigee-sdk-mgmt-api');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  function upsertKVM(filepath, cb2){
    if(filepath.options.type === 'env'){
      apigeeSdk.getKVMsEnvironment(grunt.config.get("apigee_profiles"),
        function(error, response, body){
          grunt.log.debug(response.statusCode);grunt.log.debug(body);
          upsertKVMList(body, filepath, cb2);
        }, grunt.option('curl'));
    }else if(filepath.options.type === 'org'){
      apigeeSdk.getKVMsOrganization(grunt.config.get("apigee_profiles"),/*{'test' : {url_mgmt : 'https://api.enterprise.apigee.com', org : grunt.option('org'), env : grunt.option('env'), username : grunt.option('username'), password : grunt.option('password')}, env : grunt.option('env')},*/
        function(error, response, body){
          grunt.log.debug(response.statusCode);grunt.log.debug(body);
          upsertKVMList(body, filepath, cb2);
        }, grunt.option('curl'));
    }
  }

  function upsertKVMList(body, filepath, cb2){//error, response, body){
    /*jshint validthis:true */
    var kvmImport = grunt.file.readJSON(filepath.filepath);
    var kvmExisting = JSON.parse(body);
    var kvmIndex =  kvmExisting.indexOf(kvmImport.name);
    if(kvmExisting.indexOf(kvmImport.name) !== -1){ //kvm to be imported when it already exists
      updateKVM(filepath, cb2);
    }
    else{
      createKVM(filepath, cb2);
    }
  }

  function updateKVM(filepath, cb2){ /*kvmImport,*/
      var kvmImport = grunt.file.readJSON(filepath.filepath);
      if(filepath.options.type === 'env'){
        apigeeSdk.updateKVMsEnvironment(grunt.config.get("apigee_profiles"),/*{'test' : {url_mgmt : 'https://api.enterprise.apigee.com', org : grunt.option('org'), env : grunt.option('env'), username : grunt.option('username'), password : grunt.option('password')}, env : grunt.option('env')},*/
          kvmImport,
          function(error, response, body){
            grunt.log.debug(response.statusCode);grunt.log.debug(body);
            cb2(error);
          },
          grunt.option('curl'));
      }else if(filepath.options.type === 'org'){
        apigeeSdk.updateKVMsOrganization(grunt.config.get("apigee_profiles"),/*{'test' : {url_mgmt : 'https://api.enterprise.apigee.com', org : grunt.option('org'), env : grunt.option('env'), username : grunt.option('username'), password : grunt.option('password')}, env : grunt.option('env')},*/
          kvmImport,
          function(error, response, body){
            grunt.log.debug(response.statusCode);grunt.log.debug(body);
            cb2(error);
          },
          grunt.option('curl'));
      }
  }

  function createKVM(filepath, cb2){
      var uri;
      var kvmImport = grunt.file.readJSON(filepath.filepath);
      if(filepath.options.type === 'env'){
        //uri = "https://api.enterprise.apigee.com/v1/organizations/" + grunt.option("org") + "/environments/" + grunt.option("env") + "/keyvaluemaps";
        apigeeSdk.createKVMsEnvironment(grunt.config.get("apigee_profiles"),/*{'test' : {url_mgmt : 'https://api.enterprise.apigee.com', org : grunt.option('org'), env : grunt.option('env'), username : grunt.option('username'), password : grunt.option('password')}, env : grunt.option('env')},*/
          kvmImport,
          function(error, response, body){
            grunt.log.debug(response.statusCode);grunt.log.debug(body);
            cb2(error);
          },
          grunt.option('curl'));
      }else if(filepath.options.type === 'org'){
        //uri = "https://api.enterprise.apigee.com/v1/organizations/" + grunt.option("org") + "/keyvaluemaps";
        apigeeSdk.createKVMsOrganization(grunt.config.get("apigee_profiles"),/*{'test' : {url_mgmt : 'https://api.enterprise.apigee.com', org : grunt.option('org'), env : grunt.option('env'), username : grunt.option('username'), password : grunt.option('password')}, env : grunt.option('env')},*/
          kvmImport,
          function(error, response, body){
            grunt.log.debug(response.statusCode);grunt.log.debug(body);
            cb2(error);
          },
          grunt.option('curl'));
      }
/*      var kvmImport = grunt.file.readJSON(filepath.filepath);
      var options = {
        uri : uri,//'https://api.enterprise.apigee.com/v1/organizations/testmyapi/environments/test/keyvaluemaps',
        method : 'POST',
        auth : {user : process.env.ae_username, password: process.env.ae_password},
        headers : {'Content-Type': 'application/json'},
        body: JSON.stringify(kvmImport)
      };
      request(options,
        function(error, response, body){
          cb2(error);
        }
      );*/
  }

  grunt.registerMultiTask('apigee_kvm', 'Grunt plugin to import KVMs.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      type: 'env',
    });
    var done = this.async();
    // Iterate over all specified file groups.
    async.eachSeries(this.files,
      function(fileGroup, cb){
        async.eachSeries(fileGroup.src.map(function(filepath){ return {filepath : filepath, options : options};}),
          upsertKVM,
          function(error){
            cb(error);
          });
      },
      function(error){
        done(error);
      }
    );
  });
};
