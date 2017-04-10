'use strict';

var router = require('express').Router();

router.use('/students', require('./students/student.router.js'));

router.use('/campuses', require('./campuses/campus.router.js'));

module.exports = router;
