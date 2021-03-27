const Finder = require('./Finder');
const path = require('path')
const { createReadStream } = require("fs");
const yargs = require("yargs/yargs");
const { hideBin } = require('yargs/helpers');
const FileType = require('file-type');
const { processEnv } = require("../hw1/lib/env");
const {
  EVENT_INIT,
  EVENT_FIND,
  EVENT_COMPLETE,
  EVENT_PROGRESS,
  EVENT_ERROR,
} = require("./constants");

// processEnv()

const argv = yargs(hideBin(process.argv)).argv
const { ext } = argv
console.log(ext)

const dirToFind = path.join(__dirname, '../hw2');
const findDeep = 0;
const findRegEx = new RegExp("app.js");

const MyEE = new Finder(dirToFind, findDeep, findRegEx);


MyEE.once(EVENT_INIT, () => {
  MyEE.parseDir();
});

MyEE.on(EVENT_FIND, (pathToFile) => {

 

  (async () => { /// read first chunk
    const file = path.join(dirToFind, pathToFile)
    const stream = createReadStream(file, { highWaterMark: 4100, encoding: "utf-8", start: 0, end: 100 });
    
    

    for await (let chunk of stream) {
      console.log("chunk", chunk);
      const fileType = await FileType.fromStream(stream);

      if(!fileType) {
        const fileType = path.extname(file)
        console.log(fileType)
      }
      
      stream.destroy();
    }
  })();

  console.log("find", pathToFile);
});

MyEE.once(EVENT_COMPLETE, (found) => {
  console.log("complete", found);
});

MyEE.on(EVENT_PROGRESS, ({ dirs, files }) => {
  console.log("progress", `dirs: ${dirs}, files: ${files}`);
});

MyEE.once(EVENT_ERROR, (e) => {
  console.error(e);
  process.exit(1);
});
