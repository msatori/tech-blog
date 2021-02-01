const router = require('express').Router();
const { Post, User, Vote, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.session.title,
        body: req.session.body,
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (dbPostData > 0) {
             res.status(200).end();
            }
            else res.status(400).end();
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(dbPostData => {
            if (dbPostData > 0) {
                res.status(200).end();
               }
               else res.status(400).end();
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;