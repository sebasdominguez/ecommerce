const db = require("../db");
const S = require("sequelize");
const Product = require("./Product");

class Category extends S.Model {}

Category.init(
  {
    name: {
      type: S.STRING,
    },
  },
  { sequelize: db, modelName: "Category" }
);

//Category.hasMany(Product);

module.exports = Category;
