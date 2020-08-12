const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

const { Cart, CartProducts, User, Products } = require("../models/index");
const { sequelize } = require("../models/User");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tomateunabirraoficial@gmail.com",
    pass: "TomateUna2020",
  },
});

router.post("/", (req, res) => {
  Cart.findOne({
    where: {
      UserId: req.body.UserId,
      completed: false,
    },
  }).then((cart) => {
    if (!cart) {
      Cart.create({
        total: req.body.total,
        adress: req.body.adress,
      }).then((createdCart) => {
        createdCart.setUser(req.body.UserId);
        CartProducts.create({
          quantity: req.body.quantity,
          CartId: createdCart.id,
          ProductId: req.body.ProductId,
        }).then(() => res.sendStatus(200));
      });
    } else {
      cart.total = req.body.total;
      cart.adress = req.body.adress;
      cart.save();
      CartProducts.findOne({
        where: {
          CartId: cart.id,
          ProductId: req.body.ProductId,
        },
      }).then((cartProducts) => {
        if (cartProducts) {
          if (req.body.quantity === 0) {
            cartProducts.destroy().then(() => res.sendStatus(201));
          }
          cartProducts
            .update({
              quantity: req.body.quantity,
              CartId: cart.id,
              ProductId: req.body.ProductId,
            })
            .then(() => res.sendStatus(200));
        } else {
          CartProducts.create({
            quantity: req.body.quantity,
            CartId: cart.id,
            ProductId: req.body.ProductId,
          }).then(() => res.sendStatus(200));
        }
      });
    }
  });
});

router.get("/orders/:idOrder/:idUser", (req, res, next) => {
  CartProducts.findAll({
    where: {
      CartId: req.params.idOrder,
    },
  }).then((order) => {
    var orden = order;
    console.log("Order:", order);
    var productos = [];
    for (var i = 0; i < order.length; i++) {
      productos.push(Products.findByPk(order[i].ProductId));
    }

    Promise.all(productos).then((listaProductos) => {
      var arrayQuantity = [];
      var data = [];
      for (var j = 0; j < listaProductos.length; j++) {
        arrayQuantity.push(orden[j].quantity);
      }

      var arrayConTodaLaData = [];

      for (var z = 0; z < listaProductos.length; z++) {
        var obj = new Object();
        obj.data = listaProductos[z];
        obj.quantity = arrayQuantity[z];
        arrayConTodaLaData.push(obj);
      }

      data[0] = arrayConTodaLaData;

      User.findByPk(req.params.idUser).then((user) => {
        data[1] = user;
        res.send(data);
      });
    });
  });
});

router.get("/orders", (req, res, next) => {
  Cart.findAll({
    where: {
      completed: true,
    },
  }).then((orders) => {
    res.send(orders);
    /*   var arrayProductos = [];
    for (var i = 0; i < orders.length; i++) {
      arrayProductos.push(
        CartProducts.findAll({
          where: {
            CartId: orders[i].id,
          },
        })
      );
      arrayProductos[i].total = orders[i].total;
    }

    Promise.all(arrayProductos).then((listaDeProductos) => {
      res.send(listaDeProductos);
    }); */
  });
});

router.post("/orders", (req, res) => {
  let pastOrders = new Array();
  Cart.findAll({
    where: {
      UserId: req.body.UserId,
      completed: true,
    },
  }).then((userCarts) => {
    let carts = new Array();
    for (let i = 0; i < userCarts.length; i++) {
      let p = {
        id: userCarts[i].id,
        total: userCarts[i].total,
        date: userCarts[i].updatedAt,
        Products: [],
      };
      pastOrders.push(p);
      carts.push(
        CartProducts.findAll({
          where: {
            CartId: userCarts[i].id,
          },
        })
      );
    }
    Promise.all(carts).then((rta) => {
      let productos = new Array();
      let qPedidos = new Array();
      let quantities = new Array();
      rta.map((prod) => {
        prod.map((item) => {
          quantities.push(item.quantity);
        });
      });
      for (let j = 0; j < rta.length; j++) {
        qPedidos.push(rta[j].length);
        for (let h = 0; h < rta[j].length; h++) {
          productos.push(Products.findByPk(rta[j][h].ProductId));
        }
      }
      Promise.all(productos).then((productList) => {
        let count = 0;
        for (let q = 0; q < qPedidos.length; q++) {
          for (let t = 0; t < qPedidos[q]; t++) {
            let psh = {
              id: productList[count].id,
              title: productList[count].title,
              price: productList[count].price,
              quantity: quantities[count],
            };
            pastOrders[q].Products.push(psh);
            count++;
          }
        }
        res.send(pastOrders);
      });
    });
  });
});

router.put("/", (req, res) => {
  User.findByPk(req.body.user).then((user) => {
    var destinatario = user.dataValues.email;
    var nameDestinatario = user.dataValues.name;

    Cart.findOne({
      where: {
        UserId: req.body.user,
        completed: false,
      },
    })
      .then((cart) => {
        var total = cart.dataValues.total;
        console.log("Cart:", cart);
        cart.completed = true;
        cart.save();
        CartProducts.findAll({
          where: {
            CartId: cart.dataValues.id,
          },
        }).then((productos) => {
          console.log("Productos:", productos);
          var arrayDeProductos = [];
          for (var i = 0; i < productos.length; i++) {
            arrayDeProductos.push(
              Products.findByPk(productos[i].dataValues.ProductId)
            );
            arrayDeProductos[i].quantity = productos[i].dataValues.quantity;
          }

          Promise.all(arrayDeProductos).then((listaDeProductos) => {
            console.log("Lista de productos:", listaDeProductos);

            var infoDeProductos = [];
            for (var j = 0; j < listaDeProductos.length; j++) {
              console.log(
                "Cantidad de productos:",
                arrayDeProductos[j].quantity
              );
              infoDeProductos.push(listaDeProductos[j].dataValues);
            }

            var productosComprados = "";
            for (var m = 0; m < infoDeProductos.length; m++) {
              productosComprados += `<li> <strong> ${infoDeProductos[m].title}</strong>, precio unitario: $ ${infoDeProductos[m].price}, cantidad: ${arrayDeProductos[m].quantity}. </li>`;
            }

            var htmlContenido = `
            <h2> Muchas gracias por tu compra ${nameDestinatario} </h2>

            <ul>
               ${productosComprados}
            </ul>

            El precio total es: $ ${total}
            <br>
            Esperamos que las disfrutes,saludos!
            `;
            var mailOptions = {
              from: "tomateunabirraoficial@gmail.com",
              to: `${destinatario}`,
              subject: "Your order",
              html: `${htmlContenido}`,
            };

            transporter.sendMail(mailOptions, function (error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
              }
            });
          });
        });

        return cart;
      })
      .then((boughtCart) => res.sendStatus(200));
  });
});

module.exports = router;
