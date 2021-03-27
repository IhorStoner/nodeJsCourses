const path = require('path');
const express = require('express')
const apiRouter = require('./routes');

const server = express();

server.use(express.json());

server.use('/api', apiRouter);

server.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public','index.html'))
});

server.use((err, req, res, next) => {
  res
    .status(500)
    .send({ error: err.message })
});


const PORT = process.env.PORT || 5005

const start  = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`Server is running on ${PORT} port`)
    });
  }
  catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()