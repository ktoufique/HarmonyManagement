'use strict';

/* App Module */

var harmonyApp = angular.module('harmonyApp', [
  'ui.bootstrap',
  'ngRoute',
  'ngAnimate',
  'harmonyControllers', 
  'harmonyServices', 
  //'harmonyDirectives',
  //'harmonyAnimates' 
]);

harmonyApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
      when('/skills', {
        templateUrl: 'partials/skills.html',
        controller: 'mainController'
       }).
      when('/skill/:id', {
        templateUrl: 'partials/skill.html',
        controller: 'mainController'
       }).
      when('/projects', {
        templateUrl: 'partials/projects.html',
        controller: 'mainController'
       }).
      when('/developers', {
        templateUrl: 'partials/developers.html',
        controller: 'mainController'
       }).
      when('/developer/:id', {
        templateUrl: 'partials/developer.html',
        controller: 'developerController'
       }).
      when('/configuration', {
        templateUrl: 'partials/configuration.html',
        controller: 'mainController'
        }).
      otherwise({
        redirectTo: '/'
      });
  }]);
