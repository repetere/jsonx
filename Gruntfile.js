'use strict';
const path = require('path');
const testPaths = 'test/**/*.js';

module.exports = function(grunt) {
  grunt.initConfig({
    mocha_istanbul: {
      coveralls: {
        src: testPaths, // multiple folders also works
        options: {
          coverageFolder: 'coverage', // will check both coverage folders and merge the coverage results
          coverage: true, // this will make the grunt.event.on('coverage') event listener to be triggered
          check: {
            lines: 5,
            branches: 5,
            functions: 5,
            statements: 5,
          },
          // root: './lib', // define where the cover task should consider the root of libraries that are covered by tests
          reportFormats: ['cobertura', 'lcovonly', ],
        },
      },
    },
    istanbul_check_coverage: {
      default: {
        options: {
          coverageFolder: 'coverage', // will check both coverage folders and merge the coverage results
          check: {
            lines: 80,
            branches: 80,
            functions: 80,
            statements: 80,
          },
        },
      },
    },
    coveralls: {
      // Options relevant to all targets
      options: {
        // When true, grunt-coveralls will only print a warning rather than
        // an error, to prevent CI builds from failing unnecessarily (e.g. if
        // coveralls.io is down). Optional, defaults to false.
        force: false,
        excludes: ['**/bin/**', ],
      },

      all: {
        // LCOV coverage file (can be string, glob or array)
        src: 'coverage/*.info',
        options: {
          // Any options for just this target
        },
      },
    },
    simplemocha: {
      options: {
        globals: ['should', 'navigator', 'x', ],
        timeout: 3000,
        ignoreLeaks: true,
        ui: 'bdd',
        reporter: 'spec',
      },
      all: {
        src: testPaths,
      },
    },
    jsdoc: {
      dist: {
        src: ['dist/*.cjs.js', 'README.md', ],
        options: {
          destination: 'docs',
        },
      },
    },
    // browserify: {
    //   dist: {
    //     files: [{
    //       expand: true,
    //       cwd: __dirname,
    //       src: ['./index.js'],
    //       dest: 'bin'
    //     }],
    //     options: {
    //       transform: [
    //         ["babelify", {
    //           presets: ["es2015","es2016","es2017","react"],
    //           //plugins: ["proxy"]
    //         }]
    //       ]
    //     }
    //   }
    // }
  });

  // Loading dependencies
  for (var key in grunt.file.readJSON('package.json').devDependencies) {
    if (key.indexOf('grunt') === 0 && key !== 'grunt') {
      grunt.loadNpmTasks(key);
    }
  }
  grunt.registerTask('doc', 'jsdoc');
  grunt.registerTask('test', 'mocha_istanbul');
};