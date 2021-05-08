
var fs = require('fs');

var noteFile = './database/notes.json';

class NoteService{
    constructor() {
        this.notes = {};
        this.init();
    }
    init() {
        this.read().then((data) => {
            if (data.length == 0) {
                console.log('notes file is empty')
            } else {
                this.notes = JSON.parse(data.toString()).notes;
            }
            
        }).catch((err) => {
            console.log('ERROR', err);
        })
    }
    read() {
        return new Promise((resolve, rejects) => {
            fs.readFile(noteFile, function (err, data) {
                if (err) {
                    rejects(err);
                } else {
                    resolve(data);
                }
            })
        })
    }
    write() {
        return new Promise((resolve, rejects) => {
            let buffer = JSON.stringify({ notes: this.notes });
            fs.writeFile(noteFile, buffer, function (err) {
                if (err) {
                    rejects(err);
                } else {
                    resolve('write notes done!')
                }
            })
        })
    }
    addNote(user,title,content) {
        return new Promise((resolve, rejects) => {
            if (typeof this.notes[user] == 'undefined') {
                this.notes[user] = [];
            }
            this.notes[user].push({ title: title, content: content });
            console.log('add Note', this.notes)
            resolve('done');
        }).then(this.write());
    }
    list(user) {
        return new Promise((resolve, rejects) => {
            this.read().then((data) => {
                let notes = JSON.parse(data.toString()).notes;
                resolve(notes[user])
            }).catch((err) => {
                rejects(err);
            })
        })
    }
    updateNote(id, user, title, content) {
        return new Promise((resolve, rejects) => {
            this.notes[user][id].title = title;
            this.notes[user][id].content = content;
            resolve('done');
        }).then(this.write());
    }
    deleteNote(id, user) {
        return new Promise((resolve, rejects) => {
            this.notes[user].splice(id, 1);
            resolve('done');
        }).then(this.write());
    }
}
module.exports = NoteService;