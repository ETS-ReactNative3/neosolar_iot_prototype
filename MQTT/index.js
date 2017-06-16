import mosca from 'mosca'
import mongoose from 'mongoose'
import { moscaSettings, MONGO } from './config/config'
import { Authenticate,
				 AuthorizePublish,
				 AuthorizeSubscribe } from './auth/auth'

const database  = process.env.MONGO_URL || MONGO.uri

mongoose.Promise = global.Promise; //mongoose uso de promesas es6
mongoose.connect(database);

var server = new mosca.Server(moscaSettings);
server.on('ready', setup);

server.on('clientConnected', function(client) {
	console.log('client connected --> ', client.id);
});

// fired when a client disconnects
server.on('clientDisconnected', function(client) {
	console.log('Client Disconnected --> ', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
  console.log('Published', packet.topic, packet.payload.toString());
});

var message = {
  topic: 'device/#',
  payload: 'Todos los devices', // or a Buffer
};

function send(){
  setTimeout(function(){
    server.publish(message, function() {
      //console.log('done!');
    });
  }, 9000)
}

//send()

// fired when the mqtt server is ready
function setup() {
	server.authenticate = Authenticate;
  console.log('MQTT server is up and running')
}