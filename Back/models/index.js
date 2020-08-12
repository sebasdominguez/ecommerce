//const sequelize = require('sequelize')
const Cart = require("./Cart");
const CartProducts = require("./Cart-Products");
const Category = require("./Category");
const Products = require("./Product");
const Review = require("./Review");
const User = require("./User");
const Product = require("./Product");

Product.hasMany(Review);
Review.belongsTo(Product);

Review.belongsTo(User);
User.hasMany(Review);

//movie.belongsTo(Genre) en la tabla movie genera columna genre_id

Product.belongsToMany(Category, {
  through: "Product_Category",
});
Category.belongsToMany(Product, { through: "Product_Category" });

Cart.belongsToMany(Product, { through: "Cart_Product" });

Cart.belongsTo(User);Cart.belongsTo(User);

module.exports = { Cart, CartProducts, Category, Products, Review, User };
