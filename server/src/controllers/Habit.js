//Contolador de Habit
const{HabitModel} = require('../models/Habit');
const getAllHabit = async(req, res) => {
    try {
        const habits = await HabitModel.find();
        res.status(200).json({
            success: true,
            message: 'Habitas obtenidas',
            data: habits
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
            data:"Error encontrado"
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
            data: newHabit
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
            data: updatedHabit
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
            data: deletedHabit
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
            data: "Error encontrado"
        })
    }
}

module.exports = {getAllHabit, GetHabit, CreateHabit, EditHabit, DeleteHabit}


