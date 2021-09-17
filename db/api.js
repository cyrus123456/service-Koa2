var mongoose = require('./db.js');

var Schema = mongoose.Schema({
  id: String,
  name: String,
  done: Boolean
})
module.exports = mongoose.model('ToDoList', Schema);