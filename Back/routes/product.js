const express = require("express");
const router = express.Router();
const path = require("path");
const { Products, Category } = require("../models/index");
const Sequelize = require("sequelize");
const { info } = require("console");
const Op = Sequelize.Op;

router.post("/", (req, res, next) => {
  console.log("ESTE ES EL BODY", req.body);

  if (req.body.id == 1) {
    //Este ID es para TODAS
    Products.findAll().then((productos) => {
      var productosFiltrados = productos.filter((x) =>
        x.title.toLowerCase().includes(req.body.title.toLowerCase())
      );
      res.status(200).send(productosFiltrados);
    });
  } else {
    Products.findAll().then((productos) => {
      var listaProductos = productos;
      var listaCategorias = [];
      var productosFiltrados = [];
      for (var i = 0; i < listaProductos.length; i++) {
        listaCategorias.push(
          listaProductos[i].getCategories().then((producto) => {
            return producto[0].dataValues.id;
          })
        );
      }

      Promise.all(listaCategorias).then((infoCategorias) => {
        for (var i = 0; i < listaProductos.length; i++) {
          if (infoCategorias[i] == req.body.id) {
            productosFiltrados.push(listaProductos[i]);
          }
        }
        if (req.body.title == "") {
          res.status(200).send(productosFiltrados);
        } else {
          productosFiltrados = productosFiltrados.filter((x) =>
            x.title.toLowerCase().includes(req.body.title.toLowerCase())
          );
          res.status(200).send(productosFiltrados);
        }
      });
    });
  }

  //.catch(()=> res.sendStatus(400))
});


router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  Products.findByPk(id)
    .then((producto) => res.status(200).send(producto))
    .catch(() => {
      res.sendStatus(404);
    });
});

router.post("/create", (req, res, next) => {
  Products.create(req.body).then((product) => {
    product.addCategory(req.body.categoryId)
  }).then(()=>{
    res.status(201).send("Su producto a sido creado exitosamente");
  });
  })

router.put("/:id", (req, res, next) => {
   console.log(req.body)
  Products.update(req.body, {
    returnig: true,
    where: {
      id: req.body.id,
    },
  })
    .then((productos) => {
      console.log(productos)
      res.status(204)
    })
    .catch(() => {
      res.sendStatus(404);
    });
});

router.delete("/delete", (req, res, next) => {
console.log(req.body.source)
  Products.findOne({
    where:{
     id:req.body.source
    }
  })
  .then((product)=>{
    console.log(product)
    product.destroy()
    .then(() => {
      res.status(200).send("Tu productos fue eliminado");
    })
  })
    .catch(() => {
      res.sendStatus(404);
    });
});

router.get("/:title", (req, res, next) => {
  console.log(req.params.title, '<---- titulo')
  Products.findAll({
    where:{
      title:req.params.title
    }
  }).then((products) => {
    var productosFiltrados = products.filter((x) =>
    x.title.toLowerCase().includes(req.body.title.toLowerCase())
  );
    res.send(productosFiltrados);
  })
})
router.get("/", (req, res, next) => [
  Products.findAll().then((products) => {
    var productosReviews = [];
    for (var i = 0; i < products.length; i++) {
      productosReviews.push(products[i].getReviews());
    }

    Promise.all(productosReviews).then((respuesta) => {
      for (var z = 0; z < respuesta.length; z++) {
        if (respuesta[z].length > 0) {
          var rating = [];
          for (var m = 0; m < respuesta[z].length; m++) {
            rating.push(respuesta[z][m].dataValues.stars);
          }
          var promedio = rating.reduce((a, b) => a + b, 0) / rating.length;
          console.log("PRomedio:", promedio);
          products[z].dataValues.rating = promedio;
        } else {
          products[z].dataValues.rating = null;
        }
      }

      res.send(products);
    });
  }),
]);



module.exports = router;
