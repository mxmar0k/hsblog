//this code established the associations between the sequelize models for
//user, post and comment

const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// this defines the associations between models
User.hasMany(Post, { foreignKey: "user_id" });
User.hasMany(Comment, { foreignKey: "user_id" });

Post.belongsTo(User, { foreignKey: "user_id" });
Post.hasMany(Comment, { foreignKey: "post_id" });

Comment.belongsTo(User, { foreignKey: "user_id" });
Comment.belongsTo(Post, { foreignKey: "post_id" });

module.exports = { User, Post, Comment };
