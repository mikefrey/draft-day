angular.module('draftDay')
  .filter('position', function() {

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
      DB: 'Defensive back',
      FB: 'Fullback',
      S:  'Safety',
      CB: 'Cornerback',
      DE: 'Defensive End',
      DT: 'Defensive Tackle',
      NT: 'Nose Tackle'
    }

    return function(p) {
      return positions[p]
    }
  })
