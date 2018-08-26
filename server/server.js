//variables
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const movieRouter = require('./routes/movieRoutes.router.js');
const genreRouter = require('./routes/genreRoutes.router.js');
const collectionRouter = require('./routes/collectionRoutes.router.js');
const searchRouter = require('./routes/searchRoutes.router.js');

//set up body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//routes
app.use('/movies', movieRouter);
app.use('/genres', genreRouter);
app.use('/collection', collectionRouter);
app.use('/search', searchRouter);

//static files
app.use(express.static('server/public'));

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});