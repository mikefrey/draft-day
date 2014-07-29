var Hapi = require('hapi')
var Good = require('good')
var Path = require('path')

var picks = require('./routes/picks.js')
var players = require('./routes/players.js')

var server = new Hapi.Server(3000, { state: { cookies: { strictHeader: false } } })

var home = { file: Path.join(__dirname, 'public/layout.html') }

server.route([
  // home
  { method: 'GET', path: '/', handler: home },
  { method: 'GET', path: '/edit/players', handler: home },
  { method: 'GET', path: '/edit/offense', handler: home },
  { method: 'GET', path: '/edit/defense', handler: home },
  { method: 'GET', path: '/offense', handler: home },
  { method: 'GET', path: '/defense', handler: home },

  // picks
  { method: 'GET', path: '/picks', handler: picks.index },
  { method: 'POST', path: '/picks', handler: picks.create },
  { method: 'POST', path: '/picks/{id}', handler: picks.update },
  { method: 'DELETE', path: '/picks/{id}', handler: picks.destroy },

  // players
  { method: 'GET', path: '/players', handler: players.index },
  { method: 'GET', path: '/players/{id}', handler: players.show },
  { method: 'POST', path: '/players', handler: players.create },
  { method: 'POST', path: '/players/{id}', handler: players.update },
  { method: 'DELETE', path: '/players/{id}', handler: players.destroy },



  // static files
  {
    method: 'GET',
    path: '/{param*}',
    handler: { directory: { path: Path.join(__dirname, 'public') } }
  }
])


server.pack.register(Good, function(err) {
  if (err) throw err

  server.start(function() {
    console.log('Server running at:', server.info.uri)
  })

})
