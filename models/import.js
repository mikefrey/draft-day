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
    { id: 1,    abbrev: 'HUT', name: 'Hell on Cleats', city: 'Hutchinson',   slug: 'hutch' },
    { id: 2,    abbrev: 'CC',  name: 'Flash',          city: 'Central City', slug: 'central-city' },
    { id: 3,    abbrev: 'WAS', name: 'Weasels',        city: 'Washington',   slug: 'washington' },
    { id: 4,    abbrev: 'SC',  name: 'Outcasts',       city: 'Sin City',     slug: 'sin-city' },
    { id: 5,    abbrev: 'BR',  name: 'Rubadubs',       city: 'Baton Rouge',  slug: 'baton-rouge' },
    { id: 6,    abbrev: 'LL',  name: 'Goonies',        city: 'Leech Lake',   slug: 'leech-lake' },
    { id: 7,    abbrev: 'ML',  name: 'Green Backs',    city: 'Mille Lacs',   slug: 'mille-lacs' },
    { id: 8,    abbrev: 'ATL', name: 'Rednecks',       city: 'Atlanta',      slug: 'atlanta' },
    { id: 9,    abbrev: 'MF',  name: 'Dragons',        city: 'Mount Fuji',   slug: 'mount-fuji' },
    { id: 10,   abbrev: 'GC',  name: 'Dark Knights',   city: 'Gotham City',  slug: 'gotham-city' },
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
