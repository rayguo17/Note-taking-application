var express = require('express');
var hb = require('express-handlebars');
var basicAuth = require('express-basic-auth');
const ViewRouter = require('./Routes/ViewRouter');
const UserRouter = require('./Routes/UserRouter');
const UserService = require('./Service/UserService');
const NoteService = require('./Service/NoteService');
const NoteRouter = require('./Routes/NoteRouter');


var app = express();
let port = 8000;

//setup handlebars
app.engine('handlebars', hb({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//setup static files
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))


//router
var userService = new UserService();
var noteService = new NoteService();
app.use('/', new ViewRouter().router());
app.use('/users', new UserRouter(userService).router());
app.use('/api', new NoteRouter(noteService,userService).router());





app.listen(port, () => {
    console.log(`server running at port ${port}`);
})

