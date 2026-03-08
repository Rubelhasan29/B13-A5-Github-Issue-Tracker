
1. Difference between var, let, and const

is javascript, var, let, const are used in js to declare variable
A variable is a container used to store data.

var--> var is a very odl version to declare a variable is javascript,It was used before ES6

about var...
1.the value can change
2.the variable ca declare again
3.have some issues about function scope

let-->
let is use to declare a variable it can change it's value
it was a new item of ES6

about let... 
1.value can change
2.cannot redeclare with same name
3.Uses block scope

const---> Is use to create a variable whose value not need to change

about..
1.value can't be change
2.can not redeclare with same name



2. What is the spread Operator(...)
The spread operator (...) is used to expand elements of an array o object.
it is used to copy or combine array ans object

EX:_ const number = [1, 2, 3]
     const nweNumber = [...number, 4, 5]
    console.lo(newNUmber)
    output = [1, 2, 3, 4, 5]


3. Difference between map() filter(), and forEach()

These are array methods used to work with arrays.


forEach--> runs a function for every elements in an array.
it is used mainly for lopping.
EX:-- const number = [1, 2, 3]
      number.forEach(function (num) {
      console.lo(num)

      });
     output =  1
               2
               3
map---> Creates a new array by modifying each element.

EX:-- const number = [1, 2, 3]
      const result =  number.map(function (num) {
      return number * 2;

      });
      console.lo(result)

     output = [2, 4, 6]

filter---> Creates a new array with elements that match a condition.

EX:-- const numbers = [10, 20, 30]
      const result =  numbers.filter(function (num) {
      return number > 10;

      });
      console.lo(result)

     output = [20, 30]


4. What is an Arrow Function.

An arrow function is shorter way to write function in javascript

it uses the => symbol.

function add (a, b){
    return a + b;
}


5. What are Template Literals

template literals allow you to wite string with variables easily.

they use backticks (``) instead of quotes

const name = "Rubel" ;
const age = 20 ;

console.log(`My name is ${name} and my age ${age`)

output = My name is Rubel and my age 20






