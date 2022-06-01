const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { taskService } = require('../services');

const createTask = catchAsync(async (req, res, next) => {
  const task = await taskService.createTask(req.body);
  res.code = httpStatus.CREATED;
  res.result = task;
  next();
});
const deleteTask = catchAsync(async (req, res, next) => {
  const task = await taskService.deleteTaskById(req.params.id);
  res.result = task;
  next();
});
module.exports = {
  createTask,
  deleteTask,
};
