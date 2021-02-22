const argv = process.argv;

export const proccesArgv = () => {
  console.log(argv)
}

module.exports = {
  proccesEnv: proccesArgv,
};