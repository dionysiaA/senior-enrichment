'use strict';

var router = require('express').Router();

var HttpError = require('../../utils/HttpError');
var Campus = require('../../../db/models/campus');
var Student = require('../../../db/models/student');

router.param('id', function (req, res, next, id) {
  Campus.findById(id)
  .then(function (campus) {
    if (!campus) throw HttpError(404);
    req.campus = campus;
    next();
    return null;
  })
  .catch(next);
});

router.get('/', function (req, res, next) {
  Campus.scope('populated').findAll()
  .then(function (campuses) {
    res.json(campuses);
  })
  .catch(next);
});

router.post('/', function (req, res, next) {
  Campus.create(req.body)
  .then(function (campus) {
    return campus.reload(Campus.options.scopes.populated());
  })
  .then(function (campusIncludingStudent) {
    res.status(201).json(campusIncludingStudent);
  })
  .catch(next);
});

router.get('/:id', function (req, res, next) {
  req.campus.reload(Campus.options.scopes.populated())
  .then(function (campus) {
    res.json(campus);
  })
  .catch(next);
});

router.put('/:id', function (req, res, next) {
  req.campus.update(req.body)
  .then(function (campus) {
    return campus.reload(Campus.options.scopes.populated());
  })
  .then(function (campusIncludingStudent) {
    res.json(campusIncludingStudent);
  })
  .catch(next);
});

router.delete('/:id', function (req, res, next) {
  req.campus.destroy()
  .then(function () {
    res.status(204).end();
  })
  .catch(next);
});

module.exports = router;
