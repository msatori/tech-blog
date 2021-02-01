const { Model, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

// create our Post model
class Post extends Model {}

// create fields/columns for Post model
Post.init(
  {
    
      title: Sequelize.STRING,
      body: Sequelize.STRING
    },
    {
        sequelize
    }

);

module.exports = Post;