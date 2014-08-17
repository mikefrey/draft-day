angular.module('draftDay')
  .filter('playerName', function() {
    return function(p) {
      return !p ? '' : p.position + ' ' + p.firstname + ' ' + p.lastname + ' (' + p.team + ')'
    }
  })
