const models = require('../models/models.js')
const Pick = models.Pick
const Team = models.Team
const Player = models.Player
const Base = require('./base.js')

module.exports = Base(Pick, {
  index (request) {
    return {
      include: [ Team, Player ],
      where: { offense: true }
    }
  },
  create: {},
  update: {},
  destroy: {},
  show: {}
})
