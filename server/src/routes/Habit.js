const express = require('express');
const {HabitByUser, getHabit, createHabit, updateHabit, deleteHabit, completedHabit} = require('../controllers/Habit.js')
const {authMiddleware} = require('../middleware/Auth.js');
const HabitRouter = express.Router();

HabitRouter.get('/byuser', authMiddleware, HabitByUser);
HabitRouter.get('/:id',authMiddleware, getHabit);
HabitRouter.post('/', authMiddleware, createHabit);
HabitRouter.put('/:id',authMiddleware, updateHabit);
HabitRouter.delete('/:id', authMiddleware, deleteHabit);
HabitRouter.patch('/completed/:id', authMiddleware, completedHabit);

module.exports = HabitRouter;