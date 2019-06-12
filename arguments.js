/* eslint-disable no-underscore-dangle */
/* eslint-disable no-else-return */
/* eslint-disable no-extend-native */
// sum
function argSum() {
  let summer = 0;
  for (let i = 0; i < arguments.length; i++) {
    summer += arguments[i];
  }
  return summer;
}
const restSum = (...nums) => {
  return nums.reduce((summer, num) => {
    return summer + num;
  });
};

Function.prototype.myBind1 = function(context) {
  // const args = arguments;
  const fn = this;
  const args = Array.from(arguments).slice(1);
  // console.log(fn);
  return function _callFunc() {
    const callArgs = Array.from(arguments);
    return fn.apply(context, args.concat(callArgs));
  };
};

Function.prototype.myBind = function(context, ...bindArgs) {
  return (...callArgs) => {
    this.apply(context, bindArgs.concat(callArgs));
  };
};

class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

class Dog {
  constructor(name) {
    this.name = name;
  }
}

const markov = new Cat('Markov');
const pavlov = new Dog('Pavlov');

// bind time args are "meow" and "Kush", no call time args
markov.says.myBind(pavlov, 'meow', 'Kush')();
// Pavlov says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "a tree"
markov.says.myBind(pavlov)('meow', 'a tree');
// Pavlov says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
markov.says.myBind(pavlov, 'meow')('Markov');
// Pavlov says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBind(pavlov);
notMarkovSays('meow', 'me');
// Pavlov says meow to me!
// true

function curriedSum(numArgs) {
  const numbers = [];

  function _curriedSum(number) {
    numbers.push(number);
    if (numbers.length === numArgs) {
      let sum = 0;
      // eslint-disable-next-line prettier/prettier
      numbers.forEach(num => {
        sum += num;
      });
      return sum;
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
}
console.log(curriedSum(3)(2)(2)(8));

Function.prototype.curry1 = function(numArgs) {
  const numbers = [];
  const func = this;

  function _curry1(number) {
    numbers.push(number);
    if (numArgs === numbers.length) {
      return func.apply(null, numbers);
    } else {
      return _curry1;
    }
  }
  return _curry1;
};

Function.prototype.curry2 = function(numArgs) {
  const numbers = [];

  const _curry2 = number => {
    numbers.push(number);
    if (numArgs === numbers.length) {
      return this(...numbers);
    } else {
      return _curry2;
    }
  };
  return _curry2;
};

