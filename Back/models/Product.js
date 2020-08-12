const db = require("../db");
const S = require("sequelize");
const Review = require("./Review");
const Category = require("./Category");

class Product extends S.Model {}

Product.init(
  {
    /*  category_id: {
      type: S.STRING,
      references: {
        model: Category,
        key: "id",
      },
    }, */
    title: {
      type: S.STRING,
      allowNull: false,
    },
    picture: {
      type: S.STRING,
    },
    price: {
      type: S.INTEGER,
    },
    description: {
      type: S.TEXT
    }
  },
  { sequelize: db, modelName: "Product" }
);

//Product.hasMany(Review);
//Product.hasOne(Category);

module.exports = Product;
