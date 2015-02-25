var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hbs = require('hbs');
var mongoose = require('mongoose');
var methodOverride = require('method-override');

var routes = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// partials setup
hbs.registerPartials(path.join(__dirname, 'views/partials'));


// mongoose setup
app.configure('development', function() {
    mongoose.connect('mongodb://localhost/expresscms', function(err) {
       (err) ?  console.log('database connection error', err) : console.log('database connection successful');
    });
});

app.configure('production', function() {
    mongoose.connect('mongodb://' + process.env.MONGOLAB_URI + '/expresscms', function(err) {
       (err) ?  console.log('database connection error', err) : console.log('database connection successful');
    });
});


// method-override setup
app.use(methodOverride('_method'));


// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/admin', admin);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


// error handlers

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


module.exports = app;