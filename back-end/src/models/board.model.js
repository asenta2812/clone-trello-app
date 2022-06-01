const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const boardSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    columnOrder: [{ type: String, default: [] }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
boardSchema.plugin(toJSON);
boardSchema.plugin(paginate);


/**
 * @typedef Board
 */
const Board = mongoose.model('Board', boardSchema);
module.exports = Board;
