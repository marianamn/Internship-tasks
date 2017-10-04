const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const passport = require('passport');
let User = require('../models/user');

//Register form
router.get('/register', (req, res) => {
    res.render('register');
});

// register user
router.post('/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

    // Get errors
    let errors = req.validationErrors();

    if (errors) {
        res.render('register', {
            errors: errors
        });
    } else {
        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })

        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(newUser.password, salt, (error, hash) => {
                if (error) {
                    console.log(error);
                }

                newUser.password = hash;

                newUser.save((err) => {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        req.flash('success', 'You are now registered and can log in!')
                        res.redirect('/users/login');
                    }
                });
            });
        });
    }
});

// Login form
router.get('/login', (req, res) => {
    res.render('login');
});

// Login process
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/users/login');
});

module.exports = router;