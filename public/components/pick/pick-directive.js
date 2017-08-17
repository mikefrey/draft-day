angular.module('draftDay')
  .directive('pick', function($rootScope, $timeout) {

    return {
      restrict: 'E',
      scope: {
        draft: '='
      },
      templateUrl: '/components/pick/pick.html',
      link: function(scope, element, attrs) {
        scope.$watch(function() {
          var pick = scope.draft.currentPick
          return pick && pick.playerId || false }, function(pid) {
          setTimeout(function(){
            scope.$apply(function() {
              scope.editing = !pid
            })
          }, 0)
        })
      }
    }

  })
