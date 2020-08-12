import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import FormLabel from "@material-ui/core/FormLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Paper from "@material-ui/core/Paper";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TitleIcon from "@material-ui/icons/Title";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Rating from "@material-ui/lab/Rating";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "stretch",
  },
  item: {
    width: "20%",
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    marginTop: 15,
  },
  imagen: {
    objectFit: "fill",
    height: 400,
  },
  root: {
    width: "100%",
    backgroundColor: "#343330",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
  },
}));
export default ({ products }) => {
  const classes = useStyles();
  return (
    <div>
      <Grid container className={classes.root}>
        {products &&
          products.map((product) => (
            <div key={product.id} className={classes.item}>
              <Card>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    className={classes.imagen}
                    src={product.picture}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <List className={classes.list}>
                      {console.log("Producto:", product)}
                      <Rating name="Rating" value={product.rating} disabled />
                      <Typography variant="h5" component="h2">
                        {product.title}
                      </Typography>
                      <Divider variant="inset" component="li" />
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <AttachMoneyIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={product.price}
                          className={classes.text}
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link to={`/product/${product.id}`}>
                    <Button size="small" color="primary">
                      See details
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </div>
          ))}
      </Grid>
    </div>
  );
};

//<button onClick = {()=> handleAdd}>Favorite</button>
