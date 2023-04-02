'use strict';

import http from 'http';
import express from 'express';
import subdomain from 'express-subdomain';
import session from 'express-session';
import SocketIO from 'socket.io';
import compression from 'compression';
import errorHandler from 'errorhandler';
import morgan from 'morgan';
import bodyParser from 'body-parser';

// Importing config
import Config from './configs/config';
const config = new Config();

// Start the engine
const app = express();

// Run socket.io server
const server = http.Server(app);
const io = new SocketIO(server);

// Customizing Socket.io
io.attach(config.socket_port, {
  'path': '/',
  'serveClient': true,
  'origin': '*',
  'transports': ['websocket'],
  'allowUpgrades': true,
  'wsEngine': 'ws'
});

if (io) {
  console.log(`Websocket start running on port ${config.socket_port}`)
}

// Logging
app.use(morgan('combined'));

// Handle all error in development mode
if(config.env === 'development') {
  app.use(errorHandler())
}

// use compression as middleware to compress response data
app.use(compression())

// Use bodyParser with urlencoded as middleware to handle data from POST HTTP verb
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Create session for incoming connection
app.use(session({
  secret: 'UKn0wWhatIMean',
  name: 'sessionId',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    httpOnly: true
  }
}))

// Pass socket.io as middleware to express
app.use(async (request, response, next) => {
  response.io = await io;
  next();
});

const userData = {};

io.on('connection', (socket) => {
  console.log(`Client connected with socket ID: ${socket.client.id}`);

  socket.on('user_data', (data) => {

    userData = data;

    console.log(`Recieved data from client: ${userData}`);
  });

})


io.on('disconnect', (reason) => {
  console.log(`The client was disconnected : ${reason}`)
});

// Import all router
import apiRouter from './routes/api';

// Routing
app.use(subdomain('api', apiRouter));

// Listening
app.listen(config.api_port, ()=> {
  console.log(`App start listening on port ${config.api_port}`)
});

module.exports = app;
