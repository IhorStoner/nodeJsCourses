const Finder = require('./Finder');
const path = require('path')
const { processEnv } = require("../hw1/lib/env");
const {
  EVENT_INIT,
  EVENT_FIND,
  EVENT_COMPLETE,
  EVENT_PROGRESS,
  EVENT_ERROR,
} = require("./constants");

processEnv()
const dirToFind = path.join(__dirname, '../node_modules');
const findDeep = 0;
const findRegEx = new RegExp(".*?.js$");


const MyEE = new Finder(dirToFind,findDeep,findRegEx);


MyEE.once(EVENT_INIT, () => {
  MyEE.parseDir();
});

MyEE.on(EVENT_FIND, (path) => {
  console.log("find", path);
});

MyEE.once(EVENT_COMPLETE, (found) => {
  console.log("complete", JSON.stringify(found));
});

MyEE.on(EVENT_PROGRESS, ({dirs,files}) => {
  console.log("progress", `dirs: ${dirs}, files: ${files}`);
});

MyEE.once(EVENT_ERROR, (e) => {
  console.error(e);
  process.exit(1);
});
