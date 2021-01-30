const { Model, Datatypes, Sequelize, } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

//create User model
class User extends Model { 
    //sset up method to run on instance data (per user) to check password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

//define table columns and configuration
User.init(
    {
        id: {
            //define id colu,n
            type: Sequelize.INTEGER,
            //make sure input is here
            allowNull: false,
            //instruct that this is the primary key
            primaryKey: true,
            //turn on auto increment
            autoIncrement: true
        },

        //define username column
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        //define email column
       email: {
            type: Sequelize.STRING, 
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        //define password column
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                //validate that password is longer than 6 characters
                len: [4]
            }
        }
    },
    {
        hooks: {
          // set up beforeCreate lifecycle "hook" functionality
          async beforeCreate(newUserData) {
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
          },
    
          async beforeUpdate(updatedUserData) {
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
          }
        },
    
        //pass in imported sequelize connection 
        sequelize,
        //do not automatically create timestamp fields for createdAt or updatedAt
        timestamps: false,
        //do not pluralize name of database table
        freezeTableName: true,
        //use underscores instead of camel case
        underscored: true,
        //make model name stay lowercase in db
        modelName: 'user'
    }
);

module.exports = User;