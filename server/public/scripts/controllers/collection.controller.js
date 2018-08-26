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
                        id: movie.string_agg,
                        title: movie.title,
                        rating: movie.rating,
                        genre: movie.string_agg,
                        release_date: movie.release_date,
                        run_time: movie.run_time,
                        director: movie.director,
                        writer: movie.writer,
                        actors: movie.actors,
                        plot: movie.plot,
                        imdbRating: movie.imdbRating,
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
    self.deleteMovie = function (title, plot) {
        console.log('in deleteMovie', title, plot);
        $http({
            method: 'DELETE',
            url: '/collection/' + title + '/' + plot
        })
            .then(function (response) {
                console.log('deleted movie:', title);
                getMovies();
            })
            .catch(function (error) {
                console.log('error in deleteMovie:', error);
            });
    }; //end deleteMovie

}]);//end collectionController