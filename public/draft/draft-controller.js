angular.module('draftDay')
  .controller('DraftController', function(picks, Picks, $routeParams) {

    picks.$promise.then(function() {
      this.totalRounds = $routeParams.side.toLowerCase() === 'offense' ? 14 : 6

      // find current pick
      this.currentPick = 1
      for (var i = 0; i < picks.length; i++) {
        if (!picks[i].player) {
          this.currentPick = picks[i].number
          break
        }
      }

      this.current = {}
      this.prev = {}
      this.next = {}

      var round = (((this.currentPick - 1) / 10)|0) + 1
      this.setRound(round)

    }.bind(this))


    this.setRound = function(round) {
      // set current round
      this.current.round = round
      var cStart = (round - 1) * 10 //((this.currentPick / 10)|0) * 10
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
      console.log('FILLING ROUND')
      return [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    }

    this.nextRound = function() {
      this.setRound(this.current.round + 1)
    }

    this.prevRound = function() {
      this.setRound(this.current.round - 1)
    }



  })
