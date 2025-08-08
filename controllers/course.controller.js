const Course = require('../models/course.model');
const Enrollment = require('../models/enrollment.model');

exports.createCourse = async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).json(course);
};

exports.deleteCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.id, { isActive: false });
  await Enrollment.updateMany({ courseId: req.params.id }, { isActive: false });
  res.send("Course soft deleted with enrollments.");
};

exports.getCourseStudents = async (req, res) => {
  const enrollments = await Enrollment.find({ courseId: req.params.id, isActive: true }).populate('studentId');
  const students = enrollments.map(e => e.studentId);
  res.json(students);
};
