var express = require('express');
var basicAuth = require('express-basic-auth');
var fs = require('fs');

class NoteRouter{
     constructor(noteService,userService) {
        this.noteService =  noteService;
        this.userService =  userService;
    }
    router() {
        let router = express.Router();
        //    console.log(this.userService.users);
        this.userService.list().then((users) => {
            router.use(basicAuth({
                challenge: true,
                realm: "test",
                users:users
            }))
        }).then(() => {
            router.get('/', (req, res) => {
                console.log(req.auth)
                res.redirect('/api/notes');
            });
            router.get('/notes', this.get.bind(this));
            router.post('/notes', this.post.bind(this));
            router.put('/notes', this.put.bind(this));
            router.delete('/notes', this.delete.bind(this));
        })
        
        
        
        return router;
    }
    get(req, res) {
        //console.log(req.auth);
        this.noteService.list(req.auth.user).then((notes) => {
            console.log(notes);
            res.render('home', { notes:notes,name:req.auth.user });
        })
        //res.end('get notes')
        //return this.noteService.list(req.auth.user)
    }
    post(req, res) {
        console.log(req.body);
        let title = req.body.title;
        let content = req.body.content;
        let user = req.auth.user;
        this.noteService.addNote(user, title, content);
        res.redirect('/api/notes')
    }
    put(req, res) {
        console.log('put', req.body);
        let user = req.auth.user;
        let title = req.body.title;
        let content = req.body.content;
        let id = req.body.id;
        this.noteService.updateNote(id, user, title, content).then(() => {
            res.end('');
        })
        
    }
    delete(req, res) {
        console.log('delete', req.body);
        let user = req.auth.user;
        let id = req.body.id;
        this.noteService.deleteNote(id, user).then(() => {
            res.end('');
        })
        
    }
}


module.exports = NoteRouter;