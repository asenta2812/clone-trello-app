const { ObjectId } = require("mongoose");
const { Column, Board } = require("../models");

/**
 * Create a column
 * @param {Object} columnBody
 * @returns {Promise<Column>}
 */
const createColumn = async (columnBody) => {
  const column = await Column.create(columnBody);
  const board = await Board.findById(columnBody.boardId);
  board.columnOrder?.push(column._id)
  await board.save();
  return column;
};


/**
 * Delete column by id
 * @param {ObjectId} columnId
 * @returns {Promise<Column>}
 */
const deleteColumn = async (id) => {
  const entity = await Column.findById(id);
  const board = await Board.findById(entity.boardId);
  board.columnOrder = board.columnOrder.filter(f => f !== id)
  await board.save();
  await entity.remove();

  return entity;
};


/**
 * Change task's order in column
 * @param {Object} body Request's body 
 * @returns 
 */

const changeOrderTask = async ({ order_old, order_new, id_old, id_new, order, id }) => {
  if (order && id) {
    return Column.findByIdAndUpdate(id, { taskOrder: order })
  }
  if (order_old && order_new && id_old && id_new) {
    await Column.findByIdAndUpdate(id_old, { taskOrder: order_old })
    return await Column.findByIdAndUpdate(id_new, { taskOrder: order_new })
  }
}
/**
* Update column by id
* @param {ObjectId} columnId
* @param {Object} updateBody
* @returns {Promise<User>}
*/
const updateColumn = async (columnId, updateBody) => {
  const column = await Column.findById(columnId);
  if (!column) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Column not found');
  }
  Object.assign(column, updateBody);
  await column.save();
  return column;
};

module.exports = {
  createColumn,
  deleteColumn,
  changeOrderTask,
  updateColumn
}
