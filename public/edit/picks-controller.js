angular.module('draftDay')
  .controller('PicksController', function(Players, Teams, Picks, $routeParams, $scope) {
    console.log('PICKS CONTROLLER')

    this.players = Players.query()
    this.teams = Teams.query()
    this.picks = Picks.query({ offense: $routeParams.side.toLowerCase() === 'offense' })


    this.savePick = function(pick, original) {
      Picks.save(pick,
        function savePickSuccess() {
          console.log('pick save success')
        }.bind(this),
        function savePickError() {
          console.error('pick save failed')
        })
    }

  })
