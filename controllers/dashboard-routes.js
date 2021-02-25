const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

// get all posts for dashboard
router.get('/', withAuth, (req, res) => {
  console.log(req.session);
  console.log('======================');
  Post.findAll({
    where: {
      userId: req.session.userId
    }
  })
    .then(dbPostData => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      
      res.render("all-posts-admin", {
        layout: "dashboard",
        posts
      });
    })
    .catch(err => {
      console.log(err);
      res.redirect("login");
    });
});

//create a new post
router.get('/new', withAuth, ( req, res ) => {
  res.render("create-post", {
    layout: 'dashboard'
  });
});


//edit existing post by id
router.get('/edit/:id', withAuth, (req, res) => {
  Post.findByPk(req.params.id) 
    .then(dbPostData => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        
        res.render('edit-post', {
          layout: 'dashboard',
          post
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
