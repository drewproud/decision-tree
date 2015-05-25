Package.describe({
  name: 'drewproud:decision-tree',
  version: '1.0.1',
  // Brief, one-line summary of the package.
  summary: 'A package for handling complex decision tree logic',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/drewproud/decision-tree.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('decision-tree.js');
  api.export('DecisionTree');
});

// Package.onTest(function(api) {
//   api.use('tinytest');
//   api.use('drewproud:decision-tree');
//   api.addFiles('decision-tree-tests.js');
// });
