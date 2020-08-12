const express = require("express");
const router = express.Router();
const { Category, Products } = require("../models/index");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/", (req, res, next) => {
  Category.findAll().then((categorys) => {
    var sinRepeticion = [];
    for (var i = 0; i < categorys.length; i++) {
      if (!sinRepeticion.includes(categorys[i].name)) {
        sinRepeticion.push(categorys[i]);
      }
    }
    res.status(200).send(sinRepeticion);
  });
});

router.post("/", (req, res, next) => {
  console.log("Me llego esto:", req.body);
  if (req.body.name != "") {
    Category.create({
      name: req.body.name,
    }).then(() => {
      Category.findAll().then((categorys) => {
        var sinRepeticion = [];
        for (var i = 0; i < categorys.length; i++) {
          if (!sinRepeticion.includes(categorys[i].name)) {
            sinRepeticion.push(categorys[i]);
          }
        }
        res.status(200).send(sinRepeticion);
        /* var arrayAFiltrar = [];
        var sinRepeticion = [];
        var filtradoConProductos = [];
        console.log("Categorys:", categorys);
        for (var i = 0; i < categorys.length; i++) {
          filtradoConProductos.push(categorys[i].countProducts());
        }
  
        Promise.all(filtradoConProductos).then((respuesta) => {
          for (var i = 0; i < respuesta.length; i++) {
            if (respuesta[i] != 0) {
              arrayAFiltrar.push(categorys[i]);
            }
          }
  
          for (var i = 0; i < arrayAFiltrar.length; i++) {
            if (!sinRepeticion.includes(arrayAFiltrar[i].name)) {
              sinRepeticion.push(arrayAFiltrar[i]);
            }
          }
  
          console.log("Filtrado con productos:", sinRepeticion);
          res.status(200).send(sinRepeticion);
        }); */
      });
    });
  } else {
    Category.findAll().then((categorys) => {
      var sinRepeticion = [];
      for (var i = 0; i < categorys.length; i++) {
        if (!sinRepeticion.includes(categorys[i].name)) {
          sinRepeticion.push(categorys[i]);
        }
      }
      res.status(200).send(sinRepeticion);
    });
  }
});

router.delete("/", (req, res, next) => {
  //name en req.body.source
  Category.findAll({
    where: {
      name: req.body.source,
    },
  }).then((listaCategorias) => {
    console.log("Lista categorias:", listaCategorias);

    listaCategorias[0].getProducts().then((productosAfectados) => {
      var productosAModificar = [];
      for (var i = 0; i < productosAfectados.length; i++) {
        productosAModificar.push(productosAfectados[i].addCategories(1));
      }

      Promise.all(productosAModificar).then(() => {
        listaCategorias[0].destroy().then(() => {
          res.send("ok");
        });
      });
    });
  });
  console.log("Req body:", req.body);
});

module.exports = router;
