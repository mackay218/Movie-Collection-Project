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

    /* create array to hold genre objects: name and id number from database
        if genre array is empty set variable to hide show select to hide select
        and show input for new genre */


    //POST
    self.addMovie = function(movieObj, releaseDate){
        console.log('in addMovie');

        console.log('movieObj', movieObj);
        console.log('releaseDate', releaseDate);

    }


     
}]);//end movies controller     