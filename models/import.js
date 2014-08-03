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
    { id: 1,    abbrev: 'SPR', name: 'D\'oh Boys',    city: 'Springfield',  slug: 'springfield' },
    { id: 2,    abbrev: 'SC',  name: 'Outcasts',      city: 'Sin City',     slug: 'sin-city' },
    { id: 3,    abbrev: 'ATL', name: 'Rednecks',      city: 'Atlanta',      slug: 'atlanta' },
    { id: 4,    abbrev: 'BR',  name: 'Ruabdubs',      city: 'Baton Rouge',  slug: 'baton-rouge' },
    { id: 5,    abbrev: 'CC',  name: 'Flash',         city: 'Central City', slug: 'central-city' },
    { id: 6,    abbrev: 'MAN', name: 'Mavericks',     city: 'Mankato',      slug: 'mankato' },
    { id: 7,    abbrev: 'WAS', name: 'Weasels',       city: 'Washington',   slug: 'washington' },
    { id: 8,    abbrev: 'MF',  name: 'Dragons',       city: 'Mount Fuji',   slug: 'mount-fuji' },
    { id: 9,    abbrev: 'GC',  name: 'Dark Knights',  city: 'Gotham City',  slug: 'gotham-city' },
    { id: 10,   abbrev: 'CB',  name: 'Pre',           city: 'Coos Bay',     slug: 'coos-bay' }
  ]

  return Team.bulkCreate(teams).then(function() {
    console.log('Successfully imported %d teams', teams.length)
  })

}



function importPicks() {

  var picks = []

  // generate offensive draft
  for (var i = 0; i <= 14; i++) {
    for (var j = 1; j < 11; j++) {
      picks.push({
        offense: true,
        number: i*10 + j,
        TeamId: j
      })
    }
  }

  // generate offensive draft
  for (var i = 0; i <= 6; i++) {
    for (var j = 1; j < 11; j++) {
      picks.push({
        offense: false,
        number: i*10 + j,
        TeamId: j
      })
    }
  }

  return Pick.bulkCreate(picks).then(function() {
    console.log('Successfully imported %d picks', picks.length)
  })

}
