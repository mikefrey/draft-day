angular.module('draftDay')
  .factory('Players', function($resource) {

    var service = $resource('/players/:id', { id: '@id'})

    return service

  })
