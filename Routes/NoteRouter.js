var express = require('express');

class NoteRouter{
     constructor(noteService,userService) {
        this.noteService =  noteService;
        
    }
    router() {
        let router = express.Router();
        //    console.log(this.userService.users);
        
        
        router.get('/notes', this.get.bind(this));
        router.post('/notes', this.post.bind(this));
        router.put('/notes', this.put.bind(this));
        router.delete('/notes', this.delete.bind(this));
        
        
        return router;
    }
    get(req, res) {
        let id = req.session.passport.user.id;
        this.noteService.list(id).then((data)=>{
            let result = {data:data,username:req.session.passport.user.username}
            res.json(result);
        })
    }
    post(req, res) {
        console.log(req.body);
        let title = req.body.title;
        let content = req.body.content;
        let id = req.session.passport.user.id
        console.log('add note',id,title,content);
        this.noteService.addNote(id, title, content);
        res.redirect('/home')
    }
    put(req, res) {
        console.log('put', req.body);
        let title = req.body.title;
        let content = req.body.content;
        let id = req.body.id;
        this.noteService.updateNote(id, title, content).then(() => {
            res.end('');
        })
    }
    delete(req, res) {
        console.log('delete', req.body);
        let id = req.body.id;
        this.noteService.deleteNote(id).then(() => {
            res.end('');
        })
        
    }
}


module.exports = NoteRouter;