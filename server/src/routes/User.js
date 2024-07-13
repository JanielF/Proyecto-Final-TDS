const express = require('express');
const UserRouter = express.Router();
const {getAllusers, EditUser, DeleteUser} = require('../controllers/User');
const {authMiddleware} = require('../middleware/Auth');
UserRouter.get('/', getAllusers);
UserRouter.put('/:id', authMiddleware ,EditUser);
UserRouter.delete('/:id', authMiddleware, DeleteUser);


module.exports = UserRouter;