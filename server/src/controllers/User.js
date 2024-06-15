const {UserModel} =  require('../models/User');
const bcrypt = require('bcrypt');
const getAllusers = async (req, res) => {
    try {
        const users = await UserModel.find();

        const userData = users.map(user =>({
            _id: users._id,
            username: users.username,
            email: users.email,
            name: users.name,
            lastname: users.lastname,
            age: users.age
        }))
        res.status(200).json({
            success:true,
            message:'All users',
            data: userData});
    } catch (error) {
        res.status(500).json({success:false,message:error.message,data:null});
    }
}

const EditUser = async (req, res) => {
    try {
        if(req.body.password){
            const passwordHaashed = await bcrypt.hash(req.body.password, 10);
            req.body.password =  passwordHaashed;
        }
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
        if(!updatedUser){
            throw new Error('Usuario no encontrado');
        }
        updatedUserData = {
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            name: updatedUser.name,
            lastname: updatedUser.lastname,
            age: updatedUser.age
        }
        res.status(201).json({
                    success:true,
                    message:'Usuario actualizado',
                    data: updatedUserData});
    } catch (error) {
        res.status(500).json({success:false,message:error.message,data:null});
    }
}

const DeleteUser = async(req, res) => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
        if(!deletedUser){
            throw new Error('Usuario no encontrado');
        }
        res.status(201).json({
                    success:true,
                    message:'Usuario eliminado',
                    data: null});
    } catch (error) {
        res.status(500).json({success:false,message:error.message,data:null});
    }   
}

module.exports = {getAllusers, EditUser, DeleteUser};