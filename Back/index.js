const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const routes = require("./routes");
const flash = require("connect-flash");
const app = express();
const path = require("path");
const volleyball = require("volleyball");
const db = require("./db");
const User = require("./models/User");
app.use(session({ secret: "tomate1" })); // req.session // The secret is used to sign the session id cookie, to prevent the cookie to be tampered with.
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    function (inputEmail, inputPassword, done) {
      console.log("Estoy por buscar un usuario");

      User.findOne({
        where: {
          email: inputEmail,
        },
      })
        .then((user) => {
          if (!user) {
            return done(null, false, { message: "Incorrect username." });
          }
          if (!user.validPassword(inputPassword)) {
            return done(null, false, { message: "Incorrect password." });
          }

          return done(null, user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  )
);

// serialize: how we save the user and stored in session object by express-session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// deserialize: how we look for the user
passport.deserializeUser(function (id, done) {
  User.findByPk(id).then((user) => {
    done(null, user);
  });
});

//---------- MIDDLEWARE isLogedIn: check if the user is logged
function isLogedIn(req, res, next) {
  if (req.isAuthenticated()) {
    console.log("ESTA AUTENTICADO!"); // passport method that check if a user is authenticated or not
    next();
  } else {
    res.redirect("/login");
  }
}

//---------- ENVIO HACIA LAS RUTAS
app.use("/api", routes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
  /* console.log("---------------------------");
  console.log("req.session: ", req.session); // express-session
  console.log("req.sessionID: ", req.sessionID); // express-session
  console.log("req.cookies: ", req.cookies); // cookie-parser
  console.log("req.user:", req.user);
  console.log("---------------------------"); */
});

// Error catching endware.
app.use(function (err, req, res, next) {
  console.log("ENTRE A LA RUTA DEL ERROR LPM");
  console.error(err, typeof next);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});


db.sync({ force: false })
  .then(() => {
    console.log("DB synched");
    app.listen(3000, () => console.log("listening on 3000"));
  })
  .catch(console.log);

module.exports = app;
