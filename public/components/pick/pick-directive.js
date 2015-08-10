angular.module('draftDay')
  .directive('pick', function($rootScope, $timeout) {

    return {
      restrict: 'E',
      scope: {
        draft: '='
      },
      templateUrl: '/components/pick/pick.html',
      link: function(scope, element, attrs) {

        scope.edit = function() {
          scope.editing = true
        }

        scope.cancelEdit = function() {
          scope.editing = false
        }

        scope.save = function(newPlayer) {
          console.log('save') //, newPlayer, pick)
          var pick = scope.draft.currentPick
          if (newPlayer) {
            pick.player = newPlayer.originalObject
            pick.playerId = newPlayer.originalObject.id
            // delete pick.newPlayer
            element.find('input').val('')

            scope.draft.setPlayer(pick)

            scope.editing = false

            // element.find('#modal').addClass('long-hide')
          }
        }

        scope.$watch(function() {
          var pick = scope.draft.currentPick
          return pick && pick.playerId || false }, function(pid) {
          console.log('player id changed to', pid)
          setTimeout(function(){
            scope.$apply(function() {
              scope.editing = !pid
            })
          }, 0)
        })

        // scope.$watch('show', function(show) {
        //   if (show) {
        //     element.find('#modal').removeClass('long-hide')
        //   }
        // })

      }
    }

  })
