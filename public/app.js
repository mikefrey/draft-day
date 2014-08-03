angular.module('draftDay', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'angucomplete'
  ])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true)

    $routeProvider
      .when('/', {
        redirectTo: '/draft/offense'
      })
      .when('/draft/:side', {
        templateUrl: '/draft/draft.html',
        controller: 'DraftController as draft',
        resolve: { picks: function(Picks, $route) {
          return Picks.query({ offense: $route.current.params.side.toLowerCase() === 'offense' })
        }}
      })
      .when('/edit/players', {
        templateUrl: '/edit/players.html',
        controller: 'PlayersController as ctrl'
      })
      .when('/edit/:side', {
        templateUrl: '/edit/picks.html',
        controller: 'PicksController as ctrl'
      })
  })
