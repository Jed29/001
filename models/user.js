'use strict';
const {hashPassword} = require('../helpers/bcrypt')
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
      User.hasOne(models.Article)
    }
  };
  User.init({
    email: {type:DataTypes.STRING,
    validate:{
      isEmail:{
        args:true,
        msg:"Please input e-mail format"
      },
      notEmpty:{
        msg:"E-mail cannot be empty"
      }
    }},
    username: {type:DataTypes.STRING,
    validate:{
      notEmpty:{
        msg:"username cannot be empty"
      }
    }},
    password: {type:DataTypes.STRING,
    validate:{
      notEmpty:{
        msg:"Password cannot be empty"
      },
      len:{
        args:5,
        msg:"password must be 5 characters or more"
      }
    }},
    name: {type:DataTypes.STRING,
    validate:{
      notEmpty:{
        msg:"Name Cannot be Empty"
      }
    }},
    address: {type:DataTypes.STRING,
    validate:{
      notEmpty:{
        msg:"address Cannot be Empty"
      }
    }},
    role: {type:DataTypes.STRING},
    avatarURL:DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User', 
  });

  User.addHook('beforeCreate', (instance,option)=>{
    instance.password = hashPassword(instance.password) 
  })
  return User;
};