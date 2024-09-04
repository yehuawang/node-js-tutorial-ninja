const express = require('express');
const morgan = require('morgan'); //morgan is a middleware that logs information about the request to the console

// express app
const app = express();


// register view engine
app.set('view engine', 'ejs');
    // app.set('views', 'name-of-your-folder'); //default is views



// listen for requests
app.listen(3000);




// middleware
// app.use((req, res, next) => {
//     console.log('new request made:');
//     console.log('host:', req.hostname);
//     console.log('path', req.path);
//     console.log('method', req.method);
//     next(); //next() is a function that we call when we are done with the middleware and we want to move on to the next middleware
// });

// app.use((req, res, next) => {
//     console.log('in the next middleware');
//     next();
// });


// middleware & static files
app.use(express.static('public')); //this will serve static files from the public folder
app.use(morgan('dev'));


app.get('/', (req, res) => {
    //res.send('<p>home page</p>');
    //res.sendFile('./views/index.html', { root: __dirname }); //by default will look for absolute path, you need to set the root of this project

    const blogs = [
        { 
            title: 'The Science of Black Holes: Exploring the Unknown', 
            snippet: 'Black holes are one of the most mysterious and fascinating objects in the universe. They are regions of spacetime where gravity is so strong that nothing, not even light, can escape from them.' 
        },
        { 
            title: 'CRISPR: The Future of Genetic Engineering', 
            snippet: 'CRISPR is a revolutionary technology that allows scientists to edit genes with unprecedented precision, speed, and flexibility. It has the potential to transform the fields of medicine, agriculture, and biotechnology.' 
        },
        { 
            title: 'Quantum Computing: The Next Frontier of Information Technology', 
            snippet: 'Quantum computing is a new paradigm of computation that harnesses the laws of quantum mechanics to process information in ways that are impossible with classical computers. It has the potential to revolutionize fields such as cryptography, drug discovery, and artificial intelligence.' 
        }
    ]

    res.render('index', { title: 'Home', blogs: blogs }); //render the index.ejs file
});

app.get('/about', (req, res) => {
    //res.send('<p>about page</p>');
    // res.sendFile('./views/about.html', { root: __dirname });

    res.render('about', { title: 'About' });

});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create New Blog' });
})

// // redirect
// app.get('/about-us', (req, res) => {
//     res.redirect('/about');
// });


// 404 page
    // use use() to create middleware
    // fire for every request regardless the url if the code get down to this and no url match is found
app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', { root: __dirname });
    res.status(404).render('404', { title: '404' });
});