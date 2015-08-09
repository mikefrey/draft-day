angular.module('draftDay')
  .controller('PickerController', function(picks, Picks, Players) {

    picks.$promise.then(function() {
      this.totalRounds = 14

      this.currentPick = picks[0]
      setCurrentPick()

    }.bind(this))


    this.players = Players.query(function(players) {
      players.forEach(function(p) {
        p.display = p.position + ' ' + p.firstname + ' ' + p.lastname + ' (' + p.team + ')'
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
      Picks.save(pick,
        function pickSaveSuccess() {
          console.log('pick save success')
          setCurrentPick()
        }.bind(this),
        function pickSaveFailure() {
          console.log('pick save failure')
          this.pickShowing = false
        }.bind(this))
    }

  })
