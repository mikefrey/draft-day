angular.module('draftDay')
  .filter('yesno', function() {
    return function(p) {
      return p ? 'yes' : ''
    }
  })
