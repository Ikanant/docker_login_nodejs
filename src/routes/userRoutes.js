var express = require('express');

const low = require('lowdb');
const storage = require('lowdb/file-sync');
const db = low('src/data/users.json', {storage: storage});

var userRouter = express.Router();

var router = function(nav){
    userRouter.use( function(req, res, next){
        if(!req.user) {
            res.redirect('/');
        }
        next();
    });

    userRouter.route('/')
        .get(function (req, res) {
            var foundUser = req.user;

            if(foundUser!=null){
                res.render('userView', {
                    title: 'Profile',
                    nav: nav,
                    user: foundUser
                });
            }
        });

    userRouter.route('/edit')
        .get(function (req, res) {
            var foundUser = req.user;

            if(foundUser!=null){
                res.render('editUserView', {
                    title: 'Profile',
                    nav: nav,
                    user: foundUser
                });
            }
        })
        .post(function (req, res) {
            if(req.body.submit.valueOf() === 'cancel'){
                res.redirect('/User');
            }
            else if(req.body.submit.valueOf() === 'save') {
                var company = req.body.company;
                var email = req.body.email;
                var phone = req.body.phone;
                var address = req.body.address;
                var age = req.body.age;
                var eyeColor = req.body.eyecolor;
                var password = req.body.password;

                db('users')
                    .chain()
                    .find({_id: req.user._id})
                    .assign({company: company, email: email, phone: phone,
                    address: address, age: age, eyeColor: eyeColor, password: password})
                    .value();

                req.user.company = company;
                req.user.email = email;
                req.user.phone = phone;
                req.user.address = address;
                req.user.age = age;
                req.user.eyeColor = eyeColor;
                req.user.password = password;

                res.redirect('/User');
            }
        });

    return userRouter;
};

module.exports = router;