var express = require('express');
var basicAuth = require('express-basic-auth');

class UserRouter {
    constructor(userService) {
        this.userService = userService;
    }
    router() {
        const router = express.Router();
        router.use(express.urlencoded({ extended: false }))
        router.use(express.json())
        //console.log('UserRouter router',this.userService.users)
        router.post('/', this.post.bind(this));
        return router;
    }
    post(req, res) {
        console.log(req.body);
        let username = req.body.username;
        let password = req.body.password;
        this.userService.newUser(username, password).then(() => {
            console.log('add user success');
            res.redirect('/');
        })
        
    }
}
module.exports = UserRouter;