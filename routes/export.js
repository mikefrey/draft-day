const models = require('../models/models.js')
const Pick = models.Pick
const Team = models.Team
const Player = models.Player

function toCsv (picks) {
  let csv = 'Round,Pick,Team,Player,Pos,Keeper,Trade,Notes,NFL Team,Pos 2,Exp,Time Taken\n'

  csv += picks.map(p => {
    let playerName = ''
    let playerPos = ''
    let playerTeam = ''
    let playerPos2 = ''
    let playerExp = ''
    if (p.player) {
      playerName = p.player.firstname + ' ' + p.player.lastname
      playerPos = p.player.position
      playerTeam = p.player.team
      playerPos2 = p.player.pos2
      playerExp = p.player.exp
    }
    return [
      ((((p.number - 1) / 10) | 0) + 1),
      p.number,
      p.team.name,
      playerName,
      playerPos,
      p.keeper,
      p.trade,
      p.note,
      playerTeam,
      playerPos2,
      playerExp,
      p.timeTaken
    ].join(',')
  }).join('\n')

  return csv
}

module.exports = {
  index (request, reply) {
    const side = 'offense' // request.params.side

    Pick.findAll({ include: [ Team, Player ], where: { offense: side === 'offense' } })
      .then(result => {
        reply(toCsv(result))
          .header('content-disposition', 'attachment; filename="dffl-' + side + '.csv"')
      })
      .error(err => {
        console.log('error', err)
        request.log('error', err)
        reply(err).code(500)
      })
  }
}
