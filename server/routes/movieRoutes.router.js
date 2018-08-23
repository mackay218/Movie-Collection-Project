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

    

});



/* route to post genre to database */

//DELETE 
/* route to remove movie from database */

/*route to remove all movies matching genre id */


//PUT

/*route to update movie info */

/*route to update genre info */


module.exports = router;