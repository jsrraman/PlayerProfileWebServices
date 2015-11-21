var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

// You can use either of the following two methods to enable CORS

// ******************************************************************
// Method 1 - Manually tweak the response - Not recommended but works
// ******************************************************************
// Note: This below response header appending needs to be at the beginning to enable
// CORS (Cross Origin Resource Sharing for all domains). Otherwise CORS will not be enabled.
// Basically this intercepts the request and add the required header in the response
//app.use(function (req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    next();
//});

// ******************************************************************
// Method 2 - Recommended
// ******************************************************************
// Use npm module 'cors' to enable the CORS for the requests coming from localhost only
var corsOptions = {
    origin: 'http://localhost:4000'
};

app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var baseRoute = require('./routes/index');
var scrapeRoute = require('./routes/scrape');
var playersRoute = require('./routes/players');

app.use('/', baseRoute);
app.use('/scrape', scrapeRoute);
app.use('/players', playersRoute);

// For other undefined paths, catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to users
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
