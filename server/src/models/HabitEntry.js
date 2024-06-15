const mongoose = require('mongoose');

const habitEntrySchema = new mongoose.Schema({
    habitId: { type: mongoose.Schema.Types.ObjectId, ref: 'Habit', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
    completed: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
  });
  
  const HabitEntry = mongoose.model('HabitEntry', habitEntrySchema);

  module.exports = {HabitEntry};