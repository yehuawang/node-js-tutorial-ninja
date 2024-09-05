const express = require('express');
const morgan = require('morgan'); //morgan is a middleware that logs information about the request to the console
const mongoose = require('mongoose'); //mongoose is a library that makes it easier to work with MongoDB
const Blog = require('./models/blog');
const { result } = require('lodash');

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

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create New Blog' });
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
});

// POST handler
app.post('/blogs', (req, res) => {  
    const blog = new Blog(req.body);
    blog.save()
        .then((result) => {
            res.redirect('/blogs');
        })
        .catch((err) => {
            console.log(err);
        })
});

// GET specific blog
app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then((result) => {
            res.render('details', { blog: result, title: 'Blog Details' });
        }) 
        .catch((err) => {
            console.log(err);
        });
});

// DELETE request handler

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch((err) => {
            console.log(err);
        });
});






// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});