const Enrollment = require('../models/enrollment.model');
const Student = require('../models/student.model');
const Course = require('../models/course.model');

exports.enrollStudent = async (req, res) => {
  const { studentId, courseId } = req.body;

  const student = await Student.findById(studentId);
  const course = await Course.findById(courseId);

  if (!student?.isActive || !course?.isActive) {
    return res.status(400).send("Student or Course is inactive.");
  }

  const enrollment = await Enrollment.create({ studentId, courseId });
  res.status(201).json(enrollment);
};
