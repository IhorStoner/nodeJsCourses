const yargs = require("yargs/yargs");
const { hideBin } = require('yargs/helpers');
const os = require('os');

const argv = yargs(hideBin(process.argv)).argv
const { cpu,lan,ram,fullInfo,osName } = argv

const processArgv = () => {
  const cpuInfo = os.cpus().length
  const lanInfo = os.networkInterfaces()
  let address;
  Object.keys(lanInfo).map(item => lanInfo[item].map(lan => {
    if(lan.family === 'IPv4' && lan.internal) address = lan.address
  }))

  const ramMb = parseInt(os.totalmem() / 1024 / 1024)
  const pcInfo = `CPU:${cpuInfo} LAN:${address[-1]} RAM:${ramMb}MB`
  const release = os.release()

  cpu && console.log(`CPU:${cpuInfo}`)
  lan && console.log(`LAN:${address}`)
  ram && console.log(`RAM:${ramMb}MB`)
  fullInfo && console.log(`FULL_INFO: ${pcInfo}`)
  osName && console.log(`OSNAME:${release}`)
}

module.exports = {
  processArgv,
};