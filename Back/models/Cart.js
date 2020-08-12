const db = require("../db");
const S = require("sequelize");
const User = require("./User");

class Cart extends S.Model {}

Cart.init(
  {
    total: {
      type: S.INTEGER,
    },
    adress: {
      type: S.TEXT,
    },
    completed: {
      type: S.BOOLEAN,
      defaultValue: false
    }
  },
  { sequelize: db, modelName: "Cart" }
);

module.exports = Cart;
