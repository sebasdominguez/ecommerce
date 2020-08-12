import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
      width: "50%",
      height: theme.spacing(16),
    },
  },
  rootList: {
    width: 360,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  item: {
    borderBottom: "1px solid grey",
  },
}));

export default function Variants({ users, removeUser, upgradeUser }) {
  const classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [openAdmin, setOpenAdmin] = React.useState(false);
  const [id, setName] = React.useState(null);

  const handleClickAdmin = (id) => {
    setName(id);
    setOpenAdmin(true);
  };

  const handleClickOpen = (id) => {
    setName(id);
    setOpen(true);
  };

  const noDelete = () => {
    setOpen(false);
  };

  const noDeleteAdmin = () => {
    setOpenAdmin(false);
  };

  const handleClose = () => {
    console.log("You press delete with ID:", id);
    setOpen(false);
    removeUser(id);
  };

  const handleCloseAdmin = () => {
    console.log("You press upgrade with ID:", id);
    setOpenAdmin(false);
    upgradeUser(id);
  };
  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        Usuarios disponibles:
      </Typography>
      <div className={classes.demo}>
        <List dense={dense} className={classes.rootList}>
          {users.map((user) => {
            return (
              <ListItem className={classes.item}>
                {user.isAdmin ? (
                  <ListItemIcon>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        handleClickAdmin(user.id);
                      }}
                    >
                      <ArrowUpwardIcon style={{ color: "green" }} />
                    </IconButton>
                  </ListItemIcon>
                ) : (
                  <ListItemIcon>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => {
                        handleClickAdmin(user.id);
                      }}
                    >
                      <ArrowUpwardIcon />
                    </IconButton>
                  </ListItemIcon>
                )}
                {user.isAdmin ? (
                  <ListItemText primary={user.name + "(admin)"} />
                ) : (
                  <ListItemText primary={user.name} />
                )}

                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      handleClickOpen(user.id);
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            );
          })}
        </List>
        <Dialog
          open={open}
          onClose={noDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              You can't go back with this action
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={noDelete} color="primary" autoFocus>
              Ohhh wait!!
            </Button>
            <Button onClick={handleClose} color="primary">
              I understand,delete user.
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openAdmin}
          onClose={noDeleteAdmin}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This users is going to have the same privileges than you!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={noDeleteAdmin} color="primary" autoFocus>
              Ohhh wait!!
            </Button>
            <Button onClick={handleCloseAdmin} color="primary">
              I understand, upgrade user to admin.
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}
