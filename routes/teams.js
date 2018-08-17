const models = require('../models/models.js')
const Team = models.Team
const Base = require('./base.js')

module.exports = Base(Team, {
  index: {},
  show: {},
  create: {},
  update: {},
  destroy: {}
})
