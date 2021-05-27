const FacebookStrategy = require('passport-facebook').Strategy;
const development = require('../knexfile').development;
const knex = require('knex')(development);
require('dotenv').config();
module.exports = new FacebookStrategy({
    clientID:process.env.FACEBOOK_ID,
        clientSecret:process.env.FACEBOOK_SECRET,
        callbackURL:'/auth/facebook/callback',
        profileFields:['id','email','name','gender','displayName']
},async(accessToken,refreshToken,profile,done)=>{
    console.log('facebook-passport',profile);
    let userResult = await knex('passport_users').where({facebook_id:profile.id});
    if(userResult==0){
        let user = {
            facebook_id:profile.id,
            username:profile.displayName,
            hash:accessToken
        }
        let query = await knex('passport_users').insert(user).returning('id');
        user.id = query[0];
        done(null,user);
    }else{
        done(null,userResult[0]);
    }
})