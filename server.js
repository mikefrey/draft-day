const Hapi = require('hapi')
const Path = require('path')

const exporter = require('./routes/export')
const picks = require('./routes/picks')
const players = require('./routes/players')
const teams = require('./routes/teams')

const server = new Hapi.Server({ connections: { state: { strictHeader: false } } })
server.connection({ port: process.env.PORT || 3000, router: { stripTrailingSlash: true } })

const plugins = [{
  register: require('good'),
  options: {
    reporters: [{
      reporter: require('good-console'),
      events: { log: '*', request: '*', response: '*' }
    }]
  }
}]

const home = { file: Path.join(__dirname, 'public/layout.html') }

server.route([
  // home
  { method: 'GET', path: '/', handler: home },
  { method: 'GET', path: '/draft', handler: home },
  { method: 'GET', path: '/select-player', handler: home },
  { method: 'GET', path: '/edit/players', handler: home },
  { method: 'GET', path: '/edit/offense', handler: home },
  { method: 'GET', path: '/draft/offense', handler: home },

  // export
  { method: 'GET', path: '/export/{side}', handler: exporter.index },

  // picks
  { method: 'GET', path: '/picks', handler: picks.index },
  { method: 'POST', path: '/picks', handler: picks.create },
  { method: 'GET', path: '/picks/{id}', handler: picks.show },
  { method: 'POST', path: '/picks/{id}', handler: picks.update },
  { method: 'DELETE', path: '/picks/{id}', handler: picks.destroy },

  // players
  { method: 'GET', path: '/players', handler: players.index },
  { method: 'GET', path: '/players/{id}', handler: players.show },
  { method: 'POST', path: '/players', handler: players.create },
  { method: 'POST', path: '/players/{id}', handler: players.update },
  { method: 'DELETE', path: '/players/{id}', handler: players.destroy },

  // teams
  { method: 'GET', path: '/teams', handler: teams.index },
  { method: 'GET', path: '/teams/{id}', handler: teams.show },
  { method: 'POST', path: '/teams', handler: teams.create },
  { method: 'POST', path: '/teams/{id}', handler: teams.update },
  { method: 'DELETE', path: '/teams/{id}', handler: teams.destroy },

  // static files
  {
    method: 'GET',
    path: '/{param*}',
    handler: { directory: { path: Path.join(__dirname, 'public') } }
  }
])

server.register(plugins, err => {
  if (err) throw err
  server.start(() => console.log('Server running at:', server.info.uri))
})
