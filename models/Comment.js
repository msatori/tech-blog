const { Model, Sequelize } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {

}

Comment.init(
    {
        //columns go here
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        comment_text: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        post_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'post',
                key: 'id'
            }
        },
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'comment'
    }
);

module.exports = Comment;