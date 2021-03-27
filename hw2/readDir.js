const { readdir } = require("fs/promises");
const { join, relative, sep } = require("path");
const { EVENT_FIND, EVENT_PROCESS, EVENT_ERROR } = require("./constants");

const readDir = async (dirPath, dirDeep, findTemplate, basePath, emitter) => {
  const findFiles = [];
  try {
    const items = await readdir(dirPath, { withFileTypes: true });
    for (let item of items) {
      if (item.isDirectory()) {
        emitter(EVENT_PROCESS, "Dir");
        const newDir = join(dirPath, item.name);
        const relativePath = relative(newDir, basePath);
        const hops = relativePath.split(sep);
        if (dirDeep && hops.length > dirDeep) {
          continue;
        }

        // await new Promise((resolve) => {
        //   setTimeout(resolve, 100);
        // });

        findFiles.push(
          ...(await readDir(newDir, dirDeep, findTemplate, basePath, emitter))
        );
      } else if (item.isFile()) {
        emitter(EVENT_PROCESS, "File");
        if (findTemplate.test(item.name)) {
          const fullFilePath = join(dirPath, item.name);
          emitter(EVENT_FIND, relative(basePath, fullFilePath));
          findFiles.push(fullFilePath);
        }
      }
    }
    return findFiles;
  } catch (e) {
    emitter(EVENT_ERROR, e);
  }
};

exports.readDir = readDir;
