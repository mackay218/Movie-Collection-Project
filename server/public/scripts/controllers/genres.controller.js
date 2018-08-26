movieApp.controller('GenresController', ['$http', function ($http) {
    console.log('in GenresController');

    const self = this;

    //POST
    self.addGenre = function(genreToAdd){
        console.log('in addGenre', genreToAdd);
    
        $http({
            method: 'POST',
            url: '/collection',
            data: genreToAdd
        })
        .then(function(response){
            console.log('added genre', genreToAdd);
            getGenres();
            self.genreToAdd = {};
        })
        .catch(function(error){
            console.log('error posting genre:', error);
            self.genreToAdd = {};
        });
        
        
    }; //end addGenre

    //GET
    function getGenres(){
        console.log('in get genres');

        $http({
            method: 'GET',
            url: '/genres/count'
        })
        .then(function(response){
            console.log(response.data);
            self.genreCountArr = [];
            for(let genre of response.data){
                let thisGenre = {
                    name: genre.name,
                    count: genre.count,
                    id: genre.id,
                    isHidden: true
                };
                self.genreCountArr.push(thisGenre);
            }

        })
        .catch(function(error){
            console.log('error getting genres:', error);
        });
    } //end get genres

    getGenres();

    //DELETE
    self.deleteGenre = function(genre){
        console.log('in deleteGenre', genre);

        //prevent deletion of genre with movies of that genre in database
        if(genre.count > 0){
            alert('cannot delete genre with movies');
        }
        else{
            $http({
                method: 'DELETE',
                url: '/genres/' + genre.id
            })
            .then(function (response) {
                console.log('delete genre:', genre.id);
            })
            .catch(function (error) {
                console.log('error deleting genre:', error);
            });
            getGenres();
        }
    
    }; //end deleteGenre

}]);//end genres controller  