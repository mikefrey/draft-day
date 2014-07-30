angular.module('draftDay')
  .factory('Teams', function($resource) {

    var service = $resource('/teams/:id', { id: '@id'})

    return service

  })
