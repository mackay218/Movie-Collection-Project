# Movie-Collection-Project

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
- [] JOINS: movies view to get genre name, genres view to get count of movies per                 genre

- [] source needed files in to index.html

- [x] set up client side config and routing

- [] build html for each view

- [] set up get and post routes

- [] set up delete routes

- [] source pictures from google search