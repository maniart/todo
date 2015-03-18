  // imports
var express = require('express')
  , path = require('path')
  , bodyParser = require('body-parser')
  , mongoose = require('mongoose')    

  // app
  , app = express()
  
  // db
  , todoSchema = new mongoose.Schema({
      id: Number,
      todo: String
    })
  , Todo = mongoose.model('Todo', todoSchema);

// db
mongoose.set('debug', true);

var connect = function () {
  var options = {
    server: {
      socketOptions: {
        keepAlive: 1 
      } 
    } 
  };
  mongoose.connect('mongodb://localhost/todo', options);
};
connect();
mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);
mongoose.connection.on('connected', function() {
    console.log('mongoose connected');
});

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// route handling
app.post('/api', function(req, res, next) {
  
  new Todo({
    todo: req.body.todo
  }).save(function(err, todo) {
    if(err) {
      res.json({
          error: 'Woops.', 
          field: 'todo',
          err: err
      }); 
    } 
    console.log('saved to db: ', todo);
    res.json(todo.toObject());    
  });
  
});

app.get('/api', function(req, res, next) {

  Todo.find({}, 'todo', function(err, todo){
    if(err) {
      res.json({
          error: 'Woops.', 
          field: 'todo',
          err: err
      }); 
    } 
    res.json(todo); 
  });

});

// port
app.set('port', process.env.PORT || 3030);

var server = app.listen(app.get('port'), function() {
  console.log('todo server listening on port ' + server.address().port)
});


