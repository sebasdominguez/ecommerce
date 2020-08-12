import React from 'react'
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Divider from '@material-ui/core/Divider';
import { fade, makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import TextField from "@material-ui/core/TextField";
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
    inputRoot: {
      color: "inherit",
    },
    inputUser: {
      color: "white",
    },
    inputInput: {
         backgroundColor: 'gray',
         borderBlockColor: 'black',
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
          width: "13ch",
          "&:focus": {
            width: "20ch",
          },
        }
    },
    search: {
        position: "relative",
        marginRight: "15px",
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
    
   
  }));

export default ({
  setCategoryState, 
  setUrl, 
  setPrice, 
  setName, 
  valueUrl, 
  valueName, 
  valuePrice, 
  valueId, 
  setId ,
  //handle
  handleCategorys, 
  handleSubmitCreate, 
  handleSubmitDelete,
  handleSubmitUpdate,
  //Updating
  valueUrlUP,
  valuePriceUP,
  valueNameUP,
  valueIdUP,
  setUrlUP, 
  setPriceUP, 
  setNameUP,
  setIdUP,

}
  ) =>{
    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose2 = () => {
      setOpen(false);
    };

    const handleClose = (category) => {
        console.log("Category en Input:", category);
       setCategoryState(category)
      };

    const closeBox = () => {
        setAnchorEl(null);
      };
      const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };

    return(
        <>
        <div className = 'ADDContainer'>
        <h1><strong>Create Product</strong></h1>
        <form  
        className={classes.root}
        noValidate
        autoComplete="off"> 
        <TextField
          required
          id="outlined-required"
          label="Url"
          value={valueUrl}
          defaultValue=""
          variant="outlined"
          onChange={setUrl}
        />
            <br/>
            <br/>
          <TextField
          required
          id="outlined-required"
          label="Name"
          value={valueName}
          defaultValue=""
          variant="outlined"
          onChange={setName}
        />    
         <br/>
         <br/>
          <TextField
          required
          id="outlined-required"
          label="Price"
          value={valuePrice}
          variant="outlined"
          onChange={setPrice}
        />  
         <br/>
        <br/>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
          >
          Category
        </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={closeBox}
            >
              {handleCategorys &&
                handleCategorys.map((category) => {
                  return (
                    <div key={category.id}>
                      <MenuItem
                        onClick={() => {
                          handleClose(category.id);
                        }}
                      >
                        {category.name}
                      </MenuItem>
                    </div>
                  );

                  /*(category.id)*/
                })}
            </Menu>
            <br/>
            <br/>
        </form>
        <Button
        onClick={handleSubmitCreate}
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
        >Create</Button>
        </div>
        <br/>
        <br/>
        <Divider />
        <div className = 'ADDContainer'>
        <br/>
        <br/>
       <h1>Delete Product</h1>
        <form  
        className={classes.root}
        noValidate
        autoComplete="off">
        <TextField
          required
          id="outlined-required"
          label="Number of Id"
          value={valueId}
          variant="outlined"
          onChange={setId}
        />  
        </form>
        <Button
        onClick={ handleSubmitDelete}
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
      > Delete</Button> 
   </div>
   <br/>
   <br/>
<Divider />
   <div className = 'ADDContainer'>
<h1><strong>Update</strong> </h1>
<form 
 className={classes.root}
 noValidate
 autoComplete="off">
        <TextField
          required
          id="outlined-required"
          label="Number of Id"
          value={valueIdUP}
          variant="outlined"
          onChange={setIdUP}
          defaultValue=""
        />  
        <br/>
        <br/>
        <TextField
        required
          id="outlined-required"
          label="Url"
          value={valueUrlUP}
          defaultValue=""
          variant="outlined"
          onChange={setUrlUP}
        />
            <br/>
            <br/>
          <TextField
          required
          id="outlined-required"
          label="Name"
          value={valueNameUP}
          defaultValue=""
          variant="outlined"
          onChange={setNameUP}
        />    
         <br/>
         <br/>
          <TextField
          required
          id="outlined-required"
          label="Price"
          value={valuePriceUP}
          variant="outlined"
          onChange={setPriceUP}
          defaultValue=""
        />  
         <br/>
        <br/>
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
          color="primary"
          onClick={handleClick}
          >
          Category
        </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={closeBox}
            >
              {handleCategorys &&
                handleCategorys.map((category) => {
                  return (
                    <div key={category.id}>
                      <MenuItem
                        onClick={() => {
                          handleClose(category.id);
                        }}
                      >
                        {category.name}
                      </MenuItem>
                    </div>
                  );

                  /*(category.id)*/
                })}
            </Menu>
            <br/>
            <br/>
        </form>
        <Button
        onClick={handleSubmitUpdate}
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
        >Update</Button>
        </div>
        </>

    )
}

{/* <Dialog
open={open}
onClose={handleClose2}
aria-labelledby="alert-dialog-title"
aria-describedby="alert-dialog-description"
>
<DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
<DialogContent>
  <DialogContentText id="alert-dialog-description">
    if you delete this product you are not goinable to recover it
  </DialogContentText>
</DialogContent>
<DialogActions>
  <Button onClick={handleClose2} color="primary">
    Disagree
  </Button>
  <Button onClick={handleSubmitDelete} color="primary" autoFocus>
    Agree
  </Button>
</DialogActions>
</Dialog> */}