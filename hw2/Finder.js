const EventEmitter = require("events");
const {
  EVENT_INIT,
  EVENT_COMPLETE,
  EVENT_PROGRESS,
  EVENT_FIND,
  EVENT_PROCESS,
} = require("./constants");
const { readDir } = require("./readDir");

const TIMER_DELAY = 500;

class Finder extends EventEmitter {
  constructor(findDir, findDeep, findRegEx) {
    super();

    this._dir = findDir;
    this._deep = findDeep;
    this._template = findRegEx;
    this._processDir = 0;
    this._processFile = 0;

    this.on(EVENT_PROCESS, (type) => {
      this[`_process${type}`]++;
    });

    this.on(EVENT_FIND, () => {
      this.startTimer();
    });

    setTimeout(() => {
      this.emit(EVENT_INIT);
    }, 0);
  }

  async parseDir() {
    console.log("parse start");

    this.startTimer();

    const found = await readDir(
      this._dir,
      this._deep,
      this._template,
      this._dir,
      this.emit.bind(this)
    );

    this.clearTimer();
    this.emit(EVENT_COMPLETE, {
      process: {
        dirs: this._processDir,
        files: this._processFile,
      },
      found,
    });
  }

  startTimer() {
    this.clearTimer();
    this._timer = setTimeout(() => {
      this.emit(EVENT_PROGRESS, {
        dirs: this._processDir,
        files: this._processFile,
      });
    }, TIMER_DELAY);
  }

  clearTimer() {
    clearTimeout(this._timer);
  }

}

module.exports = Finder;
