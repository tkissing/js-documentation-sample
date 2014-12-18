module.exports = function (grunt) {
    'use strict';

    [
        'grunt-contrib-clean',
        'grunt-contrib-jshint',
        'grunt-contrib-yuidoc',
        'grunt-docco3',
        'grunt-jsdoc',
        'grunt-lintspaces',
        'grunt-release'

    ].forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            docs: ['docs/']
        },

        docco: {
            sources: {
                src: ['src/**/*.js'],
                options: {
                    output: 'docs/docco'
                }
            }
        },

        jsdoc: {
            sources: {
                src: ['src/**/*.js'],
                options: {
                    destination: 'docs/jsdoc'
                }
            }
        },

        yuidoc: {
            sources: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: 'src',
                    outdir: 'docs/yuidoc'
                }
            }
        },

        jshint: {
            options: {
                latedef: 'nofunc',
                undef: true,
                curly: true,

                // environments
                jquery: false,
                node: false,
                browser: false
            },

            config: {
                options: {
                    node: true
                },
                src: ['Gruntfile.js', 'karma.conf.js']
            },

            sources: {
                options: {
                    browser: true,
                    globals: {
                        define: true,
                        require: true,
                        requirejs: true
                    }
                },
                src: ['src/**/*.js']
            }
        },

        lintspaces: {
            options: {
                editorconfig: ".editorconfig",
                ignores: ['js-comments']
            },
            config: {
                src: "<%= jshint.config.src%>"
            },
            src: {
                src: "<%= jshint.sources.src%>"
            }
        },

        release: {
            options: {
                npm: false
            }
        }
    });

    grunt.registerTask('docs', ['clean:docs', 'docco', 'jsdoc', 'yuidoc']);

    grunt.registerTask('package', ['verify', 'docs']);

    grunt.registerTask('lint', ['jshint', 'lintspaces']);

    grunt.registerTask('verify', ['lint']);

    grunt.registerTask('default', ['package']);
};
