angular.module('draftDay')
  .directive('timer', function($interval) {

    return {
      restrict: 'A',
      scope: {
        timerActive: '=timer',
        pick: '='
      },
      template: '{{position}}{{clockTime | date:"m:ss"}}',
      link: function(scope, element, attrs) {
        var timer = null

        scope.$watch('timerActive', function(timerActive) {
          changeText(scope.pick, timerActive)
        })

        scope.$watch(function() { return scope.pick.PlayerId }, function() {
          changeText(scope.pick, scope.timerActive)
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

        function changeText(pick, timerActive) {
          cancelClock()
          scope.position = ''

          if (pick && pick.player && pick.player.position) {
            scope.position = pick.player.position
          }
          else if (timerActive) {
            if (pick.startTime) scope.clockTime = (+new Date) - pick.startTime
            startClock()
          }
        }

        scope.$on('destroy', function() {
          console.log('destroy')
          cancelClock()
        })

      }
    }

  })
