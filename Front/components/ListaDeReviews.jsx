//Aca hago un pedido a /api/reviews/idPublicacion
// Y listo todas las reviews de ese producto

import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Rating from "@material-ui/lab/Rating";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));
  export default ({ reviews /*usuario*/ }) => {

  const classes = useStyles();

  return (
      <ExpansionPanel>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Reviews</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
      <div>
        <List>
          {reviews &&
            reviews.map((review) => (
              <ListItem key={review.id} className="reviewItem">
                <ListItemText
                  primary={review.username}
                  secondary={review.review}
                />
                <Rating name="disabled" value={review.stars} disabled />
              </ListItem>
            ))}
        </List>

      </div>
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>)

};
