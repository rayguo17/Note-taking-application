




class NoteService{
    constructor(knex) {
        
        this.knex = knex
    }
    addNote(id,title,content) {
        console.log('note service',id,title,content);
        return this.knex('notes').insert({title:title,user_id:id,content:content}).catch((err)=>{
            console.log(err);
        })
    }
    list(user_id) {
        return this.knex('notes').where({user_id:user_id}).select('*').then((data)=>{
            //console.log('note service',data);
            return data;
        })
    }
    updateNote(id, title, content) {
        return this.knex('notes').update({title:title,content:content}).where({id:id})
    }
    deleteNote(id) {
        return this.knex('notes').where({id:id}).delete();
    }
}
module.exports = NoteService;