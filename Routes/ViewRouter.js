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
            res.render('home');
        });
        router.post('/login',passport.authenticate('local-login',{
            successRedirect:'/home',
            failureRedirect:'/error'
        }));
        router.post('/signup',passport.authenticate('local-signup',{
            successRedirect:'/',
            failureRedirect:'/error'
        }))
        router.get('/error',(req,res)=>{
            res.send('You are not logged in!');
        })
        
        return router;
    }
    
    
    
}
module.exports = ViewRouter;