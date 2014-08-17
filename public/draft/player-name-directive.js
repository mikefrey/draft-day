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

        scope.$watch('currentPick', function(currentPick) {
          changeText(scope.pick, currentPick)
        })

        scope.$watch(function() { return scope.pick.PlayerId }, function() {
          changeText(scope.pick, scope.currentPick)
        })

        function changeText(pick, currentPick) {
          if (pick.player && pick.player.firstname) {
            scope.text = pick.player.firstname + ' ' + pick.player.lastname
          }
          else if (currentPick == pick.number) {
            scope.text = 'On The Clock'
          }
          else if (currentPick+1 == pick.number) {
            scope.text = 'On Deck'
          }
          else if (currentPick+2 == pick.number) {
            scope.text = 'In The Hole'
          }
          else {
            scope.text = ''
          }
        }

      }
    }

  })
