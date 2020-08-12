import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { connect } from "react-redux";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
import Box from "@material-ui/core/Box";
import Rating from "@material-ui/lab/Rating";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
const useStyles = makeStyles((theme) => ({
  alert: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  form: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  root: {
    minWidth: 400,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

function Review({ idProduct, dataUser, setearReview }) {
  const [value, setValue] = React.useState(null);
  const [valueStart, setValueStart] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const sendData = () => {
    console.log("Data User:", dataUser);
    console.log(valueStart);
    console.log(value);
    if (!valueStart) {
      setOpen(true);
    } else {
      setValueStart(null);
      setValue("");
      setearReview({
        idUser: dataUser.id,
        idProduct: idProduct,
        ratingUser: valueStart,
        commentUser: value,
      });

      //Action creator
    }
  };
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  console.log("Las props son:", idProduct);
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend">Rating</Typography>
          <Rating
            name="simple-controlled"
            value={valueStart}
            onChange={(event, newValue) => {
              setValueStart(newValue);
            }}
          />
        </Box>
        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          method="POST"
          action={`/api/reviews/${idProduct}`}
        >
          <TextField
            type="text"
            name="review"
            id="standard-multiline-flexible"
            label="waiting..."
            multiline
            inputProps={{
              maxLength: 100,
            }}
            value={value}
            onChange={handleChange}
            helperText="Max length 100 characters"
          />
        </form>
        <Button
          onClick={() => sendData()}
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<Icon>send</Icon>}
        >
          Send
        </Button>
      </CardContent>
      <CardActions></CardActions>
      <div className={classes.alert}>
        <Snackbar open={open} autoHideDuration={2000}>
          <Alert
            variant="filled"
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Rating can not be null
          </Alert>
        </Snackbar>
      </div>
    </Card>
  );
}

export default Review;
