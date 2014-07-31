angular.module('draftDay')
  .controller('PlayersController', function(Players, $scope) {

    var positions = [
      'QB',
      'RB',
      'WR',
      'TE',
      'C',
      'G',
      'OT',
      'K',
      'P',
      'LS',
      'OL',
      'OG',
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


    this.savePlayer = function(player, original) {
      Players.save(player,
        function savePlayerSuccess(savedPlayer) {
          console.log('player save success')
          $scope.editing = null
          if (!player.id) {
            this.players.unshift(savedPlayer)
            this.clearPlayer(player)
          }
          else if (original) {
            angular.extend(original, player)
          }
        }.bind(this),
        function savePlayerError() {
          console.error('player save failed')
        })
    }

    this.clearPlayer = function(player) {
      player.firstname = ''
      player.lastname = ''
      player.position = ''
      player.team = ''
    }

    this.editPlayer = function(player) {
      player.update = {
        id: player.id,
        position: player.position,
        firstname: player.firstname,
        lastname: player.lastname,
        team: player.team
      }
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
