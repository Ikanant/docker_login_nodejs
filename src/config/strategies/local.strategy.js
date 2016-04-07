var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

const low = require('lowdb');
const storage = require('lowdb/file-sync');
const db = low('src/data/users.json', {storage: storage});

module.exports = function () {
    passport.use(new LocalStrategy({
            usernameField: 'userName',
            passwordField: 'password'
        },
        function (username, password, done) {
            var foundUser = db('users').find({email: username});
            if(foundUser != null && foundUser.password === password){
                done(null, foundUser);
            }
            else {
                done(null, false, {message: 'User not found'});
            }
        }
    ));
};