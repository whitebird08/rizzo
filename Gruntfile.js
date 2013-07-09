module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    coffee: {
      compile: {
        files: [
          {
            "expand": true,
            "cwd": "./app/assets/javascripts/lib",
            "src": ["**/*.coffee", "**/**/*.coffee"],
            "dest": "./public/assets/javascripts/lib",
            "ext": ".js"
          },
          {
            "expand": true,
            "cwd": "./spec/javascripts/lib",
            "src": ["**/*.coffee"],
            "dest": "./public/assets/javascripts/spec",
            "ext": ".js"
          }
        ]
      }
    },
    connect: {
      server: {
        options: {
          port: 8888
        }
      }
    },
    jasmine: {
      avocado: {
        src: ['./public/assets/javascripts/lib/**/*.js'],
        options: {
          helpers: './spec/javascripts/helpers/**/*.js',
          host: 'http://localhost:8888/',
          specs: './public/assets/javascripts/spec/**/*.js',
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfig: {
              baseUrl: './',
              paths: {
                jquery: "./vendor/assets/javascripts/jquery/jquery-1.7.2.min",
                handlebars: './vendor/assets/javascripts/handlebars',
                lib: "./public/assets/javascripts/lib",
                underscore: './vendor/assets/javascripts/underscore',
                jplugs: "./vendor/assets/javascripts/jquery/plugins",
                s_code: "./vendor/assets/javascripts/omniture/s_code",
                gpt: "http://www.googletagservices.com/tag/js/gpt"
              }
            }
          }
        }
      }
    },
    watch: {
      scripts: {
        files: ['app/assets/javascripts/lib/**/*.coffee', 'spec/javascripts/lib/**/*.coffee'],
        tasks: ['coffee', 'jasmine'],
        options: {
          nospawn: true
        }
      }
    },
    plato: {
      avocado: {
        files: {
          '.plato/': ['public/assets/javascripts/**/*.js']
        }
      }
    },
    shell: {
      openPlato: {
        command: 'open .plato/index.html'
      },
      clean: {
        command: 'rm -rf public/assets'
      }
    }
  });

  grunt.loadTasks('grunt-tasks');

  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-plato');
  grunt.loadNpmTasks('grunt-shell');

  // Tasks
  grunt.registerTask('default', ['shell:clean', 'coffee', 'connect', 'jasmine']);
  grunt.registerTask('test', ['connect', 'jasmine']);
  grunt.registerTask('dev', ['shell:clean', 'coffee', 'connect', 'jasmine', 'echoJasmineUrl', 'watch']);
  grunt.registerTask('report', ['shell:clean', 'coffee', 'plato', 'shell:openPlato']);

};