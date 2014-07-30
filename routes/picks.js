var models = require('../models/models.js')
var Pick = models.Pick
var Team = models.Team
var Player = models.Player
var Base = require('./base.js')

module.exports = Base(Pick, {

  index: function(request) {
    return {
      include: [ Team, Player ],
      where: { offense: request.query.offense === 'true' }
    }
  },
  create: {},
  update: {},
  destroy: {}

})
