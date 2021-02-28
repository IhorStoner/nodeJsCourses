const log = console.log

global.console.short = (...args) => {
  const arr = [...args].map((arg,i) => i === 1 ? '...' : arg)
  const result = arr.join(' ')
  log(result)
};