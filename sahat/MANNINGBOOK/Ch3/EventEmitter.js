var EventEmitter = require('events').EventEmitter;
var channel0 = new EventEmitter();
channel0.on('join', function(){
    console.log('Welcome');
});


var events = require('events');
var net = require('net');

var channel = new events.EventEmitter;
channel.clients = {};
channel.subscriptions = {};

channel.on('join', function(id, client) {
    var that = this;
    this.clients[id] = client;
    this.subscriptions[id] = function(senderId, message){
        if (id != senderId){
            that.clients[id].write(message);
        }
    };
    this.on('broadcast', this.subscriptions[id]);
});
channel.on('leave', function(id){
    channel.removeListener('broadcast', this.subscriptions[id]);
    channel.emit('broadcast', id, id + " has left the chat\n");
});
channel.on('shutdown', function(){
    channel.emit('boradcast', '', 'Chat has shut down.\n');
    channel.removeAllListeners('broadcast');
});

var server = net.createServer(function(client){
   var id = client.remoteAddress + ":" + client.remotePort;
    client.on('connect', function(){
        channel.emit('join', id, client);
    });
    client.on('data', function(data){
        data = data.toString();
        if (data == "shutdown\r\n") {
            channel.emit('shutdown');
        }
        channel.emit('broadcast', id, data);
    });

    client.on('close', function(){
        channel.emit('leave', id);
    })
});
server.listen(8888);