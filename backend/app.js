var express = require('express'),
    path = require('path'),
    routes = require('./routes');
    //mongoose = require('mongoose');


//create our express app
var app = express();

//add some standard express middleware
app.configure(function() {
    app.use(express.logger('dev')); /* 'default', 'short', 'tiny', 'dev' */
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    app.use(express.static('static'));
    app.use(express.static(path.join(__dirname, '../frontend')));
});

app.set('port', process.env.PORT || 3000);

//routes
app.get('/api/getcars', routes.getCars);
app.get('*', routes.index);



//have our app listen on port 3000
app.listen(3000);
console.log('Your app is now running at: http://127.0.0.1:3000/');