import React from "react";
import LastOrders from "../components/LastOrders";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart";
import ExposurePlus1Icon from "@material-ui/icons/ExposurePlus1";
import ExposureNeg1Icon from "@material-ui/icons/ExposureNeg1";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import Paper from "@material-ui/core/Paper";
import NavBar from "../components/NavBar";
import { Link, Route } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import gifCarrito from "./assets/f5646695-webp-net-gifmaker-4.gif"


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    margin: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function InteractiveList({
  items,
  add,
  rest,
  remove,
  checkout,
  total,
  user,
  gettingOrders,
  orders,
  props,
}) {
  console.log("Usuario:", user);
  const classes = useStyles();
  const [secondary, setSecondary] = React.useState(false);
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
  return (
    <div>
      <NavBar props={props} />
      <Snackbar open={open} autoHideDuration={3500} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Please check your email in the next minutes,thanks!
        </Alert>
      </Snackbar>
      {items.length !== 0 ? (
        <div className={"cart"}>
          {props.login.redirect ? (
            <div>
              <div xs={10}>
                <h2>Welcome {props.login.dataUser.name}, this is your Cart</h2>
              </div>
              <div xs={2}>
                <Link to="/cart/orders">
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    onClick={() => gettingOrders(user)}
                  >
                    Last Orders
                  </Button>
                </Link>
              </div>
            </div>
          ) : null}

          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
                  checked={secondary}
                  onChange={(event) => setSecondary(event.target.checked)}
                />
              }
              label="Enable secondary text"
            />
          </FormGroup>

          <Grid container spacing={0} direction="column" justify="center">
            <Typography variant="h6" className={classes.title}>
              Your Products:
            </Typography>
            <div className={classes.demo}>
              <List xs={10} md={7}>
                {items.map((item) => (
                  <ListItem key={item.id}>
                    <ListItemAvatar>
                      <Avatar src={item.picture}></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      secondary={secondary ? item.description : null}
                      primary={item.title}
                    />
                    <ListItemSecondaryAction>
                      <Tooltip title="One More" aria-label="One More">
                        <Fab
                          color="primary"
                          className={classes.fab}
                          onClick={() => add(item.id)}
                        >
                          <ExposurePlus1Icon />
                        </Fab>
                      </Tooltip>
                      <Tooltip title="One Less">
                        <Fab
                          color="secondary"
                          className={classes.fab}
                          onClick={() => rest(item.id)}
                        >
                          <ExposureNeg1Icon />
                        </Fab>
                      </Tooltip>
                      <IconButton edge="end" aria-label="qty">
                        Let´s Drink: {item.quantity}
                      </IconButton>
                      <Tooltip title="Delete">
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => remove(item.id)}
                        >
                          <RemoveShoppingCartIcon />
                        </IconButton>
                      </Tooltip>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
              {/*( <p>Nothing yet...</p>  )*/}
            </div>
          </Grid>
          {user != undefined ? (
            <div>
              <Grid className={classes.paper}>
                <Paper xs={6} className={classes.paper}>
                  {" "}
                  Total: ${total}
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => {
                      checkout({ user });
                      handleClick();
                    }}
                  >
                    CheckOut!
                  </Button>
                  {console.log("USER!!!!!", user)}
                </Paper>
              </Grid>
            </div>
          ) : null}
        </div>
      ) : (
        <div className='Carrito'>
        <div xs={2}>
                <Link to="/cart/orders">
                  <Button
                    variant="outlined"
                    size="small"
                    color="secondary"
                    onClick={() => gettingOrders(user)}
                  >
                    Last Orders
                  </Button>
                </Link>
        </div>
        <h1 className= 'titulo'>Please choose a product</h1>
        <img src ={gifCarrito}></img>
        </div>
        
      )}
    </div>
  );
}
