'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var GitbookGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Gitbook generator.'));

    var prompts = [{
      name: 'bookname',
      message: 'What is the name of your Book?'
    }];

    this.prompt(prompts, function (props) {
      this.bookname = props.bookname;

      done();
    }.bind(this));
  },

  app: function () {
    this.mkdir('section1');
    this.mkdir('section2');
    this.mkdir(this.bookname);

    this.copy('_Gruntfile.js', 'Gruntfile.js');
    this.copy('_package.json', 'package.json');
    this.copy('_README.md', this.bookname + '/README.md');
    this.copy('_SUMMARY.md', this.bookname + '/SUMMARY.md');
    this.copy('_page.md', this.bookname + '/section1/page1.md');
    this.copy('_page.md', this.bookname + '/section1/page2.md');
    this.copy('_page.md', this.bookname + '/section2/page1.md');
  }
});

module.exports = GitbookGenerator;
