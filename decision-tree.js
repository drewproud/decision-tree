
// It follows the decision tree defined in CheckInRules.rules upon the invokation
// of run()
// When debugging, log the path variable to see where the function is
DecisionTree = function(logLevel, idField) {
  var self = this;

  if (!(logLevel && typeof logLevel === 'number'))
    throw 'If passed, logLevel must be an integer (0 or 1)';

  self.options = {
    logLevel: logLevel || 0,
    idField: idField || 'userId'
  };
}

// Add the defined tree
DecisionTree.prototype.setTree = function(rules) {
  var self = this;

  if (typeof rules === 'object')
    self.rules = rules;
  else
    throw 'rules must be an object';
};

// Add all functions that are referenced in the tree
DecisionTree.prototype.setFunctions = function(functionObject) {
  if (typeof functionObject !== 'object')
    throw 'You must pass an object of functions to';

  self.userFunctions = functionObject;

}

// Recursively call the followtree function and return the end value
DecisionTree.prototype.run = function(attributes) {
  if (!attributes)
    throw 'attributes must not be empty';

  var self = this;
  var currentNode = self.rules;
  var path = 'start';

  // Uses the userId field by default for logging - add this field if it doesn't exist
  if (!attributes.userId)
    attributes.userId = '';

  return self._followTree(currentNode, attributes, path);
};

DecisionTree.prototype._followTree  = function(currentNode, attributes, path) {
  var self = this;

  // If there is a function to call, we are not yet at and endpoint node
  if (currentNode.func) {

    var result = self.userFunctions[currentNode.func](attributes);
    path = path + '/' + currentNode.func;

    // Follow the 'true' node of the tree
    if (result === true) {
      currentNode = currentNode.isTrue;
      path = path + '[true]';
      return self._followTree(currentNode, attributes, path);

    // Follow the 'false' node of the tree
    } else if (result === false) {
      currentNode = currentNode.isFalse;
      path = path + '[false]';
      return self._followTree(currentNode, attributes, path);
    }

  // If there is no function to call, we are at an endpoint and should return the text string
  } else {
    if (self.options.logLevel > 0)
      console.log('success ' + attributes[self.idField] + ' ' + path + ' result:' + currentNode);

    return currentNode;
  }
};


