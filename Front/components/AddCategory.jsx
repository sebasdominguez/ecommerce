import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "35ch",
      marginTop: 20,
    },
  },
  button: {
    margin: theme.spacing(1),
    marginTop: 15,
  },
}));

export default function BasicTextFields({ categorySend }) {
  const classes = useStyles();
  const [state, setState] = React.useState("");

  const handleChange = (e) => {
    var valor = e.target.value;
    setState(valor);
  };

  const sendInformation = () => {
    var data = state;
    setState("");
    categorySend({ name: data });
  };
  return (
    <div>
      <h2>Agregar una categoria:</h2>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        method="POST"
        action="/api/categorys"
      >
        <TextField
          required
          id="outlined-required"
          label="name"
          value={state}
          defaultValue=""
          variant="outlined"
          onChange={handleChange}
        />
      </form>
      <Button
        onClick={sendInformation}
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
      >
        Send
      </Button>
    </div>
  );
}
