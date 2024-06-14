const {UserModel} = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const {JwtPayload} = require('jsonwebtoken');


const EMAIL_SECRET = process.env.EMAIL_SECRET || "NOEMAIL";
const EMAIL_PASS = process.env.EMAIL_PASS || "NOPASS";
const transporte = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    service: 'gmail',
    auth: {
        user: EMAIL_SECRET,
        pass:  EMAIL_PASS
    }
});

const resetPassword = async (req, res) => {
    const {email} = req.body;
    try {
        const user = await UserModel.findOne({email});
        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        }
        const resetToken = jwt.sign({id:user._id, email:email}, EMAIL_SECRET, {expiresIn: '1h'});
        const url = `127.0.0.1:3000/api/auth/reset/${resetToken}`;

        await transporte.sendMail({
            to: email,
            subject: 'Recuperar contraseña',
            html: `
                <h1>Recuperar contraseña</h1>
                <p>Haz click en el siguiente enlace para recuperar tu contraseña</p>
                <p>${url}</p>`
        });
        res.status(200).json({
            succes:true,
            message: 'Email enviado'
        });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
            data:'Error obtenido'
        })
    }
}

const changePassword = async (req, res) => {
    const {newPassword} = req.body;
    const {token} = req.params;
    try {
        const decaded = jwt.verify(token, EMAIL_SECRET);
        const passwordHaashed = await bcrypt.hash(newPassword, 10);
        await UserModel.findByIdAndUpdate(decaded.id, {password: passwordHaashed});
        res.status(200).json({
            success:true,
            message: 'Contraseña cambiada'
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message,
            data:'Error obtenido'
        })
    }
}

module.exports = {resetPassword, changePassword}