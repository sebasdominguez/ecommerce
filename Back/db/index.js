const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/tomate1', {logging: false});

module.exports = db;



