const ApiError = require("../utils/ApiError");
const { asyncHandler } = require("../utils/asyncHandler");

let tasks = [];
let id = 1;
exports.addTask = asyncHandler(async (req, res) => {
  const { title, description, completed } = req.body;
  tasks.push({
    id: id++,
    title: title,
    description: description,
    completed: completed,
  });
  return res.status(200).json({
    mes: "Task created successfully",
    data: tasks,
    success: true,
  });
});

exports.getTaskById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const filteredTask = tasks.filter((i) => {
    return i.id == id;
  });
  if (filteredTask.length === 0) throw new ApiError("Task not found", 400);
  return res.status(200).json({
    data: filteredTask,
    success: true,
  });
});

exports.getAllTasks = asyncHandler(async (req, res) => {
  const allTasks = [...tasks];
  if (allTasks.length === 0) throw new ApiError("Task not found", 400);
  return res.status(200).json({
    data: allTasks,
    success: true,
  });
});

exports.updateTask = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const taskToupdate = tasks.find(task=>task.id == id);
  if(!taskToupdate) throw new ApiError("Task not found",400)
   taskToupdate.title = title;
   taskToupdate.description = description;
   taskToupdate.completed = completed;
   return res.status(200).json({
    msg:"Task updated successfully",
    data:taskToupdate,
    success: true,
  });
});


exports.deleteTask = asyncHandler(async (req, res) => {
    const {id} = req.params
    const taskToupdate = tasks.find(task=>task.id == id);
    if(!taskToupdate) throw new ApiError("Task not found",400);
    tasks =  tasks.filter(task=>task.id != id);
    return res.status(200).json({
        msg:"Task removed successfully",
        success: true,
      });
})