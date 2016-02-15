var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp({
      // Any other options
  });

  app.import('bower_components/bootstrap-sass/assets/stylesheets/_bootstrap.scss');
  app.import('vendor/emblem.amd.js');

  return app.toTree();
};
