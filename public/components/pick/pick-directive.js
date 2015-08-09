angular.module('draftDay')
  .directive('pick', function($rootScope, $timeout) {

    var positions = {
      QB: 'Quarterback',
      RB: 'Running back',
      WR: 'Wide receiver',
      TE: 'Tight end',
      C:  'Center',
      G:  'Guard',
      OT: 'Offensive tackle',
      K:  'Kicker',
      P:  'Punter',
      LS: 'Long snapper',
      OL: 'Offensive line',
      OG: 'Offensive guard',
      DL: 'Defensive line',
      LB: 'Linebacker',
      DB: 'Defensive back'
    }


    return {
      restrict: 'E',
      scope: {
        show: '=',
        pick: '=',
        players: '=',
        setPlayer: '&'
      },
      templateUrl: '/components/pick/pick.html',
      link: function(scope, element, attrs) {

        var ctxPick = $('#cvsPick')[0].getContext('2d')
        var ctxPlayer = $('#cvsPlayer')[0].getContext('2d')

        scope.close = function() {
          scope.show = false
        }

        scope.edit = function() {
          scope.editing = true
        }

        scope.cancelEdit = function() {
          scope.editing = false
        }

        scope.save = function(newPlayer) {
          console.log('save', newPlayer)
          if (newPlayer) {
            scope.pick.player = newPlayer.originalObject
            scope.pick.PlayerId = newPlayer.originalObject.id
            delete scope.pick.newPlayer
            element.find('input').val('')

            scope.editing = false

            scope.setPlayer({pick:scope.pick})

            element.find('#modal').addClass('long-hide')
          }
        }

        scope.$watch('show', function(show) {
          if (show) {
            element.find('#modal').removeClass('long-hide')
          }
        })

      }
    }

  })


// Pick No.: 88px Arvo Bold (.75 opacity) *superscript the “th” if possible
// “Pick”: 88px Arvo Regular (.75)
// Position Name: 44px Arvo Regular (.25)
// First Name: 55px Arvo Regular (.50)
// Last Name: 75px Arvo Bold (1.00)
