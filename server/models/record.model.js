const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  current: { 
    value: {type: Number }, 
    unit: { type: String },
  },
  power: { type: Number }, 
  frequency: { type: Number }, 
  energy: { type: Number }, 
  power_frquency: { type: Number }, 
});

module.exports = mongoose.model('Record', RecordSchema);
