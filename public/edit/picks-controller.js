angular.module('draftDay')
  .controller('PicksController', function(Players, Teams, Picks, $routeParams, $scope) {
    console.log('PICKS CONTROLLER')

    this.players = Players.query(function(players) {
      players.forEach(function(p) {
        p.display = p.position + ' ' + p.firstname + ' ' + p.lastname + ' (' + p.team + ')'
      })
      return players
    })
    this.teams = Teams.query()
    this.picks = Picks.query({ offense: $routeParams.side.toLowerCase() === 'offense' })


    var findTeam = function(id) {
      for (var i = 0; i < this.teams.length; i++) {
        if (this.teams[i].id === id)
          return this.teams[i]
      }
      return null
    }.bind(this)


    this.savePick = function(pick) {
      if (pick.newPlayer && pick.newPlayer.originalObject) {
        pick.PlayerId = pick.newPlayer.originalObject.id
        pick.player = pick.newPlayer.originalObject
        delete pick.newPlayer
      }
      pick.team = findTeam(pick.TeamId)
      Picks.save(pick,
        function savePickSuccess() {
          console.log('pick save success')
          $scope.editing = null
        }.bind(this),
        function savePickError() {
          console.error('pick save failed')
          $scope.editing = null
        })
    }

    this.editPick = function(pick) {
      console.log(pick.TeamId, pick.team.id)
      $scope.editing = pick.id
    }

    this.cancelEdit = function() {
      $scope.editing = null
    }

    this.clearPlayer = function(pick) {
      pick.player = null
      pick.PlayerId = null
      delete pick.newPlayer
      this.savePick(pick)
    }

  })
