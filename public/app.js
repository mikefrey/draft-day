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
        redirectTo: '/draft'
      })
      .when('/draft', {
        templateUrl: '/draft/draft.html',
        controller: 'DraftController as draft',
        resolve: { picks: function(Picks, $route) {
          return Picks.query({ offense: 'offense' })
        }}
      })
      .when('/select-player', {
        templateUrl: '/draft/picker.html',
        controller: 'PickerController as draft',
        resolve: { picks: function(Picks, $route) {
          return Picks.query({ offense: 'offense' })
        }}
      })
      .when('/edit/players', {
        templateUrl: '/edit/players.html',
        controller: 'PlayersController as ctrl'
      })
      .when('/edit/offense', {
        templateUrl: '/edit/picks.html',
        controller: 'PicksController as ctrl'
      })
  })
