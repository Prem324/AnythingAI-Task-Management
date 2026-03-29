const express = require('express');
const { getTasks, getTask, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const { protect, authorize } = require('../middleware/authMiddleware');
const validate = require('../middleware/validationMiddleware');
const { taskCreateSchema, taskUpdateSchema } = require('../utils/validation');

const router = express.Router();

router.use(protect); // All task routes are protected

router
    .route('/')
    .get(getTasks)
    .post(validate(taskCreateSchema), createTask);

router
    .route('/:id')
    .get(getTask)
    .put(validate(taskUpdateSchema), updateTask)
    .delete(authorize('admin'), deleteTask); // Delete is admin-only

module.exports = router;
