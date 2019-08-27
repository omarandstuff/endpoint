var app = require('express')()
var http = require('http').createServer(app)
var io = require('socket.io')(http)
var bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.post('/endpoint', function(req, res) {
  io.emit('chat message', JSON.stringify(req.body))
  if(req.body && req.body.challenge) {
    res.send(req.body.challenge)
  } else {
    res.send()
  }
})

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg)
  })
})

http.listen(3000, function() {
  console.log('listening on *:3000')
})
