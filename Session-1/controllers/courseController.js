const db = require('../models');

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    const [courses] = await db.execute('SELECT * FROM courses ORDER BY id DESC');
    res.render('courses/index', { courses });
  } catch (error) {
    res.status(500).send('Error fetching courses');
  }
};

// Show add course form
const showAddForm = (req, res) => {
  res.render('courses/add');
};

// Add new course
const addCourse = async (req, res) => {
  try {
    const { courseName, courseDuration, courseFees } = req.body;
    await db.execute(
      'INSERT INTO courses (courseName, courseDuration, courseFees) VALUES (?, ?, ?)',
      [courseName, courseDuration, courseFees]
    );
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error adding course');
  }
};

// Show edit form
const showEditForm = async (req, res) => {
  try {
    const [courses] = await db.execute('SELECT * FROM courses WHERE id = ?', [req.params.id]);
    if (courses.length === 0) {
      return res.status(404).send('Course not found');
    }
    res.render('courses/edit', { course: courses[0] });
  } catch (error) {
    res.status(500).send('Error fetching course');
  }
};

// Update course
const updateCourse = async (req, res) => {
  try {
    const { courseName, courseDuration, courseFees } = req.body;
    await db.execute(
      'UPDATE courses SET courseName = ?, courseDuration = ?, courseFees = ? WHERE id = ?',
      [courseName, courseDuration, courseFees, req.params.id]
    );
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error updating course');
  }
};

// Delete course
const deleteCourse = async (req, res) => {
  try {
    await db.execute('DELETE FROM courses WHERE id = ?', [req.params.id]);
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error deleting course');
  }
};

module.exports = {
  getAllCourses,
  showAddForm,
  addCourse,
  showEditForm,
  updateCourse,
  deleteCourse
};