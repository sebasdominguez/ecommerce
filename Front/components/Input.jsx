import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { fade, makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import LocalMallIcon from "@material-ui/icons/LocalMall";

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
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
  menuButton: {
    marginRight: theme.spacing(2),
  },
  inputInput: {
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
    },
  },
}));

export default ({
  setCategory,
  valueSearch,
  handleChange,
  handleCategorys,
  setCategoryState,
}) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  // const = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

  const sinRepeticion = (value) => {
    setCategory(value);
    setAnchorEl(null);
    handleChange({ target: { value: "" } });
  };

  const closeBox = () => {
    setAnchorEl(null);
  };

  const handleClose = (category) => {
    console.log("Category en Input:", category);
    Promise.all([setCategoryState(category)]).then(() => {
      handleChange({ target: { value: "" } });
    });
  };

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
            <Link to="/">
              <Button color="inherit" className={classes.inputUser}>
                Tomate una
              </Button>
            </Link>
          </Typography>
          <div>
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
          </div>

          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>

            <InputBase
              value={valueSearch}
              onChange={handleChange}
              placeholder="Search for Title"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};
