import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import LabelIcon from "@material-ui/icons/Label";
import InfoIcon from "@material-ui/icons/Info";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  listOrder: {
    width: "33%",
  },
}));

export default function FolderList({ orders, listInfo }) {
  const classes = useStyles();

  return (
    <div className={classes.listOrder}>
      <List className={classes.root}>
        {orders.map((elemento) => {
          return (
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LabelIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  "Order ID:" +
                  elemento.id +
                  ", Total:$" +
                  elemento.total +
                  ", User ID:" +
                  elemento.UserId
                }
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="Info"
                  onClick={() => {
                    listInfo(elemento.id, elemento.UserId);
                  }}
                >
                  <InfoIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
