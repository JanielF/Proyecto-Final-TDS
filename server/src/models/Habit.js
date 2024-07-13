const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const HabitModel = mongoose.model('Habit', habitSchema);

module.exports = {HabitModel};