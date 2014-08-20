angular.module('draftDay')
  .directive('playerName', function($interval) {

    return {
      restrict: 'A',
      scope: {
        pick: "=playerName",
        currentPick: "="
      },
      template: '{{text}} <span>{{clockTime | date:"m:ss"}}</span>',
      link: function(scope, element, attrs) {
        var timer = null

        scope.$watch('currentPick', function(currentPick) {
          changeText(scope.pick, currentPick)
        })

        scope.$watch(function() { return scope.pick.PlayerId }, function() {
          changeText(scope.pick, scope.currentPick)
        })

        function startClock() {
          if (scope.pick.startTime && timer) return
          if (!scope.pick.startTime) scope.pick.startTime = +new Date
          timer = $interval(function() {
            scope.clockTime = (+new Date) - scope.pick.startTime
          }, 1000)
        }

        function cancelClock() {
          if (timer) {
            $interval.cancel(timer)
            timer = false
            scope.clockTime = ''
          }
        }

        function changeText(pick, currentPick) {
          cancelClock()

          if (pick.player && pick.player.firstname) {
            var text = pick.player.firstname + ' ' + pick.player.lastname
            if (text.length > 16) text = text.substring(0, 16) + '...'
            scope.text = text
          }
          else if (currentPick == pick.number) {
            scope.text = 'On The Clock'
            if (pick.startTime) scope.clockTime = (+new Date) - pick.startTime
            startClock()
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

        scope.$on('destroy', function() {
          console.log('destroy')
          cancelClock
        })

      }
    }

  })
  // .filter('clock', function() {
  //   return function(p) {
  //     var min = (p / 60000)|0
  //   }
  // })
