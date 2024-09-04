const express = require('express');
const morgan = require('morgan'); //morgan is a middleware that logs information about the request to the console
const mongoose = require('mongoose'); //mongoose is a library that makes it easier to work with MongoDB
const Blog = require('./models/blog');

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
app.use(morgan('dev'));


// routes
app.get('/', (req, res) => {
    // const blogs = [
    //     { 
    //         title: 'The Science of Black Holes: Exploring the Unknown', 
    //         snippet: 'Black holes are one of the most mysterious and fascinating objects in the universe. They are regions of spacetime where gravity is so strong that nothing, not even light, can escape from them.' 
    //     },
    //     { 
    //         title: 'CRISPR: The Future of Genetic Engineering', 
    //         snippet: 'CRISPR is a revolutionary technology that allows scientists to edit genes with unprecedented precision, speed, and flexibility. It has the potential to transform the fields of medicine, agriculture, and biotechnology.' 
    //     },
    //     { 
    //         title: 'Quantum Computing: The Next Frontier of Information Technology', 
    //         snippet: 'Quantum computing is a new paradigm of computation that harnesses the laws of quantum mechanics to process information in ways that are impossible with classical computers. It has the potential to revolutionize fields such as cryptography, drug discovery, and artificial intelligence.' 
    //     }
    // ];

    // res.render('index', { title: 'Home', blogs: blogs }); //render the index.ejs file

    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});


// blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 }) //createdAt: -1 newest first
        .then((result) => {
            res.render('index', {
                title: 'All Blogs',
                blogs: result
            })
        })
        .catch((err) => {
            console.log(err);
        });
})
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create New Blog' });
})


// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});