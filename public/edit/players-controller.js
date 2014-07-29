angular.module('draftDay')
  .controller('PlayersController', function(Players, $scope) {

    var positions = [
      'QB',
      'RB',
      'WR',
      'TE',
      'K',
      'DL',
      'LB',
      'DB'
    ]

    var nflTeams = [
      '49ers',
      'Bears',
      'Bengals',
      'Bills',
      'Broncos',
      'Browns',
      'Buccaneers',
      'Cardinals',
      'Chargers',
      'Chiefs',
      'Colts',
      'Cowboys',
      'Dolphins',
      'Eagles',
      'Falcons',
      'Giants',
      'Jaguars',
      'Jets',
      'Lions',
      'Packers',
      'Panthers',
      'Patriots',
      'Raiders',
      'Rams',
      'Ravens',
      'Redskins',
      'Saints',
      'Seahawks',
      'Steelers',
      'Texans',
      'Titans',
      'Vikings'
    ]

    $scope.newPlayer = {}
    $scope.orderField = 'lastname'

    this.positions = positions
    this.nflTeams = nflTeams

    this.players = Players.query()


    this.savePlayer = function(player) {
      Players.save(player,
        function savePlayerSuccess() {
          console.log('player save success')
          if (!player.id)
            this.players.unshift(player)
          else
            $scope.editing = null
        }.bind(this),
        function savePlayerError() {
          console.error('player save failed')
        })
    }

    this.cancelNewPlayer = function(player) {
      player.firstname = ''
      player.lastname = ''
      player.position = ''
      player.team = ''
    }

    this.editPlayer = function(player) {
      $scope.editing = player.id
    }

    this.cancelEdit = function() {
      $scope.editing = null
    }

    this.deletePlayer = function(player, idx) {
      if (confirm('Delete Player?')) {
        Players.remove({id:player.id}, function() {
          this.players.splice(idx, 1)
          console.log('player delete success')
        }.bind(this))
      }
    }

  })
