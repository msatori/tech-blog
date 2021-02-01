const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/', withAuth, (req, res) => {
    Comment.create({
        comment_text: req.session.comment_text,
        user_id: req.session.user_id,
        post_id: req.session.post_id
    })
    .then(dbCommentData => res.json(dbCommentData))
    .catch(err => {
        console.log(err);
        res.status(400).json(err);
    });
});


module.exports = router;