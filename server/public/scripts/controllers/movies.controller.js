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
                self.movieToAdd = {};
            }).catch(function (error) {
                console.log('error in post:', error);
                self.movieToAdd = {};
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


}]);//end movies controller     