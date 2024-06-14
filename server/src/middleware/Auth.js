const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {UserModel} =  require('../models/User');

const Register = async (req, res) => {
    const {username, password,email,name,lastname,age} = req.body;
    try {
        const passwordHaashed = await bcrypt.hash(password, 'sha256');

        //Modelo del usuario
        const newUser = new UserModel({
            username,
            passwordHaashed,
            email,
            name,
            lastname,
            age,
        });

        const savedUser = await newUser.save();
        const userData = {
            username: savedUser.username,
            email: savedUser.email,
            name: savedUser.name,
            lastname: savedUser.lastname
        }
        res.status(200).json({
            success: true,
            message: 'Usuario registrado',
            data: userData
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        });
    }
}

const Login = async (req, res) => {
    const { username, password} = req.body;
    try {
        const user = await UserModel.findOne({ username: username});
        if(!user) {
            throw new Error('Usuario no encontrado');
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            throw new Error('Contraseña incorrecta');
        }
        const token = jwt.sign({ id: user._id,username: user.username, email: user.email, name: user.name}, process.env.JWT_SECRET, {expiresIn: '2h'});
        res.status(200).json({
            success: true,
            message: 'Usuario logueado',
            data: token
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
            data: null
        })
    }
}