var models = require('../models/models.js')
var Player = models.Player
var Base = require('./base.js')

module.exports = Base(Player, {
  index: {},
  show: {},
  create: {},
  update: {},
  destroy: {}
})
