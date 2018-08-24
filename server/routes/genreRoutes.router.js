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

/* route to post genre to database */

/*route to remove all movies matching genre id */

module.exports = router;