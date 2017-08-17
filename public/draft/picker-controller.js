angular.module('draftDay')
  .controller('PickerController', function(picks, Picks, Players, $timeout) {

    picks.$promise.then(function() {
      this.totalRounds = 14

      this.currentPick = picks[0]
      setCurrentPick()

    }.bind(this))


    this.players = Players.query(function(players) {
      players.forEach(function(p) {
        p.search = (p.firstname + ' ' + p.lastname).toLowerCase()
      })

      picks.forEach(pick => {
        let idx = players.findIndex((player) => {
          return player.id == pick.playerId
        })
        if (idx != -1) {
          players.splice(idx, 1)
        }
      })

      return players
    })


    var setCurrentPick = function() {
      // find current pick
      for (var i = 0; i < picks.length; i++) {
        if (!picks[i].player) {
          this.currentPick = picks[i]
          break
        }
      }

      this.current = {}
      this.prev = {}
      this.next = {}

      var round = (((this.currentPick.number - 1) / 10)|0) + 1
      this.setRound(round)
    }.bind(this)


    this.setRound = function(round) {
      // set current round
      this.current.round = round
      var cStart = (round - 1) * 10
      this.current.picks = picks.slice(cStart, cStart+10)

      // get prev round
      this.prev.round = this.current.round - 1
      var pStart = cStart - 10
      this.prev.picks = pStart < 0 ? fillRound() : picks.slice(pStart, pStart+10)

      // get next round
      this.next.round = this.current.round + 1
      var nStart = cStart + 10
      this.next.picks = nStart > picks.length-1 ? fillRound() : picks.slice(nStart, nStart+10)
    }


    function fillRound() {
      return [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    }

    this.nextRound = function() {
      this.setRound(this.current.round + 1)
    }

    this.prevRound = function() {
      this.setRound(this.current.round - 1)
    }


    this.pickShowing = false
    this.selectedPick = null
    this.showPick = function(pick) {
      console.log('show pick', pick)
      this.pickShowing = true
      this.selectedPick = pick
    }


    this.setPlayer = function(pick) {
      return Picks.save(pick).$promise
        .then(() => {
          console.log('pick save success')
          $timeout(setCurrentPick, 5000)
        })
        .catch(() => {
          console.log('pick save failure')
          this.pickShowing = false
        })
    }

  })
