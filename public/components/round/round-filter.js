angular.module('draftDay')
  .filter('round', function() {
    return function(input) {
      return (((input - 1) / 10)|0) + 1
    }
  })
