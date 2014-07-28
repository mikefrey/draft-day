var Sequelize = require('sequelize')
var Path = require('path')

var sequelize = new Sequelize('draftday', '', '', {
  dialect: 'sqlite',
  storage: Path.join(__dirname, '../data/database.sqlite')
})

module.exports = sequelize
