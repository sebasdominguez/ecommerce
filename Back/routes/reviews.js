const express = require("express");

const { User } = require("../models/index");
const { Products } = require("../models/index");

const { Review } = require("../models/index");

const router = express.Router();

router.get("/:idProducto", (req, res, next) => {
  const id = req.params.idProducto;
  Review.findAll({
    where: {
      ProductId: id,
    },
  }).then((ProductReviews) => {
    console.log("Estas son las review del Producto", ProductReviews);
    res.status(200).send(ProductReviews);
  });

  //Aca obtengo todas las reviews;
  //Se las envio al usuario;
});

router.post("/:idProducto", (req, res, next) => {
  console.log("Los datos en el backend son:", req.body, req.params.idProducto);
  User.findByPk(req.body.idUser).then((user) => {
    Review.create({
      review: req.body.commentUser,
      stars: req.body.ratingUser,
      username: user.name,
    }).then((review) => {
      review.setProduct(req.params.idProducto).then(() => {
        User.findByPk(req.body.idUser).then((user) => {
          user.addReview(review.id).then(() => {
            Products.findByPk(req.params.idProducto).then((producto) => {
              producto.getReviews().then((reviews) => {
                res.status(200).send(reviews);
              });
            });
          });
        });
      });
    });
  });

  /*
{idUser: 4, mensaje: "Muy buena birra", estrellas:3}
    */
  //Setear las estrellas
  //Setear el texto
});

module.exports = router;
