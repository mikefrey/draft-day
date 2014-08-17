angular.module('draftDay')
  .controller('DraftController', function(picks, Picks, Players, $routeParams) {

    picks.$promise.then(function() {
      this.totalRounds = $routeParams.side.toLowerCase() === 'offense' ? 14 : 6

      // find current pick
      this.currentPick = picks[0]
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

    }.bind(this))


    this.players = Players.query(function(players) {
      players.forEach(function(p) {
        p.display = p.position + ' ' + p.firstname + ' ' + p.lastname + ' (' + p.team + ')'
      })
      return players
    })


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
      if (pick.player && pick.player.originalObject) {
        pick.PlayerId = pick.player.originalObject.id
      }
      Picks.save(pick)
    }

  })
