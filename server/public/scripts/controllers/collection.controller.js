movieApp.controller('CollectionController', ['$http', function($http){
    console.log('in CollectionController');

    const self = this;

    /*function to get movies to make cards on DOM */
    self.getMovies = function(genre) {
        console.log('in getMovies');
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

                    if(genre == "allMovies" || genre == ""){
                        console.log('all movies');
                        self.moviesArr.push(thisMovieObj);
                    }
                    else{  
                        console.log('filtered'); 
                        let thisMovieGenreArr = movie.string_agg.replace(/\s/g, '').split(',');

                        if(thisMovieGenreArr.includes(genre)){
                            self.moviesArr.push(thisMovieObj);
                        }
                    }
                }
            })
            .catch(function (error) {
                console.log('error in getting movies:', error);
            });
    }; //end getMovies

    self.allMovies = "allMovies";

    self.getMovies(self.allMovies);

    /* function to get list of genres to populate select dropdown */
    function getGenres() {
        console.log('in getGenres');

        $http({
            method: 'GET',
            url: '/genres'
        })
            .then(function (response) {
                console.log('genres:', response.data);
                self.genresArr = response.data;
                if (self.genresArr.length == 0) {
                    self.isShown = false;
                }
                else {
                    self.isShown = true;
                }
            })
            .catch(function (error) {
                console.log('error getting genres for select:', error);
            });
    } //end getGenres

    getGenres();

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
                self.getMovies();
            })
            .catch(function (error) {
                console.log('error in deleteMovie:', error);
            });
    }; //end deleteMovie

}]);//end collectionController