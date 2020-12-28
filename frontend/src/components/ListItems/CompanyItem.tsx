import React from 'react';
import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {Delete as DeleteIcon} from "@material-ui/icons";
import {CompanyType} from "./types";
import BusinessIcon from '@material-ui/icons/Business';

const CompanyListItem = (company: CompanyType): JSX.Element => <ListItem button>
  <ListItemAvatar>
    <Avatar>
      <BusinessIcon />
    </Avatar>
  </ListItemAvatar>
  <ListItemText
    primary={company.Company}
  />
  <ListItemSecondaryAction>
    <IconButton edge="end" aria-label="delete">
      <DeleteIcon />
    </IconButton>
  </ListItemSecondaryAction>
</ListItem>;

export default CompanyListItem;
