var express = require('express');
const passport = require('passport');

const isLoggedIn = require('../util/guard');
class ViewRouter {
    router() {
        const router = express.Router();
        router.use(express.urlencoded({ extended: false }))
        router.use(express.json())
        router.get('/', (req, res) => {
            res.render('index')
        });
        router.get('/home', isLoggedIn,(req, res) => {
            //console.log('login to home', req.auth)
            //console.log('request',req.signedCookies);
            // res.cookie('testCookie','thisistest',{
            //     signed:true,
            //     secure:false,
            //     maxAge:1000*60*5,
            //     httpOnly:true
            // })
            res.render('home');
        });
        router.post('/login',passport.authenticate('local-login',{
            successRedirect:'/home',
            failureRedirect:'/error'
        }));
        router.post('/signup',passport.authenticate('local-signup',{
            successRedirect:'/home',
            failureRedirect:'/error'
        }))
        router.get('/logout',(req,res)=>{
            //console.log('i am logging out')
            req.logout();
            res.redirect('/');
        })
        router.get('/auth/facebook',passport.authenticate('facebook-login',{scope:["email"]}));
        router.get('/auth/facebook/callback',passport.authenticate('facebook-login',{
            successRedirect:'/home',
            failureRedirect:'/error'
        }))
        router.get('/auth/google',passport.authenticate('google-login',{scope:['https://www.googleapis.com/auth/plus.login']}));
        router.get('/auth/google/callback',passport.authenticate('google-login',{
            successRedirect:'/home',
            failureRedirect:'/error'
        }))
        router.get('/auth/github',passport.authenticate('github-login',{scope:['user:email']}));
        router.get('/auth/github/callback',passport.authenticate('github-login',{
            failureRedirect:'/error',
            successRedirect:'/home'
        }))
        router.get('/error',(req,res)=>{
            res.send('You are not logged in!');
        })
        router.get('/login',(req,res)=>{
            res.render('login');
        })
        return router;
    }
    
    
    
}
module.exports = ViewRouter;