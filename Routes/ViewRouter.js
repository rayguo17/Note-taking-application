var express = require('express');
var basicAuth = require('express-basic-auth');

class ViewRouter {
    router() {
        const router = express.Router();
        router.use(express.urlencoded({ extended: false }))
        router.use(express.json())
        router.get('/', (req, res) => {
            res.render('index')
        });
        router.get('/home', (req, res) => {
            console.log('login to home', req.auth)
            res.render('home')
        });
        
        
        return router;
    }
    
    
}
module.exports = ViewRouter;