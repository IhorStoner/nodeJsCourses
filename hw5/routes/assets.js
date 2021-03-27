const express = require('express');
const path = require('path')
const AssetsRouter = express.Router();
const fs = require('fs')

const ASSETS_STORAGE = path.resolve(__dirname, '../', 'public', 'assets');
const LOG_FILE = path.resolve(__dirname, '../', 'logs.txt')

AssetsRouter.get('/:fileType/:fileName', async (req, res) => {
  const { fileType, fileName } = req.params

  const startTime = Date.now()

  res.sendFile(path.join(ASSETS_STORAGE, fileType, `${fileName}.${fileType}`))

  const endTime = Date.now()

  fs.appendFile(LOG_FILE, ` \"{${req.path} Time spend ${endTime - startTime} ms}\" ` , err =>{
    if(err) throw err; 
  });

})


module.exports = AssetsRouter;