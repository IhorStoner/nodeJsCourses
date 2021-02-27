const yargs = require("yargs/yargs");
const { hideBin } = require('yargs/helpers');
const os = require('os');

const argv = yargs(hideBin(process.argv)).argv
const { cpu,lan,ram,fullInfo,osName } = argv

const processArgv = () => {
  const { model } = os.cpus()[0]
  const { address } = os.networkInterfaces().Ethernet[1]
  const ramMb = parseInt(os.totalmem() / 1024 / 1024)
  const pcInfo = `CPU:${model} LAN:${address} RAM:${ramMb}MB`
  const release = os.release()

  cpu && console.log(`CPU:${model}`)
  lan && console.log(`LAN:${address}`)
  ram && console.log(`RAM:${ramMb}MB`)
  fullInfo && console.log(`INFO:${pcInfo}`)
  osName && console.log(`OSNAME:${release}`)
}

module.exports = {
  processArgv,
};