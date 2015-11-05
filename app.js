'use strict';

//Dependencias
var express = require('express');
var path = require('path');
var favicon = require('static-favicon');

//Initizliza express aplication
var app = express();

//Body parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//logger
var logger = require('morgan');
app.use(logger('dev'));

//cookies  / sesion 
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// view engine setup
var exphbs = require('express-handlebars');

//stylus setup
var stylus=require('stylus');
var nib=require('nib');

// Handlebars setup
app.engine('.hbs',exphbs({
    extname:'.hbs',
    defaultLayout:'main',
    layoutDir: __dirname + '/views/layouts',
    partialDir: __dirname + '/views/partials'
}));

//view engine setup
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.set('view engine', '.hbs');
app.use(express.static(path.join(__dirname,'public')));

//app.use(favicon());
//Routes
var home = require('./routes/home');
var users = require('./routes/users');

app.use('/', home);
app.use('/users', users);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


if (!!module.parent) {
  module.exports = app;
} else {
  app.listen(3000);
}


