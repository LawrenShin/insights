import React from 'react';
import {Avatar, IconButton, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText} from "@material-ui/core";
import {Delete as DeleteIcon} from "@material-ui/icons";
import {ListItemType} from "./types";
import BusinessIcon from '@material-ui/icons/Business';
// TODO: differ logic of lists
const CompanyListItem = (company: ListItemType, handlers: any, accessRights: string[] | []): JSX.Element => {
  const companyName = company.otherNames;

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
          disabled={!accessRights.filter((el: string) => el === 'DeleteCompanies').length}
          edge="end"
          aria-label="delete"
          onClick={() => handlers.deleteCompany({url: 'companies', params: `id=${company.id}`})}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default CompanyListItem;
