angular.module('draftDay')
  .factory('Players', function($resource) {

    var service = $resource('/players/:id')

    return service

  })
