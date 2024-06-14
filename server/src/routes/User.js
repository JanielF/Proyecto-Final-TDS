const express = require('express');
const UserRouter = express.Router();
const {getAllusers, EditUser, DeleteUser} = require('../controllers/User');

UserRouter.get('/', getAllusers);
UserRouter.put('/:id',EditUser);
UserRouter.delete('/:id',DeleteUser);


module.exports = UserRouter;