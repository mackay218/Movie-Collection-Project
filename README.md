# Movie-Collection-Project

    This is an application to add and store information about movies. It also keeps track of the number of movies in each genre. 

## Built With
    - HTML5
    - CSS3
    - AngularJS
    - NodeJS
    - ExpressJS
    - OMDB API

## Getting Started


Fork and clone the respository.

Run ```npm install express```  and ```npm install pg``` in terminal to set up the server side and database.

Run ```npm install axios``` in terminal to set up calls to the ombd api.

Create a database called ```movie_collection``` and run the sql queries found in database.sql.
Go to http://www.omdbapi.com/apikey.aspx to get an API KEY. Make sure 

In the modules folder create a new file called ```config.js``` add the following code to the file.

```const config = { MY_KEY: 'your_api_key_from_omdb_here' };  module.exports = config;```

## Screen Shot
![Screen Shot](public/images/screen_shot.png)

## Features

- Add genres
- Add movies by name, absolute image URL, release date, genere and run time
- Remove movies
- Delete existing entries
- Show total number of movies next to each genre

### Database

Start with two tables **movies** & **genres**. When base features are complete, add more tables as needed for stretch goals.

## Stretch Goals

- Angular Material for design
- Ability to edit genres or movies
- Ability to search or filter by name or genre
- Vote up or down a movie
- Ability to favorite a movie and display favorites on a separate route
- Feel free to deviate from this list and add features of your own

- favorites database and view
- dynamically add individual movie pages
    - possibley easier to do modals

- 3rd view html page for search function, search all movies or limit to genre, seach    by name, release date or run time

- sort all movies page by release date, run time, alphabetical order etc.


## CHECKLIST

- [x] install node express, pg, and angularjs

- [x] set up base file structure

- [x] set up database and table structure
    - [x] create database
    - [x] create tables
        - [x] movies table
            - info needed: id, name, genre_id, ,run_time, release_date 
        - [x] genres table
            - info needed: id, name
- [x] JOINS: movies view to get genre name, genres view to get count of movies per                 genre

- [x] source needed files in to index.html

- [x] set up client side config and routing

- [x] build html for each view

- [x] set up get and post routes

- [x] set up delete routes

- [] source pictures from google search