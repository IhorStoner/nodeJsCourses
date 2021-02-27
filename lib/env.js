const chalk = require('chalk');

const { COLOR } = process.env
const log = console.log

exports.processEnv = () => {
  if (COLOR) {
    const chalkColor = chalk[COLOR]

    if (chalkColor) {
      console.log = (...args) => {
        log(chalkColor(...args))
      }
    } else {
      console.log('Chalk color doesn\'t exist')
      process.exit(1)
    }
  }
}

