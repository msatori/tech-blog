const { Model, Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {

}

Comment.init(
    {
        //columns go here
        body: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
    }
);

module.exports = Comment;