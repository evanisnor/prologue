module.exports = function(grunt) {
 
    grunt.initConfig({
 
        copy: {
            build: {
                cwd: 'src',
                src: [ 'index.html', 'app.js', 'bower.json', 'controller/**', 'enum/**', 'util/**', 'view/**' ],
                dest: 'bin',
                expand: true
            },
        },
        clean: {
            build: {
                src: [ 'bin' ]
            }
        },
        jshint: {
            src: ['src/**/*.js', '!src/bower_components/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: './src',
                    fileExclusionRegExp: /bower_components/,
                    dir: 'bin',
                    wrap: true,
                    optimizeCss: 'standard',
                    skipDirOptimize: false,
                    preserveLicenseComments: false,
                    mainConfigFile: 'src/app.js',
                    uglify: {
                        max_line_length: 1000
                    }
                }
            }
        },
        less: {
            options: {
                cleancss: true,
                compress: true
            },
            files: {
                expand: true,
                cwd: 'src',
                src: ['*.less'],
                ext: '.css'
            }
        },
        shell: {
            'bower-install': {
                options: {
                    execOptions: {
                        cwd: 'bin'
                    },
                    stdout: true
                },
                command: 'bower install'
            }
        },
        connect: {
            development: {
                options: {
                    port: 9001,
                    base: 'src'
                }
            },
            release: {
                options: {
                    port: 9002,
                    base: 'bin'
                }
            }
        },
        watch: {
            build: {
                files: [ 'src/**/*',],
                tasks: [ 'build' ]
            },
        }
    });
 
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
 
    grunt.registerTask(
        'build', 
        'Compiles all of the assets and copies the files to the build directory.', 
        [ 'jshint:src', 'less', 'clean:build', 'copy', 'requirejs:compile', 'shell:bower-install' ]
    );

    grunt.registerTask(
        'default', 
        'Watches the project for changes, automatically builds them and runs a server.', 
        [ 'build', 'connect:development', 'watch' ]
    );
};