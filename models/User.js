//this is the sequelize model for users with password

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcryptjs');

class User extends Model {
  // this is the method to check if the provided password matches the stored hashed password
  checkPassword(loginPassword) {
    return bcrypt.compareSync(loginPassword, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      // before creating a new user, hash the password
      async beforeCreate(newUser) {
        newUser.password = await bcrypt.hash(newUser.password, 10);
        return newUser;
      },
      // before updating a user, rehash the password if it has changed
      async beforeUpdate(updatedUser) {
        if (updatedUser.changed('password')) {
          updatedUser.password = await bcrypt.hash(updatedUser.password, 10);
        }
        return updatedUser;
      },
    },
    sequelize,
    timestamps: false,
    modelName: 'User', 
    underscored: true,
    freezeTableName: true,
  }
);

module.exports = User;
