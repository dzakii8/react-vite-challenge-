'use strict';
const bcrypt = require('bcrypt');
let salt = bcrypt.genSaltSync(8)
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Lodging,{
        foreignKey: "authorId",
      })
    }
  }
  User.init({
    userName: DataTypes.STRING,
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      unique : {
        msg : "email is already used"
      },
      validate : {
        notNull : {
          msg : "email is required"
        },
        notEmpty :{
          msg : "email is required"
        },
        isEmail : {
          msg : "email not valid"
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
      notNull : {
          msg : "password is required"
        },
        notEmpty :{
          msg : "password is required"
        },
        len : {
          args : [5],
          msg : "minimum password character is 5"
        }
      }
    },
    role: {
      type : DataTypes.STRING,
      defaultValue : "Staff"
    },
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  })
  User.beforeCreate(async (user, options) => {
    let hashedPassword = bcrypt.hashSync(user.password, salt)
    user.password = hashedPassword;
  });
  return User;
};