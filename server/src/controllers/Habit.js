//Contolador de Habit
const { mongoose } = require('mongoose');
const{HabitModel} = require('../models/Habit');
const getAllHabit = async(req, res) => {
    try {
        const habits = await HabitModel.find();
        res.status(200).json({
            success: true,
            message: 'Habitas obtenidas',
            data: habits,
            userToken: req.user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
            data:"Error encontrado"});
    }
}

const GetHabit = async(req, res) => {
    try {
        const habit = await HabitModel.findById(req.params.id);
        if(!habit){
            throw new Error('Habit no encontrada');
        }
        res.status(200).json({
            success:true,
            message:'Habit obtenida',
            data: habit
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
            data:"Error encontrado",
            userToken: req.user
        })
    }
}

const CreateHabit = async(req, res) =>{
    const {name, description, frequency, userId } = req.body
    try {
        const newHabit = new HabitModel({
            name,
            description,
            frequency,
            userId
        });
        res.status(201).json({
            success:true,
            message:'Habit creada',
            data: newHabit,
            userToken: req.user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
            data:"Error encontrado"
        });
    }
}

const EditHabit = async(req, res) => {
    try {
        const updatedHabit = await HabitModel.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!updatedHabit){
            throw new Error('Habit no encontrada');
        }
        res.status(200).json({
            success:true,
            message:'Habit actualizada',
            data: updatedHabit,
            userToken: req.user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
            data: "Error encontrado"
        })
    }
}

const DeleteHabit = async(req, res) => {
    try {
        const deletedHabit = await HabitModel.findByIdAndDelete(req.params.id);
        if(!deletedHabit){
            throw new Error('Habit no encontrada');
        }
        res.status(200).json({
            success:true,
            message:'Habit eliminada',
            data: deletedHabit,
            userToken: req.user
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
            data: "Error encontrado"
        });
    }
}

const getHabitById = async (req, res) => {
    try {
        const {userId} = req.user.id; 
        const habits = await HabitModel.find({ userId: userId });
        res.status(200).json({
            success: true,
            message: 'Hábitos obtenidos',
            data: habits
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: "Error encontrado"
        });
    }
}

const getHabitByUser = async (req, res) => {
    try {
        const habits = await HabitModel.find({ username: req.user.username });

        res.status(200).json({
            success: true,
            message: 'Hábitos obtenidos',
            data: habits
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: "Error encholaontrado"
        });
    }
}

module.exports = {getAllHabit, GetHabit, CreateHabit, EditHabit, DeleteHabit,getHabitByUser, getHabitById}


