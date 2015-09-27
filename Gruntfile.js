module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      options: {
        sourceMap: true,
        outputStyle: 'compressed'
      },
      dist: {
        files: {
            'dist/style.css': 'app/style/main.scss'
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'app/**/*.js', 'test/**/*.js'],
      options: {
        globals: {
          jQuery: true
        }
      }
    },
    uglify: {
      options: {
        // the banner is inserted at the top of the output
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/bundle.min.js': ['dist/bundle.js'],
        },
      }
    },
    watch: {
      css: {
        files: ['app/style/*.scss', '<%= jshint.files %>'],
        tasks: ['sass', 'jshint']
      }
    }
  });

  grunt.registerTask('watch', ['watch']);
  grunt.registerTask('dist', ['uglify']);

};