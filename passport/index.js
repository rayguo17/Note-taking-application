const passport = require('passport');
const localLogin = require('./loginStrategy');
const localSignup = require('./SignupStrategy');
const serializeUser = require('./serializeDeserializeUser').serializeUser;
const deserializeUser = require('./serializeDeserializeUser').deserializeUser;
const facebookLogin = require('./facebookStrategy');
const googleLogin = require('./googleStrategy');
const githubLogin = require('./githubStrategy')

passport.use('local-login',localLogin);
passport.use('local-signup',localSignup);
passport.use('facebook-login',facebookLogin);
passport.use('google-login',googleLogin);
passport.use('github-login',githubLogin);
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

module.exports = passport;

