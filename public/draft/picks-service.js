angular.module('draftDay')
  .factory('Picks', function($resource) {

    var service = $resource('/picks/:id', { id: '@id'})

    return service

  })
