const { Router } = require('express');
const apiRouter = Router();

const AssetsRouter = require('./assets')
const MessagesRouter = require('./messages')

apiRouter.use('/assets', AssetsRouter);
apiRouter.use('/messages', MessagesRouter);

module.exports = apiRouter;