const express = require('express');
const {getAllHabit, GetHabit, CreateHabit, EditHabit, DeleteHabit} = require('../controllers/Habit.js');
const {authMiddleware} = require('../middleware/Auth.js');
const HabitRouter = express.Router();

HabitRouter.get('/',  authMiddleware ,getAllHabit);
HabitRouter.get('/:id', GetHabit);
HabitRouter.post('/', CreateHabit);
HabitRouter.put('/:id', EditHabit);
HabitRouter.delete('/:id', DeleteHabit);

module.exports = HabitRouter;