import React, { Fragment } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core/';

export default ({ exam }) => (
  <Fragment>
    <List className="Mui--list" component="nav">
      <ListItem dir="rtl" className="listItem--correct">
        <ListItemText className="listItemText" primary={`תשובות נכונות: ${exam.stats.correct}`} />
      </ListItem>                
      <ListItem dir="rtl" className="listItem--notAnswered">
        <ListItemText className="listItemText" primary={`תשובות שלא נענו: ${exam.stats.notAnswered}`} />
      </ListItem>
      <ListItem dir="rtl" className="listItem--mistake">
        <ListItemText className="listItemText" primary={`תשובות שגויות: ${exam.stats.mistake}`} />
      </ListItem>
    </List>
  </Fragment>
)