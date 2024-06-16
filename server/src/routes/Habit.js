const express = require('express');
const {getAllHabit, GetHabit, CreateHabit, EditHabit, DeleteHabit, getHabitByUser, getHabitById} = require('../controllers/Habit.js');
const {authMiddleware} = require('../middleware/Auth.js');
const HabitRouter = express.Router();

HabitRouter.get('/',  authMiddleware ,getAllHabit);
HabitRouter.get('/habit/:id', GetHabit);
HabitRouter.post('/create', CreateHabit);
HabitRouter.put('/edit/:id', EditHabit);
HabitRouter.delete('/delete/:id', DeleteHabit);
HabitRouter.get('/user', authMiddleware, getHabitByUser);
HabitRouter.get('/byuser', authMiddleware, getHabitById);

module.exports = HabitRouter;