import React from 'react';
import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {Delete as DeleteIcon} from "@material-ui/icons";
import {ListItemType} from "./types";
import BusinessIcon from '@material-ui/icons/Business';

const CompanyListItem = (company: ListItemType, handlers: any): JSX.Element => {
  const companyName = Array.isArray(company?.companyNames) ? company.companyNames[0] as any : '';

  return (
    <ListItem
      button
      onClick={() => handlers.selectCompany(company)}
    >
      <ListItemAvatar>
        <Avatar>
          <BusinessIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={companyName?.name}
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => handlers.deleteCompany(company.companyName)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default CompanyListItem;
