const { Types } = require("mongoose");
const { Board } = require("../models");

/**
 * Create a board
 * @param {Object} boardBody
 * @returns {Promise<Board>}
 */
const createBoard = async (boardBody) => {
  return Board.create(boardBody);
};

/**
 * Get data's board by id
 * @param {String} boardId
 * @returns {Promise<Array>}
 */

const getBoard = async (boardId) => {
  const [result] = await Board.aggregate([
    {
      $match: { _id: Types.ObjectId(boardId) },
    },
    {
      $lookup: {
        from: "columns",
        localField: "_id",
        foreignField: "boardId",
        as: "columns"
      }
    }, {
      $lookup: {
        from: "tasks",
        localField: "_id",
        foreignField: "boardId",
        as: "tasks"
      }
    }
  ])
  return result;
}


/**
 * 
 * @param {String} boardId 
 * @param {Board} update Request's body have `order` field
 * @returns 
 */
const changeOrderColumn = async (boardId, { order }) => {
  return Board.findByIdAndUpdate(boardId, { columnOrder: order })
}


module.exports = {
  createBoard,
  getBoard,
  changeOrderColumn
}
