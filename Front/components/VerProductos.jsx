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

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  producto: {
    width: "33%",
  },
}));

export default function FolderList({ productos }) {
  const classes = useStyles();

  return (
    <div className={classes.producto}>
      <List className={classes.root}>
        {productos.map((item, index) => {
          return (
            <div>
              {item.quantity != null ? (
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <img
                        src={item.data.picture}
                        style={{ objectFit: "fill" }}
                      ></img>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.data.title}
                    secondary={
                      "Price: " + item.data.price + " Quantity:" + item.quantity
                    }
                  />
                </ListItem>
              ) : null}
            </div>
          );
        })}
      </List>
    </div>
  );
}
