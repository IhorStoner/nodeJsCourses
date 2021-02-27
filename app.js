const { processEnv } = require("./lib/env");
const { processArgv } = require("./lib/argv");
require('./lib/patch')

processEnv()
processArgv()

console.log('Hello world')
console.short('consoleShort Hello world')