const restify = require('restify');
const pointController = require('../../domain/controllers/pointController.js');
const corsMiddleware = require('restify-cors-middleware');
require ('dotenv').config();

const cors = corsMiddleware({
  preflightMaxAge: 5, 
  origins: ['*'], 
  allowHeaders: ['Authorization'], 
  exposeHeaders: ['API-Token-Expiry'], 
});
const server = restify.createServer();

server.pre(cors.preflight);
server.use(cors.actual);

server.use(restify.plugins.bodyParser());

server.post('/points', pointController.createPoint);
server.get('/points', pointController.getPoints);
server.put('/points/:id', pointController.updatePoint)
server.del('/points/:name', pointController.deletePoint)
server.get('/points/search/:name', pointController.findByName);


const PORT = process.env.PORT ;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
