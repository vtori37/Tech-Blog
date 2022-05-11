const { Model, DataTypes } = require('sequelize');
const { Post } = require('.');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  comment_text: {
    type: DataTypes.STRING,
    allowNull: false,
    autoIncrement: true,
    validate: {
      len:[1]
    },
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id'
    }
  },
  post_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'post',
      key: 'id'
    }
  }
});

module.exports = Comment;