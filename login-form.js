var express = require('express');
var app = express();
var cookiesParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');
var router = express.Router();


app.use(cookiesParser());
app.use(session({secret:"This is a secret mesasge",saveUninitialized: true,resave: true}));
var urlencodeParser = bodyParser.urlencoded({ extended: false});

app.get('/', function(req, res){
	res.sendFile( __dirname + "/public/html/"+"index.html");
});

app.get('/login', function(req,res){
	debugger;
	console.log(req.url);
	res.json({"message":"Welcome to Nodejs session"});
});

app.post('/process_login',urlencodeParser, function(req, res){
	sess=req.session;	
	sess.usrname=req.body.usrname;
	res.redirect('/admin');
});
app.get('/admin', function(req, res){
	if(req.session.page_views){
		req.session.page_views++;
		res.send("<h1> Welcome " + req.session.usrname + "</h1><br>"+"<h2>You visited this page " + req.session.page_views + " times</h2>");
	} else{
		req.session.page_views = 1;
		res.send("<h1>Welcome " + req.session.usrname +" to this page for the first time!!");
	}
});

var server = app.listen(9005,'0.0.0.0', function(){
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at htt://%s:%s", host, port)
})