// import all models
const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');

// create associations
Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete:'CASCADE'
});


Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete:'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete:'CASCADE'
});


module.exports = { User, Post, Comment };