/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * mobilegeeks: http://feeds.feedburner.com/netbooknewsde?format=xml
 * caschys blog: http://feeds.feedburner.com/stadt-bremerhaven/dqXM?format=xml
 * 
 */

var FeedSub = require('feedsub');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.get('/', function(req,res){

    res.sendFile(__dirname+'/index.html');
});

app.get('/css/normalize.css', function(req,res){
    res.sendFile(__dirname+'/css/normalize.css');
});


app.get('/css/foundation.css', function(req,res){
    res.sendFile(__dirname+'/css/foundation.css');
});

app.get('/css/app.css', function(req,res){
    res.sendFile(__dirname+'/css/app.css');
});

app.get('/js/vendor/modernizr.js', function(req,res){
    res.sendFile(__dirname+'/js/vendor/modernizr.js');
});

app.get('/js/vendor/jquery.js', function(req,res){
    res.sendFile(__dirname+'/js/vendor/jquery.js');
});

app.get('/js/foundation.min.js', function(req,res){
    res.sendFile(__dirname+'/js/foundation.min.js');
});





function queue(len) {
    var ret = [];

    ret.push = function() {
        if(ret.length === len) ret.shift();
        return Array.prototype.push.apply(this, arguments);
    };

    return ret;
}

var readers = [];
var newsqueueLength = 100;
var newsqueue = queue(newsqueueLength);
var feedSources= [
        "http://derstandard.at/?page=rss&ressort=web",
        "http://feeds.feedburner.com/ScottHanselman"
];


io.on('connection', function(socket){
    console.log('a user connected');

    for (var newsqueueIndex=0; newsqueueIndex < newsqueueLength; newsqueueIndex++){
        socket.emit('newsfeed',newsqueue[newsqueueIndex]);
    }
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
});


http.listen(3000, function (){
    console.log('listening on *:3000');
});




 


for (var i = 0; i < feedSources.length; i++) {
    console.log(feedSources[i]);

    readers.push(
        new FeedSub(feedSources[i], {
            interval: 1,
            autoStart: true,
            emitOnStart: true
        })
    );
    readers[i].on('item', function(item){

           var time = new Date();
           var timestamp = time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds() +'---';
           var msg= timestamp + '<a href="'+item.link+'" target="_blank">'+item.title+'</a>';
           console.log(timestamp +"-- Titel: "+item.title);
           console.log(timestamp +"-- Link: "+item.link);
           console.log(timestamp +"-- pubdate: "+item.pubdate);
           io.sockets.emit('newsfeed',msg);
           newsqueue.push(msg);
           
           });
    readers[i].on('error', function (){
        console.log('unhandled error ');
    });
    console.log('readers pushed');
    
}

console.log('Anzahl feeds: '+readers.length);


