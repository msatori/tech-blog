const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

const router = require('express').Router();

//set up main homepage route
router.get('/', (req, res) => {
    //no need to use res.sendFile because of handlebars - res.render performs this action. Connect to the page needed to render 
    Post.findAll({
        include: [
            User
        ]
    })
        .then(dbPostData => {
            const posts = dbPostData.map(post => post.get({ plain: true }));

            //pass single object into the homepage template
            res.render('all-posts', { posts });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//get a sngle post by id
router.get("/post/:id", (req, res) => {
    Post.findByPk(req.params.id, {
        include: [
            User,
            {
                model: Comment,
            },
        ],
    })
        .then((dbPostData) => {
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });

                res.render("single-post", { post });
            } else {
                res.status(404).end();
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        });
})

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