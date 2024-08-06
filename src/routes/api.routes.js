const express = require('express');
const router = express.Router();

router.use('/admin', require('./admin.routes'));
router.use('/course',require('./course.routes'));
router.use('/student',require('./student.routes'));
router.use('/instructor',require('./instructor.routes'));
router.use('/instructorlog', require('./instructorlog.routes'))




module.exports = router;
