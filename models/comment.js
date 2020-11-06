'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Post);
    }
  };
  Comment.init({
    author: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.TEXT
    },
    approved: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};