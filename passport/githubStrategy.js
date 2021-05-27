const GithubStrategy = require('passport-github2').Strategy;
const development = require('../knexfile').development;
const knex = require('knex')(development);
require('dotenv').config();
module.exports = new GithubStrategy({
    clientID:process.env.GITHUB_ID,
    clientSecret:process.env.GITHUB_SECRET,
    callbackURL:'/auth/github/callback'
},async(accessToken,refreshToken,profile,done)=>{
    console.log(profile);
    try {
        let userResult = await knex('passport_users').where({github_id:profile.id});
        if(userResult==0){
            let user = {
                username:profile.username,
                github_id:profile.id,
                hash:accessToken
            }
            let query = await knex('passport_users').insert(user).returning('id');
            user.id=query[0];
            done(null,user);
        }else{
            done(null,userResult[0]);
        }
    } catch (error) {
        console.log(error)
    }
})