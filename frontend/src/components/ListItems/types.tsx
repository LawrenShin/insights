import React from "react";

export type ListOfNames = {
  name: string;
  nameType: string;
}[];

export interface ListItemType {
  [key: string]: string | number | null | string[] | number[] | boolean | {};
  names: ListOfNames;
}

// TODO: specify actual company type
// export interface CompanyType {
//   CompanyNames: any[];
// }

export interface CompanyHandlers {
  select: (id: string | number) => void;
  delete: (id: string | number) => void;
}

export type CompanyListItemGenType = (Company: ListItemType, handlers: CompanyHandlers) => JSX.Element;

export type ListItemTypeGen = CompanyListItemGenType;