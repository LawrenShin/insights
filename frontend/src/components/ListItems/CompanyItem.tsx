import React from 'react';
import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {Delete as DeleteIcon, FolderOpen as FolderIcon} from "@material-ui/icons";
import {CompanyType} from "./types";

const CompanyListItem = (Company: CompanyType): JSX.Element => <ListItem button>
  <ListItemAvatar>
    <Avatar>
      <FolderIcon />
    </Avatar>
  </ListItemAvatar>
  <ListItemText
    primary="Single-line item"
  />
  <ListItemSecondaryAction>
    <IconButton edge="end" aria-label="delete">
      <DeleteIcon />
    </IconButton>
  </ListItemSecondaryAction>
</ListItem>;

export default CompanyListItem;
