var models = require('./models.js')
var Pick = models.Pick
var Team = models.Team
var Player = models.Player

var Promise = require('bluebird')
var parse = require('csv-parse')
var fs = require('fs')
var path = require('path')


function importPlayers() {
  return new Promise(function(resolve, reject) {
    var output = []
    var parser = parse()

    parser.on('readable', function() {
      var record
      while(record = parser.read()) {
        if (!record[0]) continue
        output.push({
          position: record[0],
          firstname: record[1],
          lastname: record[2],
          team: initial(record[3]),
          exp: record[5],
          pos2: record[6]
        })
      }
    })

    parser.on('finish', function() {
      var creates = []
      var players
      while (output.length) {
        players = output.splice(0, Math.min(250, output.length))
        creates.push(Player.bulkCreate(players))
      }

      Promise.all(creates).then(resolve).catch(reject)

    })

    var rs = fs.createReadStream(path.join(__dirname, 'players.csv'))
    rs.pipe(parser)
  })

}




function initial(str) {
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase()
}


module.exports = importPlayers
