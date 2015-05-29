# Meteor Decision Tree
A Meteor package for using decision-tree style logic in your app

Often times, the need arises to handle logic in the form of a decision tree. This package is intended to offer a declarative way of following a binary decision tree to an endpoint and returning a defined value instead of using a messy nested structure of if-then statements.

Installation:
`meteor add drewproud:decision-tree`


To use:
1. Instantiate a new DecisionTree object with your desired options
2. Set all functions used in the tree with setFunctions
3. Set the tree to be used using setTree
4. Call run to execute and return the approriate endpoint value

## API

### new DecisionTree([logLevel],[idField])
Creates a new instance of DecisionTree.

*Arguments*
**logLevel**  Integer, either 0 or 1
Specifies the whether or not to log success. Specifying '1' will print success + the path taken in the console. Defaults to 0.
**idField** String
Specifies a field to print out with the log to aid in debugging.

### *DecisionTree*.setFunctions(functionObject)
Sets all functions that are used in the decision tree. Each function **must return a true boolean** - not truthy or falsey.
*Arguments*
**functionObject**  Object
Specifies all functions to be used as 1st level fields in the object.

### *DecisionTree*.setTree(treeObject)

Sets the decision tree for the object. Each tree must be in a particular form to function.

*Arguments*
**treeObject**  Object
Specifies the tree to be tested. It must be of the form:
````
{
  func: 'functionName',
  isTrue: {
    func: 'nextFunctionName',
    isTrue: 'END_VALUE',
    isFalse: 'OTHER_END_VALUE'
  },
  isFalse: 'END_VALUE'
}
````

The object can have as many nested levels as desired, as long as all branches lead to a string value for both isFalse and isTrue.

### *DecisionTree*.run(attributes)

Runs the specified object through the decision tree. Returns the string value of the endpoint.

*Arguments*
**attributes**  Object
This is the object to be tested. It will be the only argument passed to each declared function.


### Example:
Here is how to use it. You can see another example in action at the nonprofit meteor project [UCB](https://github.com/drenfr01/unionCapital).

````
NextMoveForGuy = new DecisionTree(1);

NextMoveForGuy.setTree({
  func: 'isHungry',
  isTrue: {
    func: 'hasMoney',
    isTrue: 'BOUGHT_FOOD',
    isFalse: 'STOLE_FOOD'
  },
  isFalse: 'WATCHED_TV'
});

NextMoveForGuy.setFunctions({
  isHungry: function(attributes) {
    return !(attributes.foodCount > 0);
  },
  hasMoney: function(attributes) {
    if (attributes.money > 5)
      return true;
    else
      return false;
  }
});

var someGuy = {
  foodCount: 0,
  money: 0
};

var doThis = NextMoveForGuy(someGuy);
// 'STOLE_FOOD'

````
