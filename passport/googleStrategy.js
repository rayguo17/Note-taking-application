const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const development = require('../knexfile').development;
const knex = require('knex')(development);
require('dotenv').config();
module.exports = new GoogleStrategy({
    clientID:process.env.GOOGLE_ID,
    clientSecret:process.env.GOOGLE_SECRET,
    callbackURL:'/auth/google/callback'
},async(accessToken,refreshToken,profile,done)=>{
    console.log('google-login',profile);
    try{
        let userResult = await knex('passport_users').where({gmail_id:profile.id});
    if(userResult==0){
        let user = {
            gmail_id:profile.id,
            username:profile.displayName,
            hash:accessToken
        }
        let query = await knex('passport_users').insert(user).returning('id');
        user.id = query[0];
        done(null,user);
    }else{
        done(null,userResult[0]);
    }
     
    }catch(err){
        console.log(err);
    }
    
})