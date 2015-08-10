var models = require('./models.js')
var Pick = models.Pick
var Team = models.Team
var Player = models.Player

var importPlayers = require('./import-players')


models.syncPromise
  .then(importTeams)
  .then(importPicks)
  .then(importPlayers)
  .then(function () {
    console.log('DONE!')
  })




function importTeams() {

  var teams = [
    { id: 1,    abbrev: 'CB',  name: 'Pre',           city: 'Coos Bay',     slug: 'coos-bay' },
    { id: 2,    abbrev: 'ATL', name: 'Rednecks',      city: 'Atlanta',      slug: 'atlanta' },
    { id: 3,    abbrev: 'SPR', name: 'D\'oh Boys',    city: 'Springfield',  slug: 'springfield' },
    { id: 4,    abbrev: 'MF',  name: 'Dragons',       city: 'Mount Fuji',   slug: 'mount-fuji' },
    { id: 5,    abbrev: 'BR',  name: 'Rubadubs',      city: 'Baton Rouge',  slug: 'baton-rouge' },
    { id: 6,    abbrev: 'MAN', name: 'Mavericks',     city: 'Mankato',      slug: 'mankato' },
    { id: 7,    abbrev: 'GC',  name: 'Dark Knights',  city: 'Gotham City',  slug: 'gotham-city' },
    { id: 8,    abbrev: 'WAS', name: 'Weasels',       city: 'Washington',   slug: 'washington' },
    { id: 9,    abbrev: 'CC',  name: 'Flash',         city: 'Central City', slug: 'central-city' },
    { id: 10,   abbrev: 'SC',  name: 'Outcasts',      city: 'Sin City',     slug: 'sin-city' }
  ]

  return Team.bulkCreate(teams).then(function() {
    console.log('Successfully imported %d teams', teams.length)
  })

}



function importPicks() {

  var picks = []

  // generate offensive draft
  for (var i = 0; i < 14; i++) {
    for (var j = 1; j < 11; j++) {
      picks.push({
        offense: true,
        number: i*10 + j,
        teamId: j
      })
    }
  }

  return Pick.bulkCreate(picks).then(function() {
    console.log('Successfully imported %d picks', picks.length)
  })

}
