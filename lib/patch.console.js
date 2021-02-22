const log = console.log;

global.console.log = (...args) => {
  log(chalk[COLOR]("===", ...args, "==="));
};