# grunt-apigee-kvm

> Grunt plugin to import KVMs into Apigee. This plugin plays well with API Lifecycle Tools such as [Apigee Deploy Grunt Plugin](https://github.com/apigeecs/apigee-deploy-grunt-plugin) to propagate KVM configuration across environments and organizations.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-apigee-kvm --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-apigee-kvm');
```

## The "apigee_kvm" task

### Overview
In your project's Gruntfile, add a section named `apigee_kvm` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
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
    }
});
```

### Options

#### options.type
Type: `String`
Default value: `'env'`

### Usage Examples

#### Default Options
In this example, custom options are used to specify at which level these KVM files should be created or updated. Currently, env (environment) and org(organization) types are supported by this plugin. When no option type is provided, it defaults to environment. Also, note that orgnizations and environments are provided as part of the configuration. Org and environment parameters are resolved by the configuration file from [apigee-config.js file](https://github.com/apigeecs/apigee-deploy-grunt-plugin/blob/master/grunt/apigee-config.js#L5-L7).

```js
grunt.initConfig({
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
    }
});
```

#### Custom Options
In this example, custom options are used to specify at which level these KVM files should be created or updated. Currently, env (environment) and org(organization) types are supported by this plugin.

```js
grunt.initConfig({
  apigee_kvm: {
    "testmyapi-test" : {
      options: {
        type: "env"
      },
      files: [{src: ['config/kvm/testmyapi/testmyapi-test/*.json']},
      ]
    },
  }
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_