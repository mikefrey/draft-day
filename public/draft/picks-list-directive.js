angular.module('draftDay')
  .directive('picksList', function($rootScope) {

    return {
      restrict: 'A',
      scope: {
        picks: '=',
        currentPick: '=',
        showPick: '&'
      },
      templateUrl: '/draft/picks-list.html',
      link: function(scope, element, attrs) {

      }
    }

  })
