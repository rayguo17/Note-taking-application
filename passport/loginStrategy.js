const LocalStrategy = require('passport-local').Strategy;
const development = require('../knexfile').development;
const knex = require('knex')(development);
const bcrypt = require('./bcrypt');

module.exports = new LocalStrategy(
    async (email,password,done)=>{
        try{
            console.log('login strategy',email,password,done);
            let users = await knex('passport_users').where({email:email});
            if(users.length==0){
                return done(null,false,{message:'user does not exist!'})
            }
            let user = users[0];
            console.log('database users',users);
            let result = await bcrypt.checkPassword(password,user.hash);
            if(result){
                return done(null,user);
            }else{
                return done(null,false,{message:'password incorrect!'});
            }
        }catch(err){
            console.log('login',err);
            done(err);
        }
    }
)

