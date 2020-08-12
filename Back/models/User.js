const db = require("../db");
const S = require("sequelize");
const Review = require("./Review");
const crypto = require("crypto");

class User extends S.Model {}

User.init(
  {
    email: {
      type: S.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: S.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    isAdmin: {
      type: S.BOOLEAN,
      defaultValue: false,
    },
    salt: {
      type: S.STRING,
    },
    name: {
      type: S.STRING,
      allowNull: false,
    },
    adress: {
      type: S.TEXT,
      allowNull: false,
    },
  },
  { sequelize: db, modelName: "User" }
);

User.addHook("beforeCreate", (user) => {
  user.salt = crypto.randomBytes(20).toString("hex");
  user.password = user.hashPassword(user.password);
});

User.prototype.hashPassword = function (password) {
  return crypto.createHmac("sha1", this.salt).update(password).digest("hex");
};

User.prototype.validPassword = function (password) {
  return this.password === this.hashPassword(password);
};

module.exports = User;
