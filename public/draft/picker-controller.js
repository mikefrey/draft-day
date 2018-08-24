angular.module('draftDay')
  .controller('PickerController', function(picks, Picks, Players, $timeout, $interval) {

    picks.$promise.then(function() {
      this.totalRounds = 14

      this.currentPick = picks[0]
      setCurrentPick()

    }.bind(this))

    this.players = Players.query(function(players) {
      players.forEach(function(p) {
        p.search = (p.firstname + ' ' + p.lastname + ' ' + p.position + ' ' + p.team).toLowerCase()
      })

      players.sort((a, b) => a.lastname+a.firstname < b.lastname+b.firstname ? -1 : 1)

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
      this.currentPick = picks.find(p => !p.player)

      this.current = {}
      this.prev = {}
      this.next = {}

      const round = (((this.currentPick.number - 1) / 10)|0) + 1
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

    // this.nextRound = function() {
    //   this.setRound(this.current.round + 1)
    // }

    // this.prevRound = function() {
    //   this.setRound(this.current.round - 1)
    // }


    this.pickShowing = false
    // this.selectedPick = null
    // this.showPick = function(pick) {
    //   this.pickShowing = true
    //   this.selectedPick = pick
    // }


    this.setPlayer = function(pick) {
      this.pickShowing = true
      return Picks.save(pick).$promise
        .then(() => {
          $timeout(() => {
            setCurrentPick()
            this.pickShowing = false
          }, 5000)
        })
        .catch(() => {
          console.log('pick save failure')
          this.pickShowing = false
        })
    }


    $interval(() => {
      if (this.pickShowing) return
      var pickId = this.currentPick.id
      Picks.get({id: pickId}, pick => {
        if (!pick.playerId) return

        var players = this.players
        let player = players.find(p => p.id == pick.playerId)
        this.currentPick.player = player
        this.currentPick.playerId = pick.playerId
        setCurrentPick()
      })
    }, 4000)

  })
