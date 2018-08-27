const express = require('express');
const router = express.Router();

const axios = require('axios');

const config = require('../modules/config.js');
const myKey = config.MY_KEY;

console.log('in movie router');

const pool = require('../modules/pool.js');

pool.on('connect', () => {
    //console.log('postgresql connected');
});

pool.on('error', (error) => {
    //console.log('Error connecting to db', error);
});

//POST 
/* route to post movie to database */
router.post('/', (req,res) => {
    console.log('in post movies');

    const movie = req.body;
    console.log(movie);

    let newDate = new Date(movie.release_date);

    let year = newDate.getFullYear();

    let title = movie.title.replace(' ', '+');

    let urlString = `https://www.omdbapi.com/?t=${title}&y=${year}&apikey=${myKey}`;
  
    //console.log(urlString);

    //get movie info from omdb api
    axios.get(urlString) 
        .then((response) => {
            console.log('getting info from omdb');
            let newTitle = response.data.Title;
            console.log('newTitle:', newTitle);
            //console.log(newTitle.length);
            //check to see if movie is found
            
            if(newTitle != 'undefined'){
                if (newTitle.length > 0) {
                    //call function to post movie to database
                    //using api data
                    console.log('hello', response.data.Title);
                    postMovieFromAPI(response.data);
                }
                else {
                    //call function to post movie to database
                    //using user given data
                    postMovieFromUser();
                } 
            }
        })
        .catch((error) => {
            console.log('error getting movie info from api:', error);
            //call function to post movie to database
            //using user given data
            postMovieFromUser();
            res.sendStatus(500);
        }); 
 
    /* function to get all genres from local database */
    function getGenresFromDB(genresFromInput, movieINFO, useApi){
        //array to hold genres from local db
        let genreArr = [];
        console.log('in getGenresFromDB');
       
        //get list of genres from local database to compare to genres from api
        const getAllGenres = `SELECT name FROM "genre";`;
        
        pool.query(getAllGenres)
            .then((results) => {
                console.log('results:', results.rows);
                for (name of results.rows) {
                    genreArr.push(name.name);
                }
                //console.log('getGenresFromDB current genreArr', genreArr);
                //console.log('genresFromApis:', genresFromInput);

                compareGenreLists(genreArr, genresFromInput, movieINFO, useApi);
                
            })
            .catch((error) =>{
                console.log('error getting genres from local db:', error);
            });
            
    }//end getAllGenres
    /******************/

    /* function to compare genres from api to local database */
    function compareGenreLists(genreArr, genresFromInput, movieINFO, useApi){
        console.log('in compareGenreLists');
        
        if( Array.isArray(genresFromInput) && genresFromInput.length > 1){
            //loop through genresFromApi to check against genreArr
            for (let newGenre of genresFromInput) {
                //console.log('new genres:', newGenre);
                //console.log('current genres:', genreArr);
                if (genreArr.includes(newGenre)) {
                    //query to get id of matching existing genre
                    getGenreID(newGenre, movieINFO, useApi);
                    //console.log('genre already in database', newGenre);
                }
                else {
                    //console.log('thats a new genre:', newGenre);

                    //add new genre
                    addNewGenre(newGenre, movieINFO, useApi);
                }
            } 
        }
        else{
            if (genreArr.includes(genresFromInput)) {
                //query to get id of matching existing genre
                getGenreID(genresFromInput, movieINFO, useApi);
                //console.log('genre already in database', genresFromInput);
            }
            else {
                //console.log('thats a new genre:', genresFromInput);

                //add new genre
                addNewGenre(genresFromInput, movieINFO, useApi);
            }
        }
    }//end compareGenreLists

    /*function to add genre to local database */
    function addNewGenre(newGenre, movieINFO, useApi){
        console.log('in addNewGenre', newGenre);

        //query to add new genre
        const genreQueryText = `INSERT INTO "genre" ("name") VALUES ($1);`;

        pool.query(genreQueryText, [newGenre])
            .then((results) => {
                //console.log('add new genre:', newGenre);
                
                //get genre id
                getGenreID(newGenre, movieINFO, useApi);
            })
            .catch((error) => {
                //console.log('error adding new genre:', error);
                res.sendStatus(500);
            });
    }//end addNewGenre
    /*********************/

    /* function to get genre id from local database */
    function getGenreID(newGenre, movieINFO, useApi){ 
        console.log('in get GenreID', newGenre);

        let genreID = 0;

        const getGenreID = `SELECT id FROM "genre" WHERE "name" = $1;`;

        pool.query(getGenreID, [newGenre])
            .then((result) => {
                genreID = result.rows[0].id;
                //console.log('genreID after:', genreID);

                if(useApi == true){
                    addMovieFromAPI(movieINFO, genreID);
                }
                else if(useApi == false){
                    addMovieFromUser(genreID);
                }
            })
            .catch((error) => {
                //console.log('error getting genre id:', error);
                res.sendStatus(500);
            });
    }//end getGenreID
    /********************/

    let useApi = true;

    /* function to add movie to database */
    function addMovieFromAPI(movieINFO, genreID){
        console.log('in addMovieFromAPI', genreID);

        //query to add movie 
        
        const addMovieQuery = `INSERT INTO "movies" ("title", "rating", 
                                                            "release_date",
                                                            "image_url",
                                                            "run_time", 
                                                            "director",
                                                            "writer",
                                                            "actors",
                                                            "plot",
                                                            "imdbRating",
                                                            "genre_id") VALUES 
                                                ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11);`;
        pool.query(addMovieQuery, [movieINFO.Title, movieINFO.Rated,
        movieINFO.Released, movieINFO.Poster,
        movieINFO.Runtime, movieINFO.Director,
        movieINFO.Writer, movieINFO.Actors,
        movieINFO.Plot, movieINFO.imdbRating,
            genreID])
            .then((results) => {
                console.log('movie added');
                res.sendStatus(201);
            })
            .catch((error) => {
                console.log('error adding movie:', error);
                res.sendStatus(500);
            }); 
    }//end addMovieFromAPI

    function postMovieFromAPI(movieINFO){
        console.log('in postMovieFromAPI');
        
        useApi = true;

        //get list of genres from api
        let genresFromApi = movieINFO.Genre.toLowerCase().replace(/\s/g, '').split(',');
        //console.log('genresFromApi:', genresFromApi);
        
        getGenresFromDB(genresFromApi, movieINFO, useApi);

    }//end postMovieFromAPI
    /********************************/

    function addMovieFromUser(genreID){
        console.log('in addMovieFromUser');
        //query to add new movie from user provided info
        const addMovieQuery = `INSERT INTO "movies" ("title", "release_date",
                                            "run_time", "genre_id") VALUES 
                                            ($1, $2, $3, $4);`;
        pool.query(addMovieQuery, [movie.title, movie.release_date, 
                                    movie.run_time, genreID])
            .then((results) => {
                console.log('add new movie:', movie.title);
                res.sendStatus(201);
            })
            .catch((error) => {
                console.log('error adding movie:', error);
                res.sendStatus(500);
            });

    }//end addMovieFromUser
    /***************************/
 
    function postMovieFromUser(){
        console.log('in postMovieFromUser');
        /*if genre is a string run post route to genre table first
        and get new genre id number from genre table 
        and then run post route to movies table */
        
        useApi = false;

        if (isNaN(movie.genre) && movie.genrePicker == false){

            //get genres from local database
            let blankInfo = '';

            getGenresFromDB(movie.genre, blankInfo, useApi);
        }
        else{
            addMovieFromUser(movie.genre);
        }
    }  
    //end postMovieFromUser
    /***************************/

}); //end post route to add movie

//GET 
router.get('/', (req, res) =>{
    console.log('in get newest movie');

    const movieQuery = `SELECT * FROM "movies" 
                        JOIN "genre" ON "genre"."id" = "movies"."genre_id" 
                        ORDER BY "movies"."id" DESC LIMIT 1;`

    pool.query(movieQuery)
        .then((results) => {
            res.send(results.rows);
        })                    
        .catch((error) => {
            console.log('error getting newest movie:', error);
        })
})

module.exports = router;