const express = require('express');
const UserRouter = express.Router();
const {getAllusers} = require('../controllers/User');

UserRouter.get('/users', getAllusers);


module.exports = UserRouter;