const express = require('express');
const {getAllHabit, GetHabit, CreateHabit, EditHabit, DeleteHabit, getHabitById} = require('../controllers/Habit.js');
const {authMiddleware} = require('../middleware/Auth.js');
const HabitRouter = express.Router();

HabitRouter.get('/',  authMiddleware ,getAllHabit);
HabitRouter.get('/habit/:id', GetHabit);
HabitRouter.post('/create',authMiddleware, CreateHabit);
HabitRouter.put('/edit/:id', EditHabit);
HabitRouter.get('/byuser', authMiddleware, getHabitById);

module.exports = HabitRouter;