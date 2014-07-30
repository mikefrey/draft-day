
function handleError(request, reply, err) {
  request.log('error', err)
  reply('error').code(500)
}

function getOpts(request, opts) {
  if (typeof opts === 'function')
    opts = opts(request)
  return opts
}


var methods = {

  index: function(Resource, opts) {

    return function(request, reply) {
      opts = getOpts(request, opts)
      Resource.findAll(opts)
        .then(function (result) { reply(result) })
        .error(handleError.bind(null, request, reply))
    }

  },


  show: function(Resource, opts) {

    return function(request, reply) {
      var id = parseInt(request.params.id, 10)
      Resource.find(id)
        .then(function(result) { reply(result) })
        .error(handleError.bind(null, request, reply))
    }

  },


  create: function(Resource, opts) {

    return function(request, reply) {
      Resource.create(request.payload)
        .then(function(result) { reply(result) })
        .error(handleError.bind(null, request, reply))
    }

  },


  update: function(Resource, opts) {

    return function(request, reply) {
      var id = parseInt(request.params.id, 10)
      var payload = request.payload

      if (id != payload.id) {
        var msg = 'payload.id and params.id do not match'
        request.log('error', msg)
        reply(msg).code(400)
      }

      Resource.find(id)
        .then(function(item) {
          return item.updateAttributes(payload)
        })
        .then(function() { reply(item) })
        .catch(handleError.bind(null, request, reply))
    }

  },

  destroy: function(Resource, opts) {

    return function(request, reply) {
      var id = parseInt(request.params.id, 10)
      Resource.find(id)
        .then(function(item) { return item.destroy() })
        .then(function() { reply() })
        .catch(handleError.bind(null, request, reply))
    }

  }

}



module.exports = function(Resource, actions) {
  var controller = {}

  for (var key in actions) {
    controller[key] = methods[key](Resource, actions[key])
  }

  return controller
}

