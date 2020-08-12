import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import gif1 from "./assets/gif1.gif"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  buttonActual: {
    backgroundColor: "red",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display:'flex',
    alignItems: 'center',
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputUser: {
    color: "white",
  },
  Div: {
    display: "flex",
    alignItems: "center",

  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const mapStateToProps = (state, ownProps) => {
  return {
    login: state.login.data,
  };
};
const mapDispatchToProps = {};

function SearchAppBar({ props, actualPlace }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <Link to="/cart">
              <LocalMallIcon className={classes.inputUser} />
            </Link>
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap>
              <div className={classes.Div}>
            <Link to="/">
              <Button color="inherit" className={classes.inputUser}>
                Tomate una
              </Button>
            </Link>
          <img src={gif1}/>
              </div>
          </Typography>

          {props.isAdmin ? (
            <Link to="/admin">
              <Button color="inherit" className={classes.inputUser}>
                Admin panel
              </Button>
            </Link>
          ) : null}

          <Link to="/products">
            <Button color="inherit" className={classes.inputUser}>
              Products
            </Button>
          </Link>

          {console.log("PROPS:", props)}
          {props.login.redirect ? (
            <a href="/api/users/logout">
              <Button color="inherit" className={classes.inputUser}>
                Logout
              </Button>
            </a>
          ) : (
            <div>
              {actualPlace == "login" ? (
                <Link to="/login">
                  <Button disabled>Login</Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button color="inherit" className={classes.inputUser}>
                    Login
                  </Button>
                </Link>
              )}

              {actualPlace == "register" ? (
                <Link to="/register">
                  <Button disabled>Register</Button>
                </Link>
              ) : (
                <Link to="register">
                  <Button color="inherit" className={classes.inputUser}>
                    Register
                  </Button>
                </Link>
              )}
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchAppBar);
