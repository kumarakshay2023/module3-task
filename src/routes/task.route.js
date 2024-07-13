const express = require('express');
const { addTask, getTaskById, getAllTasks, updateTask, deleteTask } = require('../controllers/task.controller');
const { taskAddValidation, taskUpdateValidation } = require('../validations/task.validation');
const taskRouter = express.Router();

taskRouter.post('/tasks',taskAddValidation,addTask);
taskRouter.get('/task/:id',getTaskById)
taskRouter.get('/tasks',getAllTasks)
taskRouter.put('/task/:id',taskUpdateValidation,updateTask);
taskRouter.delete('/task/:id',deleteTask)

module.exports=taskRouter;

