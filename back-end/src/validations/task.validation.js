const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createTask = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    columnId: Joi.string().custom(objectId).required(),
    boardId: Joi.string().custom(objectId).required(),
    isOnTop: Joi.boolean()
  }),
};


const deleteTask = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};



module.exports = {
  createTask,
  deleteTask
};
