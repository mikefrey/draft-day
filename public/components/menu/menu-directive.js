angular.module('draftDay')
  .directive('modelMenu', function($rootScope) {

    return {
      restrict: 'E',
      scope: {
        showMenu: '='
      },
      templateUrl: '/components/menu/menu.html',
      link: function(scope, element, attrs) {

        scope.close = function() {
          scope.showMenu = false
        }

      }
    }

  })
