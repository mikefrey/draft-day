const models = require('../models/models.js')
const Player = models.Player
const Base = require('./base.js')

module.exports = Base(Player, {
  index: {},
  show: {},
  create: {},
  update: {},
  destroy: {}
})
