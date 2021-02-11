import React from 'react';
import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {Delete as DeleteIcon} from "@material-ui/icons";
import {ListItemType} from "./types";
import BusinessIcon from '@material-ui/icons/Business';
// TODO: differ logic of lists
const CompanyListItem = (company: ListItemType, handlers: any): JSX.Element => {
  const companyName = company.legalName;

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
        primary={companyName}
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="delete"
          onClick={() => handlers.deleteCompany({url: 'company', params: `id=${company.id}`})}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default CompanyListItem;
