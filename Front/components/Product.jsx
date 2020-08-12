import React from "react";
import { flexbox } from '@material-ui/system';
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import Typography from "@material-ui/core/Typography";
import Snackbar from "@material-ui/core/Snackbar";
import Tooltip from "@material-ui/core/Tooltip";
import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
      maxWidth: "100%",
      height: '40%'
  },
  divCart: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }, 
  resumen: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection:"row",
    alignItems:"flex-start"
  },
});

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default ({ product, props, user, items, total, addToCart, add, rest}) => {
  const classes = useStyles();
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

  let item = items.find(element => product.id == element.id)

  const [, forceUpdate] = React.useState(0);

  return (
    <div >
      <div className="productoIndividual">
        {product ? (
          <div className="product">
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="100%"
                  src={product.picture}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {product.title}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="h2">
                    ${product.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {product.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
              
                {
                  item==undefined ?
                  (
                  <CardActions>
                    <Button size="small" color="primary" onClick={() => {
                      if(user.dataUser.id) { addToCart(product.id)}
                      else { handleClick() } }}> Buy
                    </Button>
                  </CardActions>
                  )
                  :
                  (
                  <div className={classes.resumen}>
                    <span> Price $  {product.price}</span> 
                    <span> Will Buy:  {item.quantity}</span>
                    <Tooltip title="One More" aria-label="One More">              
                      <AddCircleRoundedIcon color="primary" fontSize="small" onClick={() => {add(product.id);forceUpdate(n => !n)}} className={classes.cart}/>
                    </Tooltip>
                    <Tooltip title="One Less" aria-label="One Less">              
                      <RemoveCircleRoundedIcon color="secondary" fontSize="small" onClick={() => {rest(product.id);forceUpdate(n => !n)}} className={classes.cart}/>
                    </Tooltip>
                    <span > Cart Total  $ {total} </span>
                  </div>
                  )
                }
            </Card>
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert severity="error" onClose={handleClose}>
                  You are not loggin
                </Alert>
            </Snackbar>
          </div>
        ) : (
          <h5> Loading</h5>
        )}
      </div>
    </div>
  );
  //vendrian las reviews
};
