'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db.define('campus', {
  name: Sequelize.STRING,
  //link to the image
  image: {
    //link to the image
    type: Sequelize.STRING,
    defaultValue: '/images/default-photo.jpg'
  }
},{
    scopes: {
      populated: () => ({
        include: [{
          model: db.model('student')
        }]
      })
    }
 })
