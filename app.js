'use strict';

var express         = require('express');
var path            = require('path');
var logger          = require('morgan');
var cookieParser    = require('cookie-parser');
var bodyParser      = require('body-parser');
var compress        = require('compression');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(compress());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/app/public')));
app.set('views', __dirname + '/app/server/views');
app.set('view engine', 'jade');
// 
// 
var routes = require('./app/server/routes/index');
app.use('/', routes);

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

// 
// 
// if(process.argv[2] == 'dev') {
//     global.process.env.NODE_ENV = 'dev';        
// } else if(process.argv[2] == 'tecpro') {
//     global.process.env.NODE_ENV = 'tecpro';     
// } else if(process.argv[2] == 'prod') {
//     global.process.env.NODE_ENV = 'prod';       
// } else {
//     global.process.env.NODE_ENV = 'dev';
// }





module.exports = app;
