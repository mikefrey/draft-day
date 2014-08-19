var models = require('../models/models.js')
var Pick = models.Pick
var Team = models.Team
var Player = models.Player


function toCsv(picks) {
  var csv = 'Round,Pick,Team,Player,Pos,Keeper,Trade,Notes,NFL Team,Pos 2,Exp\n'

  csv += picks.map(function(p) {
    var playerName = '', playerPos = '', playerTeam = '', playerPos2 = '', playerExp = ''
    if (p.player) {
      playerName = p.player.firstname + ' ' + p.player.lastname
      playerPos = p.player.position
      playerTeam = p.player.team
      playerPos2 = p.player.pos2
      playerExp = p.player.exp
    }
    return [
      ((((p.number - 1) / 10)|0) + 1),
      p.number,
      p.team.name,
      playerName,
      playerPos,
      p.keeper,
      p.trade,
      p.note,
      playerTeam,
      playerPos2,
      playerExp
    ].join(',')
  }).join('\n')

  return csv
}



module.exports = {

  index: function(request, reply) {
    var side = request.params.side

    Pick.findAll({ include: [ Team, Player ], where: { offense: side === 'offense' } })
      .then(function (result) {
        reply(toCsv(result))
          .header('content-disposition', 'attachment; filename="dffl-' + side + '.csv"')
      })
      .error(function() {
        console.log('error', err)
        request.log('error', err)
        reply(err).code(500)
      })
  }

}
