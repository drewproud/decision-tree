var treeObj = {
  func: 'isHungry',
  isTrue: {
    func: 'hasMoney',
    isTrue: 'BOUGHT_FOOD',
    isFalse: 'STOLE_FOOD'
  },
  isFalse: 'WATCHED_TV'
};


var functionObj = {
  isHungry: function(attributes) {
    return !(attributes.foodCount > 0);
  },
  hasMoney: function(attributes) {
    if (attributes.money > 5)
      return true;
    else
      return false;
  }
};


Tinytest.add('Test first output', function (test) {
  var NextMoveForGuy = new DecisionTree(0);
  NextMoveForGuy.setTree(treeObj);
  NextMoveForGuy.setFunctions(functionObj);

  var someGuy = {
    foodCount: 0,
    money: 0
  };

  var result = NextMoveForGuy.run(someGuy);

  test.equal(result, 'STOLE_FOOD');
});

Tinytest.add('Test second output', function (test) {
  var NextMoveForGuy = new DecisionTree();
  NextMoveForGuy.setTree(treeObj);
  NextMoveForGuy.setFunctions(functionObj);

  var someGuy = {
    foodCount: 0,
    money: 6
  };

  var result = NextMoveForGuy.run(someGuy);

  test.equal(result, 'BOUGHT_FOOD');
});

Tinytest.add('Test third output', function (test) {
  var NextMoveForGuy = new DecisionTree();
  NextMoveForGuy.setTree(treeObj);
  NextMoveForGuy.setFunctions(functionObj);

  var someGuy = {
    foodCount: 1,
    money: 0
  };

  var result = NextMoveForGuy.run(someGuy);

  test.equal(result, 'WATCHED_TV');
});
