
function handleError(request, reply, err) {
  request.log('error', err)
  reply('error').code(500)
}


var methods = {

  index: function(Resource, opts) {

    return function(request, reply) {
      Resource.findAll()
        .success(function (result) {
          reply(result).type('application/json')
        })
        .error(handleError.bind(null, request, reply))
    }

  },


  show: function(Resource, opts) {

    return function(request, reply) {
      var id = parseInt(request.params.id, 10)
      Resource.find(id)
        .success(function(result) {
          reply(result) //.type('application/json')
        })
        .error(handleError.bind(null, request, reply))
    }

  },


  create: function(Resource, opts) {

    return function(request, reply) {
      Resource.create(request.payload)
        .success(function(result) {
          reply(result) //.type('application/json')
        })
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
        .success(function(item) {
          item.updateAttributes(payload)
            .success(function() {
              reply(item) //.type('application/json')
            })
            .error(handleError.bind(null, request, reply))
        })
        .error(handleError.bind(null, request, reply))
    }

  },

  destroy: function(Resource, opts) {

    return function(request, reply) {
      var id = parseInt(request.params.id, 10)
      Resource.find(id)
        .success(function(item) {
          item.destroy()
            .success(function() {
              reply() //.type('application/json')
            })
            .error(handleError.bind(null, request, reply))
        })
        .error(handleError.bind(null, request, reply))
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

