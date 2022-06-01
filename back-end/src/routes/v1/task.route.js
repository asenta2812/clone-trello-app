const express = require('express');
const validate = require('../../middlewares/validate');
const { taskValidation } = require('../../validations');
const { taskController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .post(validate(taskValidation.createTask), taskController.createTask);
router
  .route('/:id')
  .delete(validate(taskValidation.deleteTask), taskController.deleteTask)

module.exports = router;
