const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req, res) => {
    //lodash

    const num = _.random(0, 20);
    console.log(num);

    const greet = _.once(() => {
        console.log('hello');
    });

    greet(); //_.once(function) makes the function only run once.



    // console.log(req.url, req.method);
    //response headers

    // // set header content type
    // res.setHeader('Content-Type', 'text/plain');

    // // write response
    // res.write('hello, world');

    // //end response
    // res.end();

    // res.setHeader('Content-Type', 'text/html');
    // res.write('<p>hello, world</p>'); //browser will automatically add <html> <head> and <body> tags
    // res.end();

    let path = './views/';
    switch(req.url) {
        case '/':
            path += 'index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path += 'about.html';
            res.statusCode = 200;
            break;
        case '/about-us': //redirect
            res.statusCode = 301;
            res.setHeader('Location', '/about');
            res.end();
            break;
        default:
            path += '404.html';
            res.statusCode = 404;
            break;
    }

    // sending html pages
    res.setHeader('Content-Type', 'text/html');

    fs.readFile(path, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            res.write(data); //read content of the html file then send to browser.
            // can simplify res.write(data); res.end(); into res.end(data); if only data to write.
        }
        res.end();
    });
});

server.listen(3000, 'localhost', () => {
    console.log('listening for requests on port 3000')
});


// use `npm install` to install all dependencies listed the the package.json when you get other people's project from github. You should also gitignore the node_modules folder when you upload your own project.

//看完第五集，明天开始第六集 晚安zzZ