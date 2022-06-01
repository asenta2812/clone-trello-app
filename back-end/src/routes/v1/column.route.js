const express = require('express');
const validate = require('../../middlewares/validate');
const { columnValidation } = require('../../validations');
const { columnController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(validate(columnValidation.createColumn), columnController.createColumn);
router
  .route('/:id')
  .patch(validate(columnValidation.updateColumn), columnController.updateColumn)
  .delete(validate(columnValidation.deleteColumn), columnController.deleteColumn)

router
  .route('/change-task-order')
  .post(validate(columnValidation.changeOrderTask), columnController.changeOrderTask)

module.exports = router;
