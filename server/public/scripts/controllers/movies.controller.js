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

    //function to clear add genre text input
    self.clearGenreInput = function(){
        self.movieToAdd.genre = '';
    }

    /* create array to hold genre objects: name and id number from database
        if genre array is empty set variable to hide show select to hide select
        and show input for new genre */
    //POST
    self.addMovie = function(movieObj, releaseDate){
        console.log('in addMovie');

        //variable to hold formated date
        self.date_of_release = '';

        //function to format date
        function formatDate(value) {
            self.date_of_release = value.getMonth() + 1 + "/" + value.getDate() + "/" + value.getFullYear();
            
        }

        formatDate(releaseDate);

        const movie = {
            title: movieObj.title,
            release_date: self.date_of_release,
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
                
            }).catch(function (error) {
                console.log('error in post:', error);
            });
        }
        else{
            alert('please choose a genre');
        }
      
    }//end addMovie


    function getGenres(){
        $http({
            method: 'GET',
            url: '/movies'
        })
        .then(function(response){
            console.log('genres:', response.data);
            self.genresArr = response.data;
            self.isShown = true;
        })
        .catch(function(error){
            console.log('error getting genres for select:', error);
        });


    }//end getGenres
     
    getGenres();


}]);//end movies controller     