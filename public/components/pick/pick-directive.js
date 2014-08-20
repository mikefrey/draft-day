angular.module('draftDay')
  .directive('pick', function($rootScope, $timeout) {

    var img1 = new Image()
    img1.src = '/-fonts/arvo.woff'
    var img2 = new Image()
    img2.src = '/-fonts/arvo-bold.woff'

    var width = 474
    var center = width / 2

    function font(size, weight) {
      return (weight ? weight + ' ' : '') + size + 'px "Arvo"'
    }

    var st = ['TH', 'ST', 'ND', 'RD']
    function superscript(num) {
      num = num % 100
      if (num > 10 && num < 20) return 'TH'
      return st[num%10]||'TH'
    }

    function renderPick(ctx, num) {
      var arvo = font(84)
      var boldArvo = font(84, 'bold')
      var boldArvoSup = font(51, 'bold')
      ctx.clearRect(0, 0, 500, 200)

      var sup = superscript(num)

      var lineY = 64
      ctx.textAlign = 'start'

      ctx.font = boldArvo
      var numWidth = ctx.measureText(num).width

      ctx.font = boldArvoSup
      var stWidth = ctx.measureText(sup).width

      ctx.font = arvo
      var pickWidth = ctx.measureText(' PICK').width

      var fullWidth = numWidth + stWidth + pickWidth
      var x = center - (fullWidth/2)

      ctx.fillStyle = 'rgba(255, 255, 255, 0.75)'
      ctx.font = boldArvo
      ctx.fillText(''+num, x, lineY)
      ctx.font = boldArvoSup
      ctx.fillText(sup, x+numWidth, lineY-24)
      ctx.font = arvo
      ctx.fillText(' PICK', x+numWidth+stWidth, lineY)
    }

    function renderPlayer(ctx, player) {
      ctx.clearRect(0, 0, 500, 400)
      ctx.textAlign = 'center'

      var lineY = 0

      // position
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'
      lineY = text(ctx, positions[player.position].toUpperCase(), 44, lineY)

      // firstname
      ctx.fillStyle = 'rgba(255, 255, 255, 0.50)'
      lineY = text(ctx, player.firstname.toUpperCase(), 55, lineY)

      // lastname
      ctx.fillStyle = 'rgba(255, 255, 255, 1)'
      lineY = boldText(ctx, player.lastname.toUpperCase(), 75, lineY)
    }

    function text(ctx, text, prefSize, lineY) {
      var size = Math.min(prefSize, determineSize(ctx, text))
      lineY += size
      lineY -= (size * 0.12)
      ctx.font = font(size)
      ctx.fillText(text, center, lineY)
      return lineY
    }

    function boldText(ctx, text, prefSize, lineY) {
      var size = Math.min(prefSize, determineSize(ctx, text, true))
      lineY += size
      lineY -= (size * 0.12)
      ctx.font = font(size, 'bold')
      ctx.fillText(text, center, lineY)
      return lineY
    }

    function determineSize(ctx, text, bold) {
      var b = bold ? 'bold ' : ''
      var target = width - 10
      ctx.font = b + '80px "Arvo"'
      var a = ctx.measureText(text).width
      ctx.font = b + '100px "Arvo"'
      var b = ctx.measureText(text).width
      var slope = 20 / (b - a)
      return Math.ceil(slope * target)
    }

    var positions = {
      QB: 'Quarterback',
      RB: 'Running back',
      WR: 'Wide receiver',
      TE: 'Tight end',
      C:  'Center',
      G:  'Guard',
      OT: 'Offensive tackle',
      K:  'Kicker',
      P:  'Punter',
      LS: 'Long snapper',
      OL: 'Offensive line',
      OG: 'Offensive guard',
      DL: 'Defensive line',
      LB: 'Linebacker',
      DB: 'Defensive back'
    }


    return {
      restrict: 'E',
      scope: {
        show: '=',
        pick: '=',
        players: '=',
        setPlayer: '&'
      },
      templateUrl: '/components/pick/pick.html',
      link: function(scope, element, attrs) {

        var ctxPick = $('#cvsPick')[0].getContext('2d')
        var ctxPlayer = $('#cvsPlayer')[0].getContext('2d')

        scope.close = function() {
          scope.show = false
        }

        scope.edit = function() {
          scope.editing = true
        }

        scope.cancelEdit = function() {
          scope.editing = false
        }

        scope.save = function(newPlayer) {
          console.log('save', newPlayer)
          if (newPlayer) {
            scope.pick.player = newPlayer.originalObject
            scope.pick.PlayerId = newPlayer.originalObject.id
            delete scope.pick.newPlayer
            element.find('input').val('')

            renderPlayer(ctxPlayer, scope.pick.player)
            scope.editing = false

            scope.setPlayer({pick:scope.pick})

            element.find('#modal').addClass('long-hide')
            scope.show = false
          }
        }

        scope.$watch('show', function(show) {
          if (show) {
            element.find('#modal').removeClass('long-hide')
          }
        })

        scope.$watch('pick', function(pick) {
          if (!pick || !pick.number) return

          renderPick(ctxPick, pick.number)

          if (pick.player) {
            renderPlayer(ctxPlayer, pick.player)
          }

        })

      }
    }

  })


// Pick No.: 88px Arvo Bold (.75 opacity) *superscript the “th” if possible
// “Pick”: 88px Arvo Regular (.75)
// Position Name: 44px Arvo Regular (.25)
// First Name: 55px Arvo Regular (.50)
// Last Name: 75px Arvo Bold (1.00)
