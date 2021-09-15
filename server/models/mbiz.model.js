const mongoose = require('mongoose');

const MbizSchema = new mongoose.Schema({
  name: {type: String},
  value: { type: Number },
  time: { type: Date },
  unit: { type: String },
});

module.exports = mongoose.model('Mbiz', MbizSchema);
