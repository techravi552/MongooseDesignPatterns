const Student = require('../models/student.model');
const Enrollment = require('../models/enrollment.model');

exports.createStudent = async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json(student);
};

exports.deleteStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(req.params.id, { isActive: false });
  await Enrollment.updateMany({ studentId: req.params.id }, { isActive: false });
  res.send("Student soft deleted with enrollments.");
};

exports.getStudentCourses = async (req, res) => {
  const enrollments = await Enrollment.find({ studentId: req.params.id, isActive: true }).populate('courseId');
  const courses = enrollments.map(e => e.courseId);
  res.json(courses);
};
