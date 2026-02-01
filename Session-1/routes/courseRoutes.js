const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Routes
router.get('/', courseController.getAllCourses);
router.get('/add', courseController.showAddForm);
router.post('/add', courseController.addCourse);
router.get('/edit/:id', courseController.showEditForm);
router.post('/edit/:id', courseController.updateCourse);
router.get('/delete/:id', courseController.deleteCourse);

module.exports = router;