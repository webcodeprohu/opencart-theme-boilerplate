module.exports = function(grunt) {

    // Enable plugins.
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({

        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        // Compile Sass to CSS.
        sass: {
            dist: {
                files: {
                    'css/style.css': 'scss/style.scss'
                }
            }
        },

        // Add vendor prefixes and minify CSS.
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({browsers: 'last 2 versions'}),
                    require('cssnano'),
                ]
            },
            dist: {
                src: 'css/style.css'
            }
        },

        // Concatenate JavaScript.
        concat: {
            dist: {
                src: [
                    'bower_components/jquery/dist/jquery.js',
                    'bower_components/bootstrap-sass/assets/javascripts/bootstrap.js',
                    'js/main.js'
                ],
                dest: 'js/build/production.js'
            }
        },

        // Minify JavaScript.
        uglify: {
            dist: {
                files: {
                    'js/build/production.min.js': ['js/build/production.js']
                }
            }
        },

        // Minify images.
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'img/'
                }]
            }
        },

        // Watch for file changes and run tasks.
        watch: {
            options: {
                livereload: true
            },
            styles: {
                files: ['scss/**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            },
            scripts: {
                files: ['js/**/*.js'],
                tasks: ['concat', 'uglify']
            }
        }
    });

    // Default tasks.
    grunt.registerTask('default', ['sass', 'postcss', 'concat', 'uglify', 'imagemin', 'watch']);

    // Development tasks.
    grunt.registerTask('dev', ['watch']);

    // Build tasks.
    grunt.registerTask('build', ['sass', 'postcss', 'concat', 'uglify', 'imagemin']);
};
