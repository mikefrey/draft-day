var Hapi = require('hapi')
var Good = require('good')
var Path = require('path')

var picks = require('./routes/picks.js')

var server = new Hapi.Server(3000)



server.route([
  // home
  {
    method: 'GET',
    path: '/',
    handler: { file: Path.join(__dirname, 'public/layout.html') }
  },

  // picks
  { method: 'GET', path: '/picks', handler: picks.index },
  { method: 'POST', path: '/picks', handler: picks.create },
  { method: 'POST', path: '/picks/{id}', handler: picks.update },
  { method: 'DELETE', path: '/picks{id}', handler: picks.destroy },



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
