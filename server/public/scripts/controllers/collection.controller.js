movieApp.controller('CollectionController', ['$http', function($http){
    console.log('in CollectionController');

    const self = this;

    /*function to get movies to make cards on DOM */
    function getMovies() {
        $http({
            method: 'GET',
            url: '/collection'
        })
            .then(function (response) {
                console.log('movies:', response.data);
                /*parse objects and 
                add property to hold boolean for hiding confirmBox*/
                self.moviesArr = [];
                for (let movie of response.data) {
                    let thisMovieObj = {
                        title: movie.title,
                        id: movie.id,
                        name: movie.name,
                        release_date: movie.release_date,
                        run_time: movie.run_time,
                        image_url: movie.image_url,
                        isHidden: true
                    };

                    self.moviesArr.push(thisMovieObj);
                }
            })
            .catch(function (error) {
                console.log('error in getting movies:', error);
            });
    }; //end getMovies

    getMovies();

    //DELETE
    /* function to delete movies */
    self.deleteMovie = function (id) {
        console.log('in deleteMovie', id);
        $http({
            method: 'DELETE',
            url: '/collection/' + id
        })
            .then(function (response) {
                console.log('deleted movie:', id);
                getMovies();
            })
            .catch(function (error) {
                console.log('error in deleteMovie:', error);
            });
    }; //end deleteMovie

}]);//end collectionController