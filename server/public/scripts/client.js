console.log('js');

const movieApp = angular.module('movieApp', ['ngRoute', 'ngMaterial', 'ngMessages']);

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
    .when('/collection', {
        templateUrl: 'views/collection.html',
        controller: 'CollectionController as vm'
    })
    .when('/search', {
        templateUrl: 'views/search.html',
        controller: 'SearchController as vm'
    })
    .otherwise( {templateUrl: 'views/404.html'});

}]); //end config