Package.describe({
  name: 'drewproud:decision-tree',
  version: '1.0.4',
  summary: 'A package for handling complex decision tree logic in Meteor',
  git: 'https://github.com/drewproud/decision-tree.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
  api.addFiles('decision-tree.js');
  api.export('DecisionTree');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('drewproud:decision-tree');
  api.addFiles('decision-tree-tests.js');
});
