angular.module('draftDay')
  .directive('selectPlayer', function($rootScope, $timeout) {

    return {
      restrict: 'E',
      scope: {
        draft: '='
      },
      templateUrl: '/components/select-player/select-player.html',
      link: function(scope, element, attrs) {

        var allPlayers = scope.draft.players
        var timerStart = Date.now()

        scope.searchText = ''

        function filterPlayers(list, text) {
          return list.filter(p =>  p.search.indexOf(text) != -1)
        }

        scope.edit = function() {
          scope.editing = true
        }

        scope.cancelEdit = function() {
          scope.editing = false
        }

        var previousText = ''
        scope.search = function(text) {
          var players = allPlayers
          if (text != '') {
            if (text.startsWith(previousText)) {
              players = filterPlayers(scope.draft.players, text)
            } else {
              players = filterPlayers(allPlayers, text)
            }
          }
          scope.draft.players = players
          previousText = text
        }

        scope.save = function(newPlayer) {
          var timeTaken = Date.now() - timerStart
          var pick = scope.draft.currentPick
          if (newPlayer) {
            pick.player = newPlayer
            pick.playerId = newPlayer.id
            pick.timeTaken = (timeTaken/1000)|0
            scope.searchText = ''

            scope.draft.setPlayer(pick)
              .then(() => {
                scope.editing = false
                var idx = allPlayers.indexOf(newPlayer)
                if (idx > -1) allPlayers.splice(idx, 1)
                scope.draft.players = allPlayers
              })
          }
        }

        function currentPickPicked() {
          var pick = scope.draft.currentPick
          return pick && pick.playerId || false
        }

        function toggleEditing(pid) {
          setTimeout(() => {
            scope.$apply(() => {
              scope.editing = !pid
              console.log('timer starting')
              timerStart = Date.now()
            })
          }, 0)
        }

        scope.$watch(currentPickPicked, toggleEditing)

      }
    }

  })
