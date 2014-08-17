angular.module('draftDay')
  .directive('playerName', function() {

    return {
      restrict: 'A',
      scope: {
        pick: "=playerName",
        currentPick: "="
      },
      template: '{{text}} <span></span>',
      link: function(scope, element, attrs) {
        var pick = scope.pick

        if (pick.player && pick.player.firstname) {
          scope.text = pick.player.firstname + ' ' + pick.player.lastname
        }
        else if (scope.currentPick == pick.number) {
          scope.text = 'On The Clock'
        }
        else if (scope.currentPick+1 == pick.number) {
          scope.text = 'On Deck'
        }
        else if (scope.currentPick+2 == pick.number) {
          scope.text = 'In The Hole'
        }
        else {
          scope.text = ''
        }
      }
    }

  })
