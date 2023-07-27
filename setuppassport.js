var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

module.exports = function () {
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id)
        .then(user => done(null, user))
        .catch(err => done(err, null));
});


    passport.use('login', new LocalStrategy({
     usernameField: 'email',
     passwordField: 'password',
    }, async function (email, password, done) {
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            return done(null, false, { message: 'No user has that email!' });
        }

        const isMatch = await user.checkPassword(password);
        if (!isMatch) {
            return done(null, false, { message: 'Invalid password.' });
        }

        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));





}