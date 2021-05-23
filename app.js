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

var app = express();
let port = 8000;

//setup handlebars
app.engine('handlebars', hb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//set up session and cookie
setupSession(app);

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





app.listen(port, () => {
    console.log(`server running at port ${port}`);
})

