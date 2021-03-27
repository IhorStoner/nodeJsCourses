const express = require('express');
const path = require('path')
const MessagesRouter = express.Router();

const messages = [
  {
    id: 1,
    text: 'hello',
    sender: 'Mask1',
    addedAt: Date.now()
  },
  {
    id: 2,
    text: 'hello2',
    sender: 'Mask2',
    addedAt: Date.now()
  },
  {
    id: 3,
    text: 'hello3',
    sender: 'Mask3',
    addedAt: Date.now()
  },

]

MessagesRouter.get('/', async (req, res) => {
  res.json(messages)
})


module.exports = MessagesRouter;