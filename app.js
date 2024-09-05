const express = require('express');
const morgan = require('morgan'); //morgan is a middleware that logs information about the request to the console
const mongoose = require('mongoose'); //mongoose is a library that makes it easier to work with MongoDB
const blogRoutes = require('./routes/blogRoutes');

// express app
const app = express();

// connect to mongodb
const dbURI = 'mongodb+srv://cangyao:cangyao001719@node-js-cangyao-tuts.ukr5i.mongodb.net/node-js?retryWrites=true&w=majority&appName=node-js-cangyao-tuts';
mongoose.connect(dbURI)
    .then((result) => {
        console.log('connected to db');
        app.listen(3000);
    })
    .catch((err) => console.log(err));

    
// register view engine
app.set('view engine', 'ejs');


// middleware & static files
app.use(express.static('public')); //this will serve static files from the public folder
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


// routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});


// blog routes
app.use('/blogs', blogRoutes); //scope the routes to the /blogs path, the blogRoutes.js does not need to use /blogs, instead can use / for /blogs...


// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});