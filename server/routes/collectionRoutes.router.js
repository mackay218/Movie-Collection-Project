const express = require('express');
const router = express.Router();

console.log(' in collection router');

const pool = require('../modules/pool.js');

pool.on('connect', () => {
    console.log('postgresql connected');
});

pool.on('error', (error) => {
    console.log('Error connecting to db', error);
});

/* route to get movies from database
    send back array of movie objects as one argument
*/

router.get('/', (req, res) => {
    console.log('in get movies');

    const getMoviesQuery = `SELECT * FROM "genre" JOIN "movies" 
                            ON "genre"."id" = "movies"."genre_id";`;

    pool.query(getMoviesQuery)
        .then((results) => {
            console.log(results.rows);
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('error getting movies:', error);
            res.sendStatus(500);
        });
}); //end get route to get movies

//DELETE 
/* route to remove movie from database */
router.delete('/:id', (req, res) => {
    console.log('in delete movie', req.params.id);

    let movieToDelete = req.params.id;

    const deleteMovieQuery = `DELETE FROM "movies" WHERE "id" = $1;`;

    pool.query(deleteMovieQuery, [movieToDelete])
        .then((results) => {
            console.log('movie deleted:', movieToDelete);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('error deleting movie:', error);
            res.sendStatus(500);
        });
});//end delete route

module.exports = router;