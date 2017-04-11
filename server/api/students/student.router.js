'use strict';

var router = require('express').Router();

var HttpError = require('../../utils/HttpError');
var Campus = require('../../../db/models/campus');
var Student = require('../../../db/models/student');

router.param('id', function (req, res, next, id) {
  Student.findById(id)
  .then(function (student) {
    if (!student) throw HttpError(404);
    req.requestedStudent = student;
    next();
    return null;
  })
  .catch(next);
});

router.get('/', function (req, res, next) {
  Student.findAll({})
  .then(function (users) {
    res.json(users);
  })
  .catch(next);
});

router.post('/', function (req, res, next) {
  Student.create(req.body)
  .then(function (student) {
    res.status(201).json(student);
  })
  .catch(next);
});

router.get('/:id', function (req, res, next) {
  req.requestedStudent.reload(Student.options.scopes.populated())
  .then(function (requestedStudentInclCampus) {
    res.json(requestedStudentInclCampus);
  })
  .catch(next);
});

//TODO: we might need to modify this so we can edit a student's info,
// including the campus that student is assigned to
router.put('/:id', function (req, res, next) {
  req.requestedStudent.reload(Student.options.scopes.populated())
  .then(function (requestedStudentInclCampus){
    //making sure the campus is updated if only the campus_id is provided
    if(req.body.campus_id) {
      Campus.findById(req.body.campus_id)
        .then(function (campus) {
          if (!campus) throw HttpError(404);
          requestedStudentInclCampus.campus = campus;
        })
    }
    return requestedStudentInclCampus.update(req.body)
  })
  .then(function (updatedStudentCampus) {
    res.json(updatedStudentCampus);
  })
  .catch(next);
});

router.delete('/:id', function (req, res, next) {
  req.requestedStudent.destroy()
  .then(function () {
    res.status(204).end();
  })
  .catch(next);
});

module.exports = router;
