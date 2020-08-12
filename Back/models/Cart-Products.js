const db = require("../db");
const S = require("sequelize");
const User = require("./User");
const Product = require("./Product");

class Cart_Product extends S.Model {}

Cart_Product.init(
  {
    quantity: {
      type: S.INTEGER,
      defaultValue: 1,
    },
  },
  { sequelize: db, modelName: "Cart_Product" }
);


module.exports = Cart_Product;
