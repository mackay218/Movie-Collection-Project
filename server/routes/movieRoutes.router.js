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

        const genreQueryText = `INSERT INTO "genre" ("name") VALUES ($1);`;

        pool.query(genreQueryText, [movie.genre])
            .then((result) => {
                /*query to get back id for new genre added */

                const getGenreID = `SELECT id FROM "genre" WHERE "name" = ($1);`;

                let newGenreID = '';

                pool.query(getGenreID, [movie.genre])
                    .then((secondResult) => {
                        newGenreID = secondResult.rows[0].id;
                        //console.log(secondResult.rows[0].id);

                        /* quey to add new movie with new genre */
                        //ADD IMG URL LATER
                        const addMovieQuery = `INSERT INTO "movies" ("name", "release_date",
                                                "run_time", "genre_id") VALUES 
                                                ($1, $2, $3, $4);`;

                        pool.query(addMovieQuery, [movie.title, movie.release_date, 
                                                    movie.run_time, newGenreID])
                            .then((thirdResult) => {
                                console.log('movie and genre added');
                                res.sendStatus(201);
                                
                            }).catch((thirdError) => {
                                console.log('error adding movie and new genre', error);
                                res.sendStatus(500);
                            });

                    }).catch((secondError) => {
                        console.log('error getting genre id from add movie', secondError);
                        res.sendStatus(500);
                    });

            }).catch((error) => {
                console.log('error in genre post from addMovie', error);
                res.sendStatus(500);
            });

    }
    else{
        //ADD IMG URL LATER
        const queryText = `INSERT INTO "movies" ("name", "release_date",
                                                "run_time", "genre_id") VALUES 
                                                ($1, $2, $3, $4);`;
        pool.query(queryText, [movie.name, movie.release_date, movie.run_time, 
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