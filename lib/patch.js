const log = console.log

global.console.short = (...args) => {
  const str = args[0]
  const strArr = str.split(' ')
  const result = strArr.map((str,i) => i === 1 ? '...' : str)

  log(result)
};