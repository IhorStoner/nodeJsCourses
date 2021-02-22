const { processEnv } = require("./lib/process.env");
const { processArgv } = require("./lib/multiply");
require("./lib/division");
require("./lib/patch.console");

const A = 10;
const B = 2;

const result1 = add(A, B);
const result2 = multiply(A, B);
const result3 = division(A, B);

console.log("add", result1);
console.log("multiply", result2);
console.log("division", result3);
