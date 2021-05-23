const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
module.exports = (app)=>{
    const settings = {
        resave:false,
        saveUninitialized:true,
        secret:'supersecret',
        
    }
    app.use(cookieParser());
    app.use(expressSession(settings));
}