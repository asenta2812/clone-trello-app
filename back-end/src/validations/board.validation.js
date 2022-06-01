const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createBoard = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
};


const getBoard = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

const changeOrderColumn = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
  body: Joi.object().keys({
    order: Joi.array().items(Joi.string()).required(),
  }),
}



module.exports = {
  createBoard,
  getBoard,
  changeOrderColumn
};
