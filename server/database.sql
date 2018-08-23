CREATE TABLE "movies" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255),
    "release_date" VARCHAR(255),
    "image_url" VARCHAR(255) DEFAULT 'http://www.enchantedmind.com/wp/wp-content/uploads/2013/01/Movies.jpg',
    "run_time" INT, 
    "genre_id" INT
);

CREATE TABLE "genre" (
    "id" SERIAL PRIMARY KEY, 
    "name" VARCHAR(255)
);