angular.module('draftDay')
  .directive('playerName', function($interval) {

    return {
      restrict: 'A',
      scope: {
        pick: "=playerName",
        currentPick: "="
      },
      template: '{{text}}',
      link: function(scope, element, attrs) {
        var timer = null

        scope.$watch('currentPick', function(currentPick) {
          changeText(scope.pick, currentPick)
        })

        scope.$watch(function() { return scope.pick.playerId }, function() {
          changeText(scope.pick, scope.currentPick)
        })

        function changeText(pick, currentPick) {

          if (pick.player && pick.player.firstname) {
            var text = pick.player.firstname + ' ' + pick.player.lastname
            // if (text.length > 16) text = text.substring(0, 16) + '...'
            scope.text = text
          }
          else if (currentPick == pick.number) {
            scope.text = 'On the Clock'
          }
          else if (currentPick+1 == pick.number) {
            scope.text = 'On Deck'
          }
          else if (currentPick+2 == pick.number) {
            scope.text = 'In the Hole'
          }
          else {
            scope.text = '\u00A0'
          }
        }

      }
    }

  })
  // .filter('clock', function() {
  //   return function(p) {
  //     var min = (p / 60000)|0
  //   }
  // })
