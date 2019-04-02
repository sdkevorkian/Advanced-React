// let's go! starts up our node server
require('dotenv').config({path: 'variables.env'});
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

// todo: use express middleware for JWT cookies/current user

server.start({
    cors: {
        credentials: true,
        origin: [process.env.FRONTEND_URL, process.env.PLAYGROUND_URL]
    }
}, deets => {
        console.log(`Server is now running on port http:/localhost:${deets.port}`);    
});