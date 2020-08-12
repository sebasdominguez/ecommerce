import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import IconButton from "@material-ui/core/IconButton";
import AddShoppingCartSharpIcon from "@material-ui/icons/AddShoppingCartSharp";
import AddCircleRoundedIcon from "@material-ui/icons/AddCircleRounded";
import RemoveCircleRoundedIcon from "@material-ui/icons/RemoveCircleRounded";
import InfoIcon from "@material-ui/icons/Info";
import Product from "../components/Product";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
  photo: {
    maxHeight: 500,
    objectFit: "contain",
  },
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    // backgroundColor: "white",
    background:
      "linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(32,32,56,1) 50%, rgba(0,0,0,1) 100%)",
  },
  gridList: {
    width: "80%",
    height: "100%",
  },
  icon: {
    marginRight: 15,
    color: "rgba(255, 255, 255, 0.54)",
  },
  cart: {
    marginRight: 15,
  },
  count: {
    color: "white",
    marginRight: 15,
  },
  divCart: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    justifyContent: "center",
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function ProductosMain({ tileData, user, addToCart, items, add, rest }) {
  const classes = useStyles();
  /*   handleClick = (id) => {
    this.props.addToCart(id);
  }; */
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [, forceUpdate] = React.useState(0);

  console.log("tile ----------->", tileData);

  return (
    <div>
      {tileData != undefined ? (
        <div className={classes.root}>
          <GridList cellHeight={300} className={classes.item}>
            {tileData.map((tile) => {
              let item = items.find((element) => tile.id == element.id);
              return (
                <GridListTile
                  key={tile.id}
                  style={{ height: "200", width: "350" }}
                >
                  <img src={tile.picture} className={classes.photo} />
                  Cantidad:
                  <GridListTileBar
                    title={tile.title}
                    subtitle={<span>Price: {tile.price}</span>}
                    actionIcon={
                      <div>
                        {item == undefined ? (
                          <span>
                            <AddShoppingCartSharpIcon
                              className={classes.icon}
                              aria-label={`info about ${tile.title}`}
                              onClick={() => {
                                handleClick(), addToCart(tile.id);
                              }}
                            ></AddShoppingCartSharpIcon>
                            <Link to={`/product/${tile.id}`}>
                              <InfoIcon className={classes.icon} />
                            </Link>
                          </span>
                        ) : (
                          <span className={classes.divCart}>
                            <Tooltip title="One More" aria-label="One More">
                              <AddCircleRoundedIcon
                                color="primary"
                                fontSize="small"
                                onClick={() => {
                                  add(item.id);
                                  forceUpdate((n) => !n);
                                }}
                                className={classes.cart}
                              />
                            </Tooltip>
                            <Tooltip title="One Less" aria-label="One Less">
                              <RemoveCircleRoundedIcon
                                color="secondary"
                                fontSize="small"
                                onClick={() => {
                                  rest(item.id);
                                  forceUpdate((n) => !n);
                                }}
                                className={classes.cart}
                              />
                            </Tooltip>
                            <div className={classes.count}>{item.quantity}</div>
                            <Link to={`/product/${tile.id}`}>
                              <InfoIcon className={classes.icon} />
                            </Link>
                          </span>
                        )}
                      </div>
                    }
                  />
                  <Snackbar
                    open={open}
                    autoHideDuration={2000}
                    onClose={handleClose}
                  >
                    <Alert onClose={handleClose} severity="success">
                      Product added to the cart!
                    </Alert>
                  </Snackbar>
                </GridListTile>
              );
            })}
          </GridList>
        </div>
      ) : (
        <p>Cargando informacion...</p>
      )}
    </div>
  );
}

export default ProductosMain