var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

var nav = require('./src/config/navigationBar');
var userRouter = require('./src/routes/userRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')();;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(cookieParser());
app.use(session({secret: 'library'})) // Secret can be anything
require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/User', userRouter);
app.use('/Auth', authRouter);


app.get('/', function(req, res){
    res.render('index', {title: 'ACME Financials', nav: {Link:'User', Text:'Account'}});
});
app.get('/Logout', function(req, res){
    req.logout();
    res.redirect('/');
});


app.listen(8080, function(){
	console.log('Listening to port 8080');
});
module.exports.getApp = app;
