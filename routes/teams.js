var models = require('../models/models.js')
var Team = models.Team
var Base = require('./base.js')

module.exports = Base(Team, {
  index: {},
  show: {},
  create: {},
  update: {},
  destroy: {}
})
