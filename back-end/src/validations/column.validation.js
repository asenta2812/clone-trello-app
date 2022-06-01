const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createColumn = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    boardId: Joi.string().custom(objectId).required()
  }),
};

const updateColumn = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    name: Joi.string().required(),
    boardId: Joi.string().custom(objectId)
  }),
};


const deleteColumn = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const changeOrderTask = {
  body: Joi.object().keys({
    order: Joi.array().items(Joi.string()),
    id: Joi.string().custom(objectId),
    id_old: Joi.string().custom(objectId),
    id_new: Joi.string().custom(objectId),
    task_id: Joi.string().custom(objectId),
    order_old: Joi.array().items(Joi.string()),
    order_new: Joi.array().items(Joi.string()),
  }),
}



module.exports = {
  createColumn,
  deleteColumn,
  changeOrderTask,
  updateColumn
};
