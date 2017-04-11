'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db.define('student', {
    name: Sequelize.STRING,
    profile_picture: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    }
  },
{
  scopes: {
    populated: () => ({
      include: [{
        model: db.model('campus'),
        as: 'campus'
      }]
    })
  }

})
