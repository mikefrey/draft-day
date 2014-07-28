angular.module('draftDay')
  .controller('DraftController', function(Picks) {

    var picks = Picks

    // find current pick
    for (var i = 0; i < picks.length; i++) {
      if (!picks[i].player) {
        this.currentPick = picks[i].number
        break
      }
    }

    this.current = {}
    this.prev = {}
    this.next = {}

    // get current round
    this.current.round = ((this.currentPick / 10)|0) + 1
    var cStart = ((this.currentPick / 10)|0) * 10
    this.current.picks = picks.slice(cStart, cStart+10)

    // get prev round
    this.prev.round = this.current.round - 1
    var pStart = cStart - 10
    this.prev.picks = pStart < 0 ? fillRound() : picks.slice(pStart, pStart+10)

    // get next round
    this.next.round = this.current.round + 1
    var nStart = cStart + 10
    this.next.picks = nStart > picks.length-1 ? fillRound() : picks.slice(nStart, nStart+10)

    console.log(this)

    function fillRound() {
      console.log('FILLING ROUND')
      return [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
    }

  })
