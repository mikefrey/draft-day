angular.module('draftDay')
  .directive('playerName', function() {

    return {
      restrict: 'A',
      scope: {
        pick: "=playerName",
        draft: "="
      },
      template: '{{text}} <span></span>',
      link: function(scope, element, attrs) {
        var pick = scope.pick

        if (pick.player && pick.player.name) {
          scope.text = pick.player.name
        }
        else if (scope.draft.currentPick == pick.number) {
          scope.text = 'On The Clock'
        }
        else if (scope.draft.currentPick+1 == pick.number) {
          scope.text = 'On Deck'
        }
        else if (scope.draft.currentPick+2 == pick.number) {
          scope.text = 'In The Hole'
        }
        else {
          scope.text = ''
        }
      }
    }

  })
