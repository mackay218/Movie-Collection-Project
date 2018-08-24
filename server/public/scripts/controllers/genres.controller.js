

movieApp.controller('GenresController', ['$http', function ($http) {
    console.log('in GenresController');

    const self = this;

    //GET
    function getGenres(){
        console.log('in get genres');

        $http({
            method: 'GET',
            url: '/genres/count'
        })
        .then(function(response){
           
            console.log(response.data);
        })
        .catch(function(error){
            console.log('error getting genres:', error);
        });
    } //end get genres

    getGenres();


}]);//end genres controller  