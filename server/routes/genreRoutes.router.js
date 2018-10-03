const express = require('express');
const router = express.Router();

console.log('in genre router');

const pool = require('../modules/pool.js');

pool.on('connect', () => {
    console.log('postgresql connected');
});

pool.on('error', (error) => {
    console.log('Error connecting to db', error);
});

router.post('/', (req, res) => {
    console.log('in genre post', req.body);

    /* check to make sure genres don't double */
    const getAllGenres = `SELECT name FROM "genre";`;

    //convert all genres to lowercase
    const newGenre = req.body.name.toLowerCase();

    pool.query(getAllGenres)
    .then((results) => {

        console.log('results:', results.rows);

        const genreArr = [];

        for (name of results.rows) {
            genreArr.push(name.name);
        }

        if(genreArr.includes(newGenre)){
            console.log('genre already in database');
            res.sendStatus(200);
        }
        else{c
            //query to add new genre
            const genreQueryText = `INSERT INTO "genre" ("name") VALUES ($1);`;

            pool.query(genreQueryText, [newGenre])
            .then((results) => {
                console.log('added new genre:', newGenre);
                res.sendStatus(200);
            })
            .catch((error) => {
                console.log('error adding new genre:', error);
                res.sendStatus(500);
            });
        }
    }).catch((error) => {
        console.log('errog getting genres:', error);
    })
}); //end post route

/* route to get list of genres */
router.get('/', (req, res) => {
    console.log('in get genres');

    const getGenresQuery = `SELECT * FROM "genre";`;

    pool.query(getGenresQuery)
        .then((results) => {
            console.log(results.rows);
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('error getting genres:', error);
            res.sendStatus(500);
        });
});

router.get('/count', (req, res) => {
    console.log('in get genres count');

    const getGenreCountQuery = `SELECT COUNT("movies"."genre_id"), "genre"."id", "genre"."name" 
                                FROM "movies" RIGHT JOIN "genre" 
                                ON "genre"."id" = "movies"."genre_id" 
                                GROUP BY "genre"."id";`;
    
    pool.query(getGenreCountQuery)
        .then((results) => {
            console.log("genre count", results.rows);
            res.send(results.rows);
        })
        .catch((error) => {
            console.log('error getting genre count:', error);
            res.sendStatus(500);
        });

}); //end get route
/* route to post genre to database */

//DELETE
router.delete('/:id', (req, res) => {
    console.log('in delete route', req.params.id);

    let genreToDelete = req.params.id;

    const deleteGenreQuery = `DELETE FROM "genre" WHERE "genre"."id" = $1;`;

    pool.query(deleteGenreQuery, [genreToDelete])
        .then((results) => {
            console.log('delete genre:', genreToDelete);
            res.sendStatus(200);
        })
        .catch((results) => {
            console.log('error deleting genre:', error);
            res.sendStatus(500);
        });
});//end delete route


module.exports = router;