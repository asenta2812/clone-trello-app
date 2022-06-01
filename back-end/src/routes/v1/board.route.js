const express = require('express');
const validate = require('../../middlewares/validate');
const { boardValidation } = require('../../validations');
const { boardController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(validate(boardValidation.createBoard), boardController.createBoard);
router
  .route('/:id')
  .get(validate(boardValidation.getBoard), boardController.getBoard)
router
  .route('/:id/change-column-order')
  .post(validate(boardValidation.changeOrderColumn), boardController.changeOrderColumn)

module.exports = router;
