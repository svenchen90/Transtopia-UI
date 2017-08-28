var testObj = function(name, inner){
	this.name = name;
	var inner = inner;
	
	this.getInner = function(){
		this.test();
	};
	
	this.test = function(){
		console.log(11);
	}
	
	var privateInner = function(){
		console.log(inner);
	}
	
	this.setInner = function(value){
		this.inner = value;
	};
	this.setName = function(name){
		this.name = name;
	}
}
/* 
var newObj = new testObj(1, 2);
console.log(newObj.name);
newObj.setName(4)

console.log(newObj.name);
//
newObj.setInner(3);
newObj.getInner();
//newObj.privateInner();

if(undefined)
	console.log(111);
 */
 /* 
function Person(first, last, age, gender, interests) {
	this.name = {
	first,
	last
	};
	this.age = age;
	this.gender = gender;
	this.interests = interests;

	this.greeting = function() {
		alert('Hi! I\'m ' + this.name.first + '.');
	};
};

Person.prototype.greeting = function() {
  alert('Hi! I\'m ' + this.name.first + '.');
}; 

function Teacher(first, last, age, gender, interests, subject) {
  Person.call(this, first, last, age, gender, interests);

  this.subject = subject;
  this.greeting = function(){
	console.log(13123);
  }
}

var obj = new Teacher(1,2,3,4,5,6)
obj.greeting();
console.log(obj. subject);
console.log(obj.name);
 */
/* 
class Polygon {
  constructor(height, width) {
    this.height = height;
    this.width = width;
	
	this.alert = function(){
		alert(this.height);
	}
  }
}

class Square extends Polygon {
  constructor(sideLength) {
    super(sideLength, sideLength);
  }
  get area() {
    return this.height * this.width;
  }
  set sideLength(newLength) {
    this.height = newLength;
    this.width = newLength;
  }
}

var square = new Square(2);
 */

// console.log(square.getArea());

/* 
function A(a) {
  this.varA = a;
}

// What is the purpose of including varA in the prototype when A.prototype.varA will always be shadowed by
// this.varA, given the definition of function A above?
A.prototype = {
  varA: null,  // Shouldn't we strike varA from the prototype as doing nothing?
      // perhaps intended as an optimization to allocate space in hidden classes?
      // https://developers.google.com/speed/articles/optimizing-javascript#Initializing-instance-variables
      // would be valid if varA wasn't being initialized uniquely for each instance
  doSomething: function() {
    console.log(this.varA); // ...
  }
};

function B(a, b) {
  A.call(this, a);
  this.varB = b;
}
B.prototype = Object.create(A.prototype, {
  varB: {
    value: null, 
    enumerable: true, 
    configurable: true, 
    writable: true 
  },
  doSomething: { 
    value: function() { // override
      A.prototype.doSomething.apply(this, arguments); // call super
      // ...
    },
    enumerable: true,
    configurable: true, 
    writable: true
  }
});
B.prototype.constructor = B;

var b = new B();
b.doSomething();


var ABC = {
  varA: 1,  // Shouldn't we strike varA from the prototype as doing nothing?
      // perhaps intended as an optimization to allocate space in hidden classes?
      // https://developers.google.com/speed/articles/optimizing-javascript#Initializing-instance-variables
      // would be valid if varA wasn't being initialized uniquely for each instance
  doSomething: function() {
    console.log(this.varA); // ...
  }
};
ABC.doSomething();
 */
 /* 
var abc = {};

console.log(abc);

delete abc;

console.log(abc); */