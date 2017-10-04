const express = require('express');
const router = express.Router();
let Article = require('../models/article');

// Load edit form article
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if (err) {
            console.log(err);
        } else {
            res.render('edit-article', {
                title: 'Edit',
                article: article
            });
        }
    });
});

// Update article
router.post('/edit/:id', (req, res) => {
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = { _id: req.params.id };

    Article.update(query, article, (err) => {
        if (err) {
            console.log(err);
            return;
        } else {
            req.flash('success', 'Article updated!')
            res.redirect('/');
        }
    });
});

// Delete article
router.delete('/:id', (req, res) => {
    let query = { _id: req.params.id };

    Article.remove(query, (err) => {
        if (err) {
            console.log(err);
        }

        res.send('Success');
    });
});

// Add route
router.get('/add', ensureAuthenticated, (req, res) => {
    res.render('add-article', {
        title: 'Add article'
    });
});

// Add submit post route
router.post('/add', (req, res) => {
    req.checkBody('title', 'Title is required').notEmpty();
    req.checkBody('author', 'Author is required').notEmpty();
    req.checkBody('body', 'Body is required').notEmpty();

    // Get errors
    let errors = req.validationErrors();

    if (errors) {
        res.render('add-article', {
            title: 'Add article',
            errors: errors
        });
    } else {
        let article = new Article();
        article.title = req.body.title;
        article.author = req.body.author;
        article.body = req.body.body;

        article.save((err) => {
            if (err) {
                console.log(err);
                return;
            } else {
                req.flash('success', 'Article added!')
                res.redirect('/');
            }
        });
    }
});

// Get single article
router.get('/:id', (req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if (err) {
            console.log(err);
        } else {
            res.render('article', {
                article: article
            });
        }
    });
});

// Access control
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        req.flash('danger', 'Please login');
        res.redirect('/users/login');
    }
}

module.exports = router;
