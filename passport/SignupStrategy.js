const { development } = require("../knexfile")
const knex = require('knex')(development);
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('./bcrypt')

module.exports = new LocalStrategy({
    usernameField:'username',
    passwordField:'password',
    passReqToCallback:true
},
    async (req,username,password,done) =>{
        console.log('SIGNUP STRATEGY',req.body,username,password,done)
        try{
            let email = req.body.email;
            let users = await knex('passport_users').where({email:email});
            if(users.length>0){
                return done(null,false,{message:'Email already taken'});
            }
            let hashedPassword = await bcrypt.hashPassword(password);
            const newUser = {
                username:username,
                email:email,
                hash:hashedPassword
            }
            let userId = await knex('passport_users').insert(newUser).returning('id');
            newUser.id = userId[0];
            done(null,newUser);
        }catch(err){
            console.log(err);
        }
    }
)
