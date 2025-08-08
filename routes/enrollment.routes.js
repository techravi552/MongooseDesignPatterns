const express = require('express');
const router = express.Router();
const controller = require('../controllers/enrollment.controller');

router.post('/', controller.enrollStudent);

module.exports = router;
