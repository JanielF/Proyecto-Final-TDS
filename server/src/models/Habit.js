const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    frequency: { type: String, enum: ['daily', 'weekly', 'monthly'], required: true },
    completedCount: { type: Number, default: 0 },
    completed: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now()},
    lastCompleted: {type: Date},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const HabitModel = mongoose.model('Habit', habitSchema);

module.exports = {HabitModel};