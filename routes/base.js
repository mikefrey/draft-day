
function handleError (request, reply, err) {
  console.log('\n\n\n\nERROR HANDLER\n\n\n\n\n')
  console.log('error', err)
  request.log('error', err)
  reply('error').code(500)
}

function getOpts (request, opts) {
  if (typeof opts === 'function') {
    opts = opts(request)
  }
  return opts
}

const methods = {
  index (Resource, opts) {
    return (request, reply) => {
      var options = getOpts(request, opts)
      Resource.findAll(options)
        .then(result => reply(result))
        .error(handleError.bind(null, request, reply))
    }
  },

  show (Resource, opts) {
    return (request, reply) => {
      var id = parseInt(request.params.id, 10)
      Resource.findById(id)
        .then(result => reply(result))
        .error(handleError.bind(null, request, reply))
    }
  },

  create (Resource, opts) {
    return (request, reply) => {
      Resource.create(request.payload)
        .then(result => reply(result))
        .error(handleError.bind(null, request, reply))
    }
  },

  update (Resource, opts) {
    return (request, reply) => {
      var id = parseInt(request.params.id, 10)
      var payload = request.payload

      if (id != payload.id) {
        const msg = 'payload.id and params.id do not match'
        request.log('error', msg)
        reply(msg).code(400)
      }

      Resource.findById(id)
        .then(item => item.updateAttributes(payload))
        .then(item => reply(item))
        .catch(handleError.bind(null, request, reply))
    }
  },

  destroy (Resource, opts) {
    return (request, reply) => {
      var id = parseInt(request.params.id, 10)
      Resource.findById(id)
        .then(item => item.destroy())
        .then(() => reply())
        .catch(handleError.bind(null, request, reply))
    }
  }
}

module.exports = (Resource, actions) => {
  const controller = {}

  for (let key in actions) {
    controller[key] = methods[key](Resource, actions[key])
  }

  return controller
}
