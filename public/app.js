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
        templateUrl: '/draft/draft.html',
        controller: 'DraftController as draft'
      })
      .when('/draft/:side', {
        templateUrl: '/draft/draft.html',
        controller: 'DraftController as draft'
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
