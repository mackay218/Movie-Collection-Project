const express = require('express');
const router = express.Router();

const pool = require('../modules/pool.js');

pool.on('connect', () => {
    console.log('postgresql connected');
});

pool.on('error', (error) => {
    console.log('Error connecting to db', error);
});



router.get('/:term/:type', (req, res) => {
    console.log('in search movies');

    let searchQuery = '';

    let term = req.params.term;
    let type = req.params.type;

    console.log('term:', term, " type:", type);

    if(type == 'title'){
        console.log('search by title');
        searchQuery = `SELECT
		"movies"."title", 
		"movies"."rating", 
		"movies"."release_date",
		"movies"."run_time",
		"movies"."director",
		"movies"."writer",
		"movies"."actors",
		"movies"."plot",
		"movies"."image_url",
		"movies"."imdbRating",
		string_agg("name", ', ') 
        FROM "movies" JOIN "genre" ON "genre"."id" = CAST("movies"."genre_id" as INTEGER) 
        WHERE "movies"."title" ILIKE '%${term}%'		
        GROUP BY "movies"."title", 
		"movies"."rating", 
		"movies"."release_date",
		"movies"."run_time",
		"movies"."director",
		"movies"."writer",
		"movies"."actors",
		"movies"."plot",
		"movies"."image_url",
		"movies"."imdbRating";`;
    }
    else if (type == 'release_date'){
        searchQuery = `SELECT
		"movies"."title", 
		"movies"."rating", 
		"movies"."release_date",
		"movies"."run_time",
		"movies"."director",
		"movies"."writer",
		"movies"."actors",
		"movies"."plot",
		"movies"."image_url",
		"movies"."imdbRating",
		string_agg("name", ', ') 
        FROM "movies" JOIN "genre" ON "genre"."id" = CAST("movies"."genre_id" as INTEGER) 
        WHERE "movies"."release_date" ILIKE '%${term}%'
		GROUP BY "movies"."title", 
		"movies"."rating", 
		"movies"."release_date",
		"movies"."run_time",
		"movies"."director",
		"movies"."writer",
		"movies"."actors",
		"movies"."plot",
		"movies"."image_url",
		"movies"."imdbRating";`;
    }
    else if (type == 'run_time'){
        searchQuery = `SELECT
		"movies"."title", 
		"movies"."rating", 
		"movies"."release_date",
		"movies"."run_time",
		"movies"."director",
		"movies"."writer",
		"movies"."actors",
		"movies"."plot",
		"movies"."image_url",
		"movies"."imdbRating",
		string_agg("name", ', ') 
        FROM "movies" JOIN "genre" ON "genre"."id" = CAST("movies"."genre_id" as INTEGER) 
        WHERE "movies"."run_time" ILIKE '%${term}%'
		GROUP BY "movies"."title", 
		"movies"."rating", 
		"movies"."release_date",
		"movies"."run_time",
		"movies"."director",
		"movies"."writer",
		"movies"."actors",
		"movies"."plot",
		"movies"."image_url",
		"movies"."imdbRating";`;
    }
    else if (type == 'director'){
        searchQuery = `SELECT
		"movies"."title", 
		"movies"."rating", 
		"movies"."release_date",
		"movies"."run_time",
		"movies"."director",
		"movies"."writer",
		"movies"."actors",
		"movies"."plot",
		"movies"."image_url",
		"movies"."imdbRating",
		string_agg("name", ', ') 
        FROM "movies" JOIN "genre" ON "genre"."id" = CAST("movies"."genre_id" as INTEGER) 
        WHERE "movies"."director" ILIKE '%${term}%'
		GROUP BY "movies"."title", 
		"movies"."rating", 
		"movies"."release_date",
		"movies"."run_time",
		"movies"."director",
		"movies"."writer",
		"movies"."actors",
		"movies"."plot",
		"movies"."image_url",
		"movies"."imdbRating";`;
    }
    else if (type == 'writer'){
        searchQuery = `SELECT
		"movies"."title", 
		"movies"."rating", 
		"movies"."release_date",
		"movies"."run_time",
		"movies"."director",
		"movies"."writer",
		"movies"."actors",
		"movies"."plot",
		"movies"."image_url",
		"movies"."imdbRating",
		string_agg("name", ', ') 
        FROM "movies" JOIN "genre" ON "genre"."id" = CAST("movies"."genre_id" as INTEGER) 
        WHERE "movies"."writer" ILIKE '%${term}%'
		GROUP BY "movies"."title", 
		"movies"."rating", 
		"movies"."release_date",
		"movies"."run_time",
		"movies"."director",
		"movies"."writer",
		"movies"."actors",
		"movies"."plot",
		"movies"."image_url",
		"movies"."imdbRating";`;
    }
    else if (type == 'actors'){
        searchQuery = `SELECT
		"movies"."title", 
		"movies"."rating", 
		"movies"."release_date",
		"movies"."run_time",
		"movies"."director",
		"movies"."writer",
		"movies"."actors",
		"movies"."plot",
		"movies"."image_url",
		"movies"."imdbRating",
		string_agg("name", ', ') 
        FROM "movies" JOIN "genre" ON "genre"."id" = CAST("movies"."genre_id" as INTEGER) 
        WHERE "movies"."actors" ILIKE '%${term}%'
		GROUP BY "movies"."title", 
		"movies"."rating", 
		"movies"."release_date",
		"movies"."run_time",
		"movies"."director",
		"movies"."writer",
		"movies"."actors",
		"movies"."plot",
		"movies"."image_url",
		"movies"."imdbRating";`;
    }
    else if (type == 'genre'){
        searchQuery = `SELECT
		"movies"."title", 
		"movies"."rating", 
		"movies"."release_date",
		"movies"."run_time",
		"movies"."director",
		"movies"."writer",
		"movies"."actors",
		"movies"."plot",
		"movies"."image_url",
		"movies"."imdbRating",
		string_agg("name", ', ') 
        FROM "movies" JOIN "genre" ON "genre"."id" = CAST("movies"."genre_id" as INTEGER) 
        WHERE "genre"."name" ILIKE '%${term}%'
		GROUP BY "movies"."title", 
		"movies"."rating", 
		"movies"."release_date",
		"movies"."run_time",
		"movies"."director",
		"movies"."writer",
		"movies"."actors",
		"movies"."plot",
		"movies"."image_url",
		"movies"."imdbRating";`;
    }

    pool.query(searchQuery)
        .then((results) => {
            console.log(results.rows);

            res.send(results.rows);
        })
        .catch((error) => {
            console.log('error in search query', error);

            res.sendStatus(500);
        });
}); //end get route for searching








module.exports = router;