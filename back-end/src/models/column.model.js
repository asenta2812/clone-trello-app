const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const columnSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    boardId: mongoose.Schema.ObjectId,
    taskOrder: [{ type: String, default: [] }],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
// columnSchema.plugin(toJSON);
// columnSchema.plugin(paginate);


/**
 * @typedef Column
 */
const Column = mongoose.model('Column', columnSchema);
module.exports = Column;
