const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Route = new Schema({
  route_name: {
    type: String
  },
  id: {
    type: Number
  }
}, {
  collection: 'users'
})

module.exports = mongoose.model('Route', Route)