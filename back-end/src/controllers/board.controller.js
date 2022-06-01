const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { boardService } = require('../services');

const createBoard = catchAsync(async (req, res, next) => {
  const board = await boardService.createBoard(req.body);
  res.code = httpStatus.CREATED;
  res.result = board;
  next();
});
const getBoard = catchAsync(async (req, res, next) => {
  const board = await boardService.getBoard(req.params.id);
  if (board) {
    board.columns.forEach(col => {
      col.tasks = board.tasks.filter(f => col.taskOrder.includes(f._id.toString()))
    })
    // delete board.tasks
  }
  res.result = board;
  next();
});
const changeOrderColumn = catchAsync(async (req, res, next) => {
  const board = await boardService.changeOrderColumn(req.params.id, req.body);
  res.result = board;
  next();
});

module.exports = {
  createBoard,
  getBoard,
  changeOrderColumn
};
