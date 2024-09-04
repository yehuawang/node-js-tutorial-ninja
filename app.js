const express = require('express');

// express app
const app = express();


// listen for requests
app.listen(3000);

app.get('/', (req, res) => {
    //res.send('<p>home page</p>');
    res.sendFile('./views/index.html', { root: __dirname }); //by default will look for absolute path, you need to set the root of this project
});

app.get('/about', (req, res) => {
    //res.send('<p>about page</p>');
    res.sendFile('./views/about.html', { root: __dirname });

});


// redirect
app.get('/about-us', (req, res) => {
    res.redirect('/about');
});


// 404 page
    // use use() to create middleware
    // fire for every request regardless the url if the code get down to this and no url match is found
app.use((req, res) => {
    res.status(404).sendFile('./views/404.html', { root: __dirname });
})