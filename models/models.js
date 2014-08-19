var Sequelize = require('sequelize')
var Path = require('path')

var db = new Sequelize('draftday', '', '', {
  dialect: 'sqlite',
  storage: Path.join(__dirname, '../data/database.sqlite')
})


var Pick = db.define('Pick', {
  offense: Sequelize.BOOLEAN,
  number: Sequelize.INTEGER,
  keeper: Sequelize.BOOLEAN,
  trade: Sequelize.BOOLEAN,
  note: Sequelize.STRING
})

var Player = db.define('Player', {
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  position: Sequelize.STRING(5),
  team: Sequelize.STRING,
  exp: Sequelize.INTEGER,
  pos2: Sequelize.STRING(5)
})

var Team = db.define('Team', {
  city: Sequelize.STRING,
  name: Sequelize.STRING,
  abbrev: Sequelize.STRING,
  slug: Sequelize.STRING
})

Player.hasOne(Pick)
Pick.belongsTo(Player)

Team.hasMany(Pick)
Pick.belongsTo(Team)

var syncPromise = db.sync()

module.exports = {
  Pick: Pick,
  Player: Player,
  Team: Team,
  syncPromise: syncPromise
}
