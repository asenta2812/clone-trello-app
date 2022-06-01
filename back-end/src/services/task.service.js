const { ObjectId } = require("mongoose");
const { Task, Column } = require("../models");

/**
 * Create a task
 * @param {Object} taskBody
 * @returns {Promise<Task>}
 */
const createTask = async (taskBody) => {
  const taskCreate = { ...taskBody, isOnTop: undefined, columnId: undefined }
  const taskAdded = await Task.create(taskCreate);
  const column = await Column.findById(taskBody.columnId);
  if (taskBody.isOnTop) {
    column.taskOrder?.unshift(taskAdded._id)
  } else {
    column.taskOrder?.push(taskAdded._id)
  }
  await column.save();
  return taskAdded;
};


/**
 * Delete task by id
 * @param {ObjectId} taskId
 * @returns {Promise<Task>}
 */
const deleteTaskById = async (id) => {
  const task = await Task.deleteOne({ _id: id });
  return task;
};


module.exports = {
  createTask,
  deleteTaskById,
}
