'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Lodging extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Lodging.belongsTo(models.User,{
        foreignKey : "authorId"
      })
      Lodging.belongsTo(models.Type,{
        foreignKey : "typeId"
      })
    }
  }
  Lodging.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "name is required"
        },
        notEmpty :{
          msg : "name is required"
        }
      }
    },
    facility: {
      type : DataTypes.TEXT,
      allowNull : false,
      validate : {
        notNull : {
          msg : "facility is required"
        },
        notEmpty :{
          msg : "facility is required"
        }
      }
    },
    roomCapacity: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : "room capacity is required"
        },
        notEmpty :{
          msg : "room capacity is required"
        }
      }
    },
    imgUrl: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "image url is required"
        },
        notEmpty :{
          msg : "image url is required"
        },
        isUrl : {
          msg : "image url is not valid"
        }
      }
    },
    location: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "location is required"
        },
        notEmpty :{
          msg : "location is required"
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : "price is required"
        },
        notEmpty :{
          msg : "price is required"
        },
        min : {
          args : 100000,
          msg : "minimum price is 100000"
        }
      }
    },
    typeId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : "type is required"
        },
        notEmpty :{
          msg : "type is required"
        },
      }
    },
    authorId: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : "user id is required"
        },
        notEmpty :{
          msg : "user id is required"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Lodging',
  });
  return Lodging;
};