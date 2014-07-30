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


var teams = [
  {
    abbrev: 'ATL',
    shortname: 'Rednecks',
    name: 'Atlanta Rednecks',
    slug: 'atlanta'
  },
  {
    abbrev: 'BR',
    shortname: 'Ruabdubs',
    name: 'Baton Rouge Rubadubs',
    slug: 'sin-city'
  },
  {
    abbrev: 'CC',
    shortname: 'Flash',
    name: 'Central City Flash',
    slug: 'central-city'
  },
  {
    abbrev: 'CB',
    shortname: 'Pre',
    name: 'Coos Bay Pre',
    slug: 'coos-bay'
  },
  {
    abbrev: 'GC',
    shortname: 'Dark Knights',
    name: 'Gotham City Dark Knights',
    slug: 'gotham-city'
  },
  {
    abbrev: 'MAN',
    shortname: 'Mavericks',
    name: 'Mankato Mavericks',
    slug: 'mankato'
  },
  {
    abbrev: 'MF',
    shortname: 'Dragons',
    name: 'Mount Fuji Dragons',
    slug: 'mount-fuji'
  },
  {
    abbrev: 'SC',
    shortname: 'Outcasts',
    name: 'Sin City Outcasts',
    slug: 'sin-city'
  },
  {
    abbrev: 'SPR',
    shortname: 'D\'oh Boys',
    name: 'Springfield D\'oh Boys',
    slug: 'springfield'
  },
  {
    abbrev: 'WAS',
    shortname: 'Weasels',
    name: 'Washington Weasels',
    slug: 'washington'
  }
]
