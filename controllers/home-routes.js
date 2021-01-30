const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

//set up main homepage route
const router = require('express').Router();

router.get('/', (req, res) => {
//no need to use res.sendFile because of handlebars - res.render performs this action. Connect to the page needed to render 
 Post.findAll({
     attributes: [
         'id',
         'post_url',
         'title',
         'created_at',
     ],
     include: [
         {
             model: Comment,
             attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
             include: {
                 model: User,
                 attributes: ['username']
             }
         },
         {
             model: User,
             attributes: ['username']
         }
     ]
 })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));

        //pass single object into the homepage template
        res.render('homepage', {posts});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login')
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup')
});

router.get('/', (req, res) => {
    console.log(res.session);

})

module.exports = router;