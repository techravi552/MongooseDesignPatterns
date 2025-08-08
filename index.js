const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const studentRoutes = require('./routes/student.routes');
const courseRoutes = require('./routes/course.routes');
const enrollmentRoutes = require('./routes/enrollment.routes');

const app = express();
app.use(express.json());

app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);
app.use('/enroll', enrollmentRoutes);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("✅ DB Connected");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.log("DB Error:", err));
