const passport = require('passport');
const localLogin = require('./loginStrategy');
const localSignup = require('./SignupStrategy');
const serializeUser = require('./serializeDeserializeUser').serializeUser;
const deserializeUser = require('./serializeDeserializeUser').deserializeUser;

passport.use('local-login',localLogin);
passport.use('local-signup',localSignup);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

module.exports = passport;

