const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { columnService } = require('../services');

const createColumn = catchAsync(async (req, res, next) => {
  const column = await columnService.createColumn(req.body);
  res.code = httpStatus.CREATED;
  res.result = column;
  next();
});
const updateColumn = catchAsync(async (req, res, next) => {
  const column = await columnService.updateColumn(req.params.id, req.body);
  res.result = column;
  next();
});
const deleteColumn = catchAsync(async (req, res, next) => {
  const column = await columnService.deleteColumn(req.params.id);
  res.result = column;
  next();
});
const changeOrderTask = catchAsync(async (req, res, next) => {
  const column = await columnService.changeOrderTask(req.body);
  res.result = column;
  next();
});

module.exports = {
  createColumn,
  deleteColumn,
  changeOrderTask,
  updateColumn
};
