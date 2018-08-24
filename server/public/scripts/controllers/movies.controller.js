/* array from get route will be array of objects containing:
     movie title, release date, img url, genre */

movieApp.controller('MoviesController', ['$http', function($http){
    console.log('in MoviesController');

    const self = this;

    //get date to set release date input to current date
    function getDate() {
        self.myDate = new Date();
        self.isOpen = false;
    }
    getDate();

   
    //POST
    self.addMovie = function(movieObj, releaseDate){
        console.log('in addMovie');

        console.log('releaseDate', releaseDate);

        const movie = {
            title: movieObj.title,
            release_date: releaseDate,
            run_time: movieObj.run_time,
            genre: movieObj.genre,
            genrePicker: self.isShown
            //img url:
        }

        console.log(movie);

        //make sure genre input
        if(movieObj.genre.length > 0){
            $http({
                method: 'POST',
                url: '/movies',
                data: movie
            }).then(function (response) {
                console.log('added movie!');
                getGenres();
                getMovies();

            }).catch(function (error) {
                console.log('error in post:', error);
            });
        }
        else{
            alert('please choose a genre');
        }
      
    }; //end addMovie


     /* create array to hold genre objects: name and id number from database
        if genre array is empty set variable to hide show select to hide select
        and show text input for new genre */

    //GET
    /* function to get list of genres to populate select dropdown */
    function getGenres(){
        console.log('in getGenres');
        $http({
            method: 'GET',
            url: '/genres'
        })
        .then(function(response){
            console.log('genres:', response.data);
            self.genresArr = response.data;
            if(self.genresArr.length == 0){
                self.isShown = false;
            }
            else{
                self.isShown = true;
            }
        })
        .catch(function(error){
            console.log('error getting genres for select:', error);
        });


    } //end getGenres
     
    getGenres();

    /*function to get movies to make cards on DOM */
    function getMovies(){
        $http({
            method: 'GET',
            url: '/movies'
        })
        .then(function(response){
            console.log('movies:', response.data);
            /*parse objects and 
            add property to hold boolean for hiding confirmBox*/
            self.moviesArr = [];
            for(let movie of response.data){
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
        .catch(function(error){
            console.log('error in getting movies:', error);
        });
    }; //end getMovies

    getMovies();

    //DELETE
    /* function to delete movies */
    self.deleteMovie = function(id){
        console.log('in deleteMovie', id);
        $http({
            method: 'DELETE',
            url: '/movies/' + id
        })
        .then(function(response){
            console.log('deleted movie:', id);
            getMovies();
        })
        .catch(function(error){
            console.log('error in deleteMovie:', error);
        });
    }; //end deleteMovie

    
}]);//end movies controller     