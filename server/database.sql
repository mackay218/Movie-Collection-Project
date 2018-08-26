CREATE TABLE "movies" (
    "id" SERIAL PRIMARY KEY not null,
    "title" VARCHAR(255) not null,
    "rating" VARCHAR(10),
    "release_date" VARCHAR(255) not null,
    "image_url" VARCHAR(255) DEFAULT 'http://www.enchantedmind.com/wp/wp-content/uploads/2013/01/Movies.jpg' not null,
    "run_time" VARCHAR (100) not null, 
    "plot" VARCHAR(400) DEFAULT 'unknown',
    "director" VARCHAR(100) DEFAULT 'unknown',
    "writer" VARCHAR(255) DEFAULT 'unknown',
    "actors" VARCHAR(255) DEFAULT 'unknown',
    "imdbRating" VARCHAR(10) DEFAULT 'unknown',
    "genre_id" INT not null
);

CREATE TABLE "genre" (
    "id" SERIAL PRIMARY KEY, 
    "name" VARCHAR(255)
);