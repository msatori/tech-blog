const { Model, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {

}

Comment.init(
    {
        //columns go here
        body: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
    },
    {
        sequelize,
    }
);

module.exports = Comment;