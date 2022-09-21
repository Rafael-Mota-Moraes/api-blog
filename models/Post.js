const { DataTypes, Sequelize } = require("sequelize");
const db = require("../db");

const Post = db.define("post", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imgUrl: {
    defaultValue: "",
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Post;
