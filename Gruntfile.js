module.exports = function(grunt) {

    // Enable plugins.
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        // Image build configuration.
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/'
                }]
            }
        },

        // JavaScript build configuration.
        concat: {
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'js/main.js'
                ],
                dest: 'js/build/production.js'
            }
        },

        uglify: {
            dist: {
                files: {
                    'js/build/production.min.js': ['js/build/production.js']
                }
            }
        },

        // CSS build configuration.
        sass: {
            dist: {
                files: {
                    'css/main.css': 'scss/main.scss'
                }
            }
        },

        postcss: {
            options: {
                map: true,
                processors: [
                    require('autoprefixer')({browsers: ['last 2 versions']}),
                    require('cssnano')()
                ]
            },
            dist: {
                src: 'css/*.css'
            }
        },

        // Development configuration.
        watch: {
            options: {
                livereload: true
            },
            javascript: {
                files: 'js/*.js',
                tasks: ['concat', 'uglify']
            },
            css: {
                files: 'scss/**/*.scss',
                tasks: ['sass']
            }
        }
    });

    // Default tasks.
    grunt.registerTask('default', ['imagemin', 'concat', 'uglify', 'sass', 'postcss', 'watch']);

    // Development tasks.
    grunt.registerTask('dev', ['watch']);

    // Build tasks.
    grunt.registerTask('build', ['imagemin', 'concat', 'uglify', 'sass', 'postcss']);
};
