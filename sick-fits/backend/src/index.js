// let's go! starts up our node server
const cookieParser = require('cookie-parser');
require('dotenv').config({path: 'variables.env'});
const createServer = require('./createServer');
const db = require('./db');

const server = createServer();

//use express middleware for JWT cookies
server.express.use(cookieParser());
//and to populate current user


server.start({
    cors: {
        credentials: true,
        origin: [process.env.FRONTEND_URL, process.env.PLAYGROUND_URL]
    }
}, deets => {
        console.log(`Server is now running on port http:/localhost:${deets.port}`);    
});