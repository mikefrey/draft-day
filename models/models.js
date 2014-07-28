var db = require('../services/db')

var Pick = db.define('Pick', {
  number: db.INTEGER,
  keeper: db.BOOLEAN,
  trade: db.BOOLEAN,
  note: db.STRING(1024)
})

var Player = db.define('Player', {
  firstname: db.STRING,
  lastname: db.STRING,
  position: db.ENUM('QB','RB','WR','TE','K','DL','LB','DB'),
  logo: db.STRING
})

var Team = db.define('Team', {
  name: db.STRING,
  logo: db.STRING
})

Player.hasOne(Pick)
Pick.belongsTo(Player)

Team.hasMany(Pick)
Pick.belongsTo(Team)

db.sync()

module.exports = {
  Pick: Pick,
  Player: Player,
  Team: Team
}
