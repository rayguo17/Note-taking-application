const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const RedisStore = require('connect-redis')(expressSession);
const socketIOSession = require('socket.io.session');

module.exports = (app,io,redisClient)=>{
    const sessionStore = new RedisStore({
        client: redisClient,
        unset:'destroy'
    })
    const settings = {
        resave:false,
        saveUninitialized:true,
        secret:'gusdapperton',
        store:sessionStore,
        cookie:{'path':'/',"httpOnly":true,'secure':false,'maxAge':60*1000*60*5,signed:true}
        
    }
    app.use(cookieParser('gusdapperton'));
    io.use(socketIOSession(settings).parser);
    app.use(expressSession(settings));
}