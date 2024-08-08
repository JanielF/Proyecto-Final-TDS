const {HabitModel} = require('../models/Habit');
const mongoose  = require('mongoose');
const HabitByUser = async(req, res) => {
    try {
        const user = await req.user.id;
        const habit = await HabitModel.find({userId: user});
        if(!habit){
            return res.status(404).json({
                message: 'Habit not found'
            });
        }
        return res.status(200).json({
            success:true,
            message: 'Habits retrieved successfully',
            data: habit
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message: 'Error: '+ error.message
        })
    }
}

const getHabit = async(req, res) =>
{
    try {
        const habit = await HabitModel.findById(req.params.id);
        if(!habit){
            return res.status(404).json(
                {
                    succes: false,
                    message: 'Habit not found'
                });
        }
        return res.status(200).json({
            succes:true,
            message: 'Habit retrieved successfully',
            data: habit
        })
    } catch (error) {
        return res.status(500).json({
            succes:false,
            message: 'Error: ' + error.message
        })
    }
}

const createHabit = async(req,res) =>{
    try {
        const userId = req.user.id;
        const {name, description, frequency} = req.body;
        const habit = new HabitModel({
            name,
            description,
            frequency,
            userId: new mongoose.Types.ObjectId(userId)
        });
        await habit.save();
        return res.status(201).json({
            succes: true,
            message: 'Habit created successfully',
            data: habit
        });   
    } catch (error) {
        throw new Error(error.message);
    }
}
const completedHabit = async (req,res) =>{
    try {
        const habitId = req.params.id;
        const habit = await HabitModel.findById(habitId);
        if(!habit){
            return res.status(404).json({
                message: 'Habit not found'
            });
        }
        habit.completed = true;
        habit.completedCount += 1;
        habit.lastCompleted = Date.now();
        await habit.save();
        res.status(200).json({
            success:true,
            message: 'Habit completed successfully',
            data: habit
        });
    } catch (error) {
        throw new Error(error.message);
    }
}

const updateHabit = async (req,res) => {
    try {
        const id = req.params.id;
        const {name, description, frequency} = req.body;    
        const habit = await HabitModel.findByIdAndUpdate(id,
            {
                name: name,
                description: description,
                frequency: frequency
            }, 
            {new : true}
        )
        return res.status(200).json({
            succes:true,
            message: 'Habit updated successfully',
            data: habit
        })   
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error: '+ error.message
        })
    }
}

const deleteHabit = async (req,res) => {
    try {
        const id = req.params.id;
        const habit = await HabitModel.findByIdAndDelete(id);
        if(!habit){
            return res.status(404).json({
                message: 'Habit not found'
            });
        }
        return res.status(200).json({
            success:true,
            message: 'Habit deleted successfully',
            data: habit
        })   
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error: '+ error.message
        })
    }
}

module.exports= {HabitByUser, getHabit, createHabit, deleteHabit, updateHabit, completedHabit};