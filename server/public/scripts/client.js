console.log('js');

const movieApp = angular.module('movieApp', ['ngRoute']);

//config
movieApp.config(['$routeProvider', function($routeProvider) {
    console.log('config loaded');

    $routeProvider.when('/',{
        redirectTo: '/movies'
    })
    .when('/movies', {
       templateUrl: 'views/movies.html',
       controller: 'MoviesController as vm'
    })
    .when('/genres', {
        templateUrl: 'views/genres.html',
        controller: 'GenresController as vm'
    })
    .otherwise( {templateUrl: 'views/404.html'});

}]); //end config