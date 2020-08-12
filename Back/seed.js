const { Products } = require("./models/index");
const { Category } = require("./models/index");
const { User } = require("./models/index");
const { Review } = require("./models/index");


const product1 = Products.create({
  title: "Dav",
  picture:
    "https://source.unsplash.com/IwPk1o4hEr8/400x600",
  price: 150,
  description:'Strong beer, double malt, perfect for cold nights'
}).then((cerveza) => {
  cerveza.addCategory(3);
});

const product2 = Products.create({
  title: "Ale",
  picture:
    "https://source.unsplash.com/p2KA3Q2lfSw/400x600",
  price: 120,
  description:"Light body, strong flavor, with a bitter finish"
}).then((cerveza) => {
  cerveza.addCategory(2);
});

const product3 = Products.create({
  title: "Barley Wine",
  picture:
    "https://source.unsplash.com/lGzhgzkN6UI/400x600",
  price: 170,
  description:'Extravagant color but a spectacular flavor, very good beer for fun night'
}).then((cerveza) => {
  cerveza.addCategory(4);
});

const product4 = Products.create({
  title: "Trigueña",
  picture:
    "https://source.unsplash.com/hplJX8Uy9Uo/400x600",
  price: 145,
  description:'A classic wheat beer'
}).then((cerveza) => {
  cerveza.addCategory(2);
});

const product5 = Products.create({
  title: "Drought",
  picture:
    "https://source.unsplash.com/4wnZbnW9Bv0/400x600 ",
  price: 135,
  description:'Strong beer, double malt, strong flavor'
}).then((cerveza) => {
  cerveza.addCategory(3);
});

const product6 = Products.create({
  title: "Porter",
  picture:
    "https://source.unsplash.com/9AgKficrJW4/400x600 ",
  price: 200,
  description:'Double malt, strong flavor, with a bitter finish'
}).then((cerveza) => {
  cerveza.addCategory(4);
});

const product7 = Products.create({
  title: "Pilsner",
  picture:
  "https://source.unsplash.com/o2hRqvFYJWY/400x600 ",
  price: 135,
  description:"Light body, strong flavor, with a bitter finish"
}).then((cerveza) => {
  cerveza.addCategory(2);
});

const product8 = Products.create({
  title: "hop house lager",
  picture:
  "https://source.unsplash.com/DJ5dSMndxFY/400x600 ",
  price: 125,
  description:"Light body, strong flavor, with a bubbly finish"
}).then((cerveza) => {
  cerveza.addCategory(4);
  
});

const product9 = Products.create({
  title: "Asperius",
  picture:
  "https://source.unsplash.com/8zC07n1RTM0/400x600",
  price: 170,
  description:"Light body, strong flavor, with a bitter finish"
}).then((cerveza) => {
  cerveza.addCategory(4);
});

const product10 = Products.create({
  title: "Trigo",
  picture: "https://source.unsplash.com/6lUgzoBirxk/400x600",
  price: 135,
  description:'A classic wheat beer'
}).then((cerveza) => {
  cerveza.addCategory(2);
});

const product11 = Products.create({
  title: "Eschenbräu",
  picture:
  "https://source.unsplash.com/o-EmieeOtrs/400x600",
  price: 135,
  description:'Extravagant color but a spectacular flavor, very good beer for fun night'
}).then((cerveza) => {
  cerveza.addCategory(4);
});

const product12 = Products.create({
  title: "grolsch",
  picture:
  "https://source.unsplash.com/dFZn9RkFggs/400x600 ",
  price: 160,
  description:"Light body, strong flavor, with a bitter finish"
}).then((cerveza) => {
  cerveza.addCategory(2);
});

const product13 = Products.create({
  title: "pacifico clara",
  picture:
  "https://source.unsplash.com/zXl4QWaADLQ/400x600",
  price: 180,
  description:"Light body, strong flavor, with a bitter finish"
}).then((cerveza) => {
  cerveza.addCategory(2);
});

const product14 = Products.create({
  title: "Brown Ale",
  picture:
  "https://source.unsplash.com/i089wXef_Is/400x600",
  price: 180,
}).then((cerveza) => {
  cerveza.addCategory(4);
});

const product15 = Products.create({
  title: "Nomono",
  picture:
  "https://source.unsplash.com/hnQUBfgRzBM/400x600",
  price: 135,
  description:"Light body, strong flavor, with a bitter finish"
}).then((cerveza) => {
  cerveza.addCategory(4);
});


const product16 = Products.create({
  title: "Kölsch",
  picture:
  "https://source.unsplash.com/qqUk3gophLs/400x600 ",
  price: 135,
  description:"Light body, strong flavor, with a bitter finish"
}).then((cerveza) => {
  cerveza.addCategory(2);
});

const product17 = Products.create({
  title: "Hoegaarden",
  picture:
  "https://source.unsplash.com/Wj2-Kd7Uz70/400x600 ",
  price: 250,
  description:"Light body, strong flavor, with a bitter finish"
}).then((cerveza) => {
  cerveza.addCategory(2);
});

const product18 = Products.create({
  title: "Corona",
  picture:
  "https://source.unsplash.com/K5mv-fdIhb4/400x600",
  price: 300,
  description:'Light body but a spectacular flavor, very good beer for fun night'
}).then((cerveza) => {
  cerveza.addCategory(4);
});

/* 
const product19 = Products.create({
  title: "Rauchbier",
  picture:
  "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRIMX8oFu47qzDqw_Xm97rxZ-AUwqTVFBGoKw&usqp=CAU",
  price: 300,
}).then((cerveza) => {
  cerveza.addCategory(3);
});

const product20 = Products.create({
  title: "Steam beer",
  picture:
  "https://i.pinimg.com/originals/e1/4b/b1/e14bb19fdbcc700d751ff3fd92bf1fe6.jpg",
  price: 300,
}).then((cerveza) => {
  cerveza.addCategory(4);
}); */

/*
*/
const categoriaPrincial = Category.create({
  name: "Todas",
});

const category1 = Category.create({
  name: "Rubias",
});

const category2 = Category.create({
  name: "Negras",
});

const category3 = Category.create({
  name: "Coloradas",
});

const review5 = Review.create({
  review: "Excelente birra",
  stars: 5,
});

const review4 = Review.create({
  review: "Muy buena birra",
  stars: 4,
});

const review3 = Review.create({
  review: "Mas o menos birra",
  stars: 3,
});

const review2 = Review.create({
  review: "Estaba caliente la birra",
  stars: 2,
});

const review1 = Review.create({
  review: "Un asco de birra",
  stars: 1,
});

const user1 = User.create({
  email: "borrachin@gmail.com",
  password: "123",
  name: "Sr. Borracho",
  adress: "Av. Siempreviva 123",
}).then((user) => {
  user.addReview(1).then((user2) => {
    user2.getReviews().then((review) => {
      review[0].setProduct(1).then((review2) => {
        console.log("Review:", review2);
      });
    });
  });
});

const user2 = User.create({
  email: "birrero@gmail.com",
  password: "123",
  name: "Mrs. Borracho",
  adress: "Av. Siempreviva 321",
}).then((user) => {
  user.addReview(5).then((user2) => {
    user2.getReviews().then((review) => {
      review[0].setProduct(3).then((review2) => {
        console.log("Review:", review2);
      });
    });
  });
});

const user3 = User.create({
  email: "admin@admin.com",
  password: "123",
  name: "Mrs. Borracho",
  adress: "Av. Siempreviva 321",
  isAdmin: true,
});

const user4 = User.create({
  email: "mati@mati.com",
  password: "123",
  name: "Mrs. Mati",
  adress: "Av. Siempreviva 321",
  isAdmin: true,
});
const user5 = User.create({
  email: "guille@guille.com",
  password: "123",
  name: "Mrs. Guille",
  adress: "Av. Siempreviva 321",
  isAdmin: false,
});
