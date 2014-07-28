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
  { name: 'Springfield',  shortname: 'Springfield',   slug: 'springfield' },
  { name: 'Sin City',     shortname: 'Sin City',      slug: 'sin-city' },
  { name: 'Atlanta',      shortname: 'Atlanta',       slug: 'atlanta' },
  { name: 'Baton Rouge',  shortname: 'Baton Rouge',   slug: 'baton-rouge' },
  { name: 'Central City', shortname: 'Central City',  slug: 'central-city' },
  { name: 'Mankato',      shortname: 'Mankato',       slug: 'mankato' },
  { name: 'Washington',   shortname: 'Washington',    slug: 'washington' },
  { name: 'Mount Fugi',   shortname: 'Mount Fugi',    slug: 'mount-fugi' },
  { name: 'Gotham City',  shortname: 'Gotham City',   slug: 'gotham-city' },
  { name: 'Coos Bay',     shortname: 'Coos Bay',      slug: 'coos-bay' }
]
