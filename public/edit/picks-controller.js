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


    this.savePick = function(pick) {
      if (pick.player && pick.player.originalObject) {
        pick.PlayerId = pick.player.originalObject.id
      }
      console.log(pick)
      Picks.save(pick,
        function savePickSuccess() {
          console.log('pick save success')
        }.bind(this),
        function savePickError() {
          console.error('pick save failed')
        })
    }

  })
