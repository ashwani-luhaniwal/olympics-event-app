// load environment variables
require('dotenv').config();

// grab our dependencies
const express       = require('express'),
    app             = express(),
    port            = process.env.PORT || 8080,
    path            = require('path'),
    expressLayouts  = require('express-ejs-layouts'),
    mongoose        = require('mongoose'),
    bodyParser      = require('body-parser'),
    expressValidaor = require('express-validator'),
    session         = require('express-session'),
    cookieParser    = require('cookie-parser'),
    flash           = require('connect-flash');

// configure our application ======================
// set sessions and cookie parser
app.use(cookieParser());
app.use(session({
    secret: process.env.SECRET,
    cookie: { maxAge: 60000 },
    resave: false,              // forces the session to be saved back to the store
    saveUninitialized: false    // dont save unmodified
}));
app.use(flash());

// tell express where to look for static assets
app.use(express.static(path.join(__dirname, '/public')));

// use body parser to grab info from a form
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidaor()); // this line must be immediately after express.bodyParser()!

// set ejs as our templating engine
app.set('view engine', 'ejs');
app.use(expressLayouts);

// set the routes
app.use(require('./app/routes'));

// connect our database
mongoose.connect(process.env.DB_URI);

// start our server
app.listen(port, () => {
    console.log(`App listening on http://localhost:${port}`);
});