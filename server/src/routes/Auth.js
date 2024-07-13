const express =  require('express');
const {Login,Register} = require('../middleware/Auth');
const {changePassword, resetPassword} = require('../middleware/reset');
const AuthRouter = express.Router();

AuthRouter.post('/login',Login);
AuthRouter.post('/register',Register);
AuthRouter.post('/reset-password', resetPassword);
AuthRouter.post('/reset/:token', changePassword);

module.exports = AuthRouter;
