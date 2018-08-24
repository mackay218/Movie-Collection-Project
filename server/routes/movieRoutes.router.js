const express = require('express');
const router = express.Router();

console.log('in movie router');

const pool = require('../modules/pool.js');

pool.on('connect', () => {
    console.log('postgresql connected');
});

pool.on('error', (error) => {
    console.log('Error connecting to db', error);
});


//GET
/* route to get movies from database
    send back array of movie objects as one argument
*/

router.get('/', (req, res) => {
    console.log('in get movies');

    const getMoviesQuery = `SELECT * FROM "movies" JOIN "genre" 
                            ON "movies"."genre_id" = "genre"."id";`;

    pool.query(getMoviesQuery)
        .then((results) => {
            console.log(results.rows);
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('error getting movies:', error);
            res.sendStatus(500);
        });
});
    
/* route to get list of genres */
router.get('/', (req, res) => {
    console.log('in get genres');

    const getGenresQuery = `SELECT * FROM "genre";`;

    pool.query(getGenresQuery)
        .then((results) => {
            console.log('genres:', results.rows);
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('error getting genres:', error);
            res.sendStatus(500);
        });
});

//POST 
/* route to post movie to database */
router.post('/', (req,res) => {
    console.log('in post movies');

    const movie = req.body;
    console.log(movie);

    /*if genre is a string run post route to genre table first
        and get new genre id number from genre table 
        and then run post route to movies table */
    if(isNaN(movie.genre) && movie.genrePicker == false){

        /* check to make sure genres don't double */
        const getAllGenres = `SELECT name FROM "genre";`;

        //convert all genres to lowercase
        const newGenre = movie.genre.toLowerCase();


        pool.query(getAllGenres)
            .then((results) => {
                console.log('results:', results.rows);

                const genreArr = [];

                for(name of results.rows){
                    genreArr.push(name.name);
                }
                
                //check if genre already exists
                if(genreArr.includes(newGenre)){
                    console.log('genre already in database');

                    //query to get id of matching existing genre
                    const getGenreID = `SELECT id FROM "genre" WHERE "name" = ($1);`;

                    pool.query(getGenreID, [newGenre])
                        .then((result) => {

                            let genreID = '';

                            genreID = result.rows[0].id;

                            //query to add movie 
                            //ADD IMG URL LATER
                            const addMovieQuery = `INSERT INTO "movies" ("title", "release_date",
                                                "run_time", "genre_id") VALUES 
                                                ($1, $2, $3, $4);`;

                            pool.query(addMovieQuery, [movie.title, movie.release_date,
                            movie.run_time, genreID])
                                .then((result) => {
                                    console.log('movie and genre added');
                                    res.sendStatus(201);

                                }).catch((error) => {
                                    console.log('error adding movie and new genre', error);
                                    res.sendStatus(500);
                                });

                        });
                        
                        

                }
                //add new genre and new movie
                else{
                    //query to add new genre
                    const genreQueryText = `INSERT INTO "genre" ("name") VALUES ($1);`;

                    pool.query(genreQueryText, [newGenre])
                        .then((result) => {

                            //query to get back id for new genre added 
                            const getGenreID = `SELECT id FROM "genre" WHERE "name" = ($1);`;

                            let newGenreID = '';
 
                            pool.query(getGenreID, [newGenre])
                                .then((secondResult) => {
                                    newGenreID = secondResult.rows[0].id;
                                    
                                    //query to add new movie with new genre 
                                    //ADD IMG URL LATER
                                    const addMovieQuery = `INSERT INTO "movies" ("title", "release_date",
                                                "run_time", "genre_id") VALUES 
                                                ($1, $2, $3, $4);`;

                                    pool.query(addMovieQuery, [movie.title, movie.release_date,
                                    movie.run_time, newGenreID])
                                        .then((result) => {
                                            console.log('movie and genre added');
                                            res.sendStatus(201);

                                        }).catch((error) => {
                                            console.log('error adding movie and new genre', error);
                                            res.sendStatus(500);
                                        });

                                }).catch((error) => {
                                    console.log('error getting genre id from add movie', error);
                                    res.sendStatus(500);
                                });

                        }).catch((error) => {
                            console.log('error in genre post from addMovie', error);
                            res.sendStatus(500);
                        }); 
                }
            })
            .catch((error) => {
                console.log('error getting all genres:', error);
                res.sendStatus(500);
            });
    }
    else{
        //ADD IMG URL LATER
        const queryText = `INSERT INTO "movies" ("title", "release_date",
                                                "run_time", "genre_id") VALUES 
                                                ($1, $2, $3, $4);`;
        pool.query(queryText, [movie.title, movie.release_date, movie.run_time, 
                                movie.genre])
            .then((result) => {
                console.log('added new movie');
                res.sendStatus(201);
            })
            .catch((error) => {
                console.log('error in adding ONLY new movie:', error);
                res.sendStatus(500);
            });                                               
    }

    //else if genre is a number run post route to movies table

});





//DELETE 
/* route to remove movie from database */

/*route to remove all movies matching genre id */


//PUT

/*route to update movie info */

/*route to update genre info */


module.exports = router;