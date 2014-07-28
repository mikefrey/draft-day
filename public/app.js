angular.module('draftDay', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngSanitize'
  ])
  .config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true)

    $routeProvider
      .when('/', {
        templateUrl: '/draft/draft.html',
        controller: 'DraftController as draft'
      })
  })
