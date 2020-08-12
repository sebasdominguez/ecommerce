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
//Menu lateral
import clsx from "clsx";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import StorefrontIcon from "@material-ui/icons/Storefront";
import TurnedInNotOutlinedIcon from "@material-ui/icons/TurnedInNotOutlined";
import LocalPrintshopOutlinedIcon from "@material-ui/icons/LocalPrintshopOutlined";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
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
  //Menu lateral
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
}));

const mapStateToProps = (state, ownProps) => {
  return {
    login: state.login.data,
    selected: ownProps.selected,
  };
};
const mapDispatchToProps = {};

function SearchAppBar({ props, selected }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button key={"Products"} onClick={() => selected("products")}>
          <ListItemIcon>
            <StorefrontIcon />
          </ListItemIcon>
          <ListItemText primary={"Products"} />
        </ListItem>

        <ListItem
          button
          key={"Categories"}
          onClick={() => selected("categories")}
        >
          <ListItemIcon>
            <TurnedInNotOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"Categories"} />
        </ListItem>

        <ListItem button key={"Orders"} onClick={() => selected("orders")}>
          <ListItemIcon>
            <LocalPrintshopOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"Orders"} />
        </ListItem>

        <ListItem button key={"Users"} onClick={() => selected("users")}>
          <ListItemIcon>
            <PermIdentityIcon />
          </ListItemIcon>
          <ListItemText primary={"Users"} />
        </ListItem>
      </List>
      <Divider />
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon className={classes.inputUser} />
          </IconButton>

          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/">
              <Button color="inherit" className={classes.inputUser}>
                Tomate una
              </Button>
            </Link>
          </Typography>

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
      <React.Fragment key={"left"}>
        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {list("left")}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchAppBar);
