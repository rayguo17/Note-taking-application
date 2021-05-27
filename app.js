var express = require('express');
var hb = require('express-handlebars');
var basicAuth = require('express-basic-auth');
const ViewRouter = require('./Routes/ViewRouter');
const UserRouter = require('./Routes/UserRouter');
const UserService = require('./Service/UserService');
const NoteService = require('./Service/NoteService');
const NoteRouter = require('./Routes/NoteRouter');
const setupSession = require('./util/init-session');
const passport = require('./passport/index');
const development = require('./knexfile').development;
const knex = require('knex')(development);
const redis = require('redis');
const io = require('socket.io')();
const http = require('http');


const redisClient = redis.createClient({
    host:'127.0.0.1',
    port:6379
})
var app = express();
let port = 8000;

//setup handlebars
app.engine('handlebars', hb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//set up session and cookie
setupSession(app,io,redisClient);

//set up passport
app.use(passport.initialize());
app.use(passport.session());

//setup static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))
app.use(express.json());


//router

var noteService = new NoteService(knex);
app.use('/', new ViewRouter().router());
// app.use('/users', new UserRouter(userService).router());
app.use('/api', new NoteRouter(noteService).router());


var server = http.createServer(app);
io.attach(server);
io.on('connection',function(socket){
    console.log('a user join us');
    console.log('socket session',socket.session)
})


server.listen(port, () => {
    console.log(`server running at port ${port}`);
})

