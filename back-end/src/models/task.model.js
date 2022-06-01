const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const taskSchema = mongoose.Schema(
  {
    image: String,
    title: {
      type: String,
      required: true,
    },
    boardId: mongoose.Schema.ObjectId,
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
// taskSchema.plugin(toJSON);
// taskSchema.plugin(paginate);


/**
 * @typedef Task
 */
const Task = mongoose.model('Task', taskSchema);
module.exports = Task;
