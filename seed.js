'use strict';

var chance = require('chance')(123);
var faker = require('faker');
  faker.seed(123);
var toonAvatar = require('cartoon-avatar');
var Promise = require('bluebird');

var db = require('./db/index');
var Campus = require('./db/models/campus');
var Student = require('./db/models/student');

var numCampuses = 10;
var numStudents = 50;

var emails = chance.unique(chance.email, numStudents);

function doTimes (n, fn) {
  var results = [];
  while (n--) {
    results.push(fn());
  }
  return results;
}

function randPhoto (gender) {
  gender = gender.toLowerCase();
  var id = chance.natural({
    min: 1,
    max: gender === 'female' ? 114 : 129
  });
  return toonAvatar.generate_avatar({ gender: gender, id: id });
}

function randCampus () {
  let name = faker.lorem.word();
  return Campus.build({
    name: name,
    image: faker.image.nature(),
    description: faker.lorem.text(),
    location: faker.address.streetAddress()
  });
}

function randStudent (createdCampuses) {
  var campus = chance.pick(createdCampuses);
  var gender = chance.gender();
  let name = `${chance.first({gender: gender})} ${chance.last()}`
  return Student.build({
    name: name,
    profile_picture: faker.image.avatar(),
    email: emails.pop(),
    campus_id: campus.id
  });
}

function generateCampuses () {
  return doTimes(numCampuses, randCampus);
}

function generateStudents (createdCampuses) {
  return doTimes(numStudents, () => randStudent(createdCampuses));
}

function createCampuses () {
  return Promise.map(generateCampuses(), function (campus) {
    return campus.save();
  });
}

function createStudents (createdCampuses) {
  return Promise.map(generateStudents(createdCampuses), function (student) {
    return student.save();
  });
}

function seed () {
  return createCampuses()
    .then(function (createdCampuses) {
      return createStudents(createdCampuses);
    });
}

console.log('Syncing database');

db.sync({force: true})
  .then(function () {
    console.log('Seeding database');
    return seed();
  })
  .then(function () {
    console.log('Seeding successful');
  }, function (err) {
    console.error('Error while seeding');
    console.error(err.stack);
  })
  .finally(function () {
    db.close();
    return null;
  });
