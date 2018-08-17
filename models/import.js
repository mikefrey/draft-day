const models = require('./models.js')
const Pick = models.Pick
const Team = models.Team
const importPlayers = require('./import-players')

async function start () {
  await models.syncPromise
  await importTeams()
  await importPicks()
  await importPlayers()
  console.log('DONE!')
}

async function importTeams () {
  const teams = [
    { id: 1,    abbrev: 'MF',  name: 'Dragons',        city: 'Mount Fuji',   slug: 'mount-fuji' },
    { id: 2,    abbrev: 'GC',  name: 'Dark Knights',   city: 'Gotham City',  slug: 'gotham-city' },
    { id: 3,    abbrev: 'WAS', name: 'Weasels',        city: 'Washington',   slug: 'washington' },
    { id: 4,    abbrev: 'LL',  name: 'Goonies',        city: 'Leech Lake',   slug: 'leech-lake' },
    { id: 5,    abbrev: 'BR',  name: 'Rubadubs',       city: 'Baton Rouge',  slug: 'baton-rouge' },
    { id: 6,    abbrev: 'ML',  name: 'Green Backs',    city: 'Mille Lacs',   slug: 'mille-lacs' },
    { id: 7,    abbrev: 'SC',  name: 'Outcasts',       city: 'Sin City',     slug: 'sin-city' },
    { id: 8,    abbrev: 'CC',  name: 'Flash',          city: 'Central City', slug: 'central-city' },
    { id: 9,    abbrev: 'ATL', name: 'Rednecks',       city: 'Atlanta',      slug: 'atlanta' },
    { id: 10,   abbrev: 'HUT', name: 'Hell on Cleats', city: 'Hutchinson',   slug: 'hutch' },
  ]

  await Team.bulkCreate(teams)
  console.log('Successfully imported %d teams', teams.length)
}

async function importPicks () {
  const picks = []
  // generate offensive draft
  for (let i = 0; i < 14; i++) {
    for (let j = 1; j < 11; j++) {
      picks.push({
        offense: true,
        number: i * 10 + j,
        teamId: j
      })
    }
  }

  await Pick.bulkCreate(picks)
  console.log('Successfully imported %d picks', picks.length)
}

start()
