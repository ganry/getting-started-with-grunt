module.exports = function(grunt) {

    // CONFIGURE GRUNT
    grunt.initConfig({

        // load our package.json so we can use things like name (pkg.name) and version
        pkg: grunt.file.readJSON('package.json'),

        // validate js files
        jshint: {
            options: {
                reporter: require('jshint-stylish') // use jshint-stylish to make our errors look and read good
            },

            // when this task is run, lint the Gruntfile and all js files in src
            build: ['Grunfile.js', 'src/**/*.js']
        },

        // minify js files
        uglify: {
            options: {
                banner: '/*\n Name: <%= pkg.name %>\n Date: <%= grunt.template.today("yyyy-mm-dd") %>\n Author: <%= pkg.author %>\n*/'
            },
            build: {
                files: {
                    'js/app.min.js': 'src/js/app.js'
                }
            }
        },

        // compile less stylesheets to css
        less: {
            build: {
                files: {
                    'src/css/style.css': [
                        'src/less/global.less',
                    ]
                }
            }
        },

        // configure cssmin to minify css files
        cssmin: {
            options: {
                banner: '/*\n Name: <%= pkg.name %>\n Date: <%= grunt.template.today("yyyy-mm-dd") %>\n Author: <%= pkg.author %>\n*/'
            },
            build: {
                files: {
                    'css/style.min.css': 'src/css/style.css',
                }
            }
        },

        // configure watch to auto update
        watch: {

          // for stylesheets, watch css and less files
          // only run less and cssmin
          stylesheets: {
            files: ['src/**/*.css', 'src/**/*.less'],
            tasks: ['less', 'cssmin']
          },

          // for scripts, run jshint and uglify
          scripts: {
            files: 'src/**/*.js',
            tasks: ['jshint', 'uglify']
          }
        }

    });

    // LOAD GRUNT PLUGINS

    // we can only load these plugins if we defined them in our package.json
    // you also have to run "npm install" once to make this work
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // CREATE TASKS
    // register tasks you want to execute with "grunt &lt;taskname&gt;"

    //default task can be executed with just "grunt"
    grunt.registerTask('default', ['jshint', 'uglify', 'less', 'cssmin']);

    //Only javascript error checking
    grunt.registerTask('check', ['jshint']);

};
